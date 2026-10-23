/** Pure request/response helpers. Importing this module never makes API calls. */
import {detectRaster} from './core.mjs';
import {errorDiagnostics} from './errors.mjs';

export function buildImageRequest({model,input,aspectRatio,imageSize='2K'}) {
  // MIME selection is optional; request inline delivery for the local writer.
  return {model,input,response_format:{type:'image',delivery:'inline',aspect_ratio:aspectRatio,image_size:imageSize}};
}

export function getImage(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw Error('Malformed Interactions response');
  if (body.error) throw Error('Interactions API returned an error');
  if (body.status && body.status !== 'completed') throw Error('Interaction is not completed');
  if (body.steps != null && !Array.isArray(body.steps)) throw Error('Malformed interaction steps');
  if (body.outputs != null && !Array.isArray(body.outputs)) throw Error('Malformed interaction outputs');
  const candidates=[body.output_image,...(body.outputs||[]).filter(x=>x?.type==='image')];
  for (const step of body.steps||[]) {
    if (!step || typeof step !== 'object') throw Error('Malformed interaction step');
    if (step.type !== 'model_output') continue;
    if (!Array.isArray(step.content)) throw Error('Malformed model output content');
    candidates.push(...step.content.filter(x=>x?.type==='image'));
  }
  const obj=candidates.find(x=>x?.type==='image' && x.data);
  if (!obj) throw Error('Gemini response has no supported inline image output');
  if (typeof obj.data !== 'string' || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(obj.data)) throw Error('Malformed image base64');
  const buffer=Buffer.from(obj.data,'base64');
  const raster=detectRaster(buffer);
  if (!raster || (obj.mime_type && obj.mime_type !== raster.mime)) throw Error('Unsupported image bytes or MIME mismatch');
  return buffer;
}

export async function readImageResponse(response,id,options={}) {
  if (!response.ok) {
    const diagnostics=await errorDiagnostics(response,options);
    const error=new Error(`${id}: API HTTP ${response.status}; ${JSON.stringify(diagnostics)}`);
    error.name='GeminiApiError';error.diagnostics=diagnostics;
    throw error;
  }
  let body;
  try { body=await response.json(); } catch { throw Error('Malformed Interactions JSON response'); }
  return getImage(body);
}
