/** Explicitly billed, server-side/terminal-only photo generation. No browser API keys. */
import fs from 'node:fs';
import {buildImageRequest,readImageResponse} from './interactions.mjs';
import {read,save,siteFile,visualFile,modeFile,makePlan,normalizeFlags,writeDemoAsset,safePublic,detectRaster} from './core.mjs';
const flags=normalizeFlags(process.argv.slice(2));
const site=read(siteFile);const mode=read(modeFile);const manifest=read(visualFile);
if(mode.presentationMode==='commercial-verified')throw Error('Cannot generate fictional imagery in verified commercial mode. Switch to demo project explicitly.');
const plan=makePlan(site);
const selected=plan.assets.filter(x=>!flags.only||x.id===flags.only).slice(0,flags.limit?Number(flags.limit):plan.assets.length);
if(!selected.length)throw Error('No matching asset to generate');
if(!flags.execute){console.log(JSON.stringify({status:'DRY_RUN_NO_API_CALL',count:selected.length,model:process.env.GEMINI_IMAGE_MODEL||plan.model,assets:selected.map(x=>({id:x.id,role:x.role,ratio:x.aspectRatio})),instruction:'Run with --execute --approve-spend to incur charges; requires GEMINI_API_KEY as server-side environment variable.'},null,2));process.exit(0);}
if(!flags['approve-spend'])throw Error('Explicit --approve-spend required before any billable request');
if(!process.env.GEMINI_API_KEY)throw Error('GEMINI_API_KEY missing from server-side environment');
const model=process.env.GEMINI_IMAGE_MODEL||plan.model;
const allowed=['gemini-3.1-flash-image','gemini-3-pro-image','gemini-nano-banana-2.1'];
if(!allowed.includes(model))throw Error(`Unreviewed image model ${model}. Update allowlist only after reading current Google API docs.`);
const key=process.env.GEMINI_API_KEY;
const endpoint='https://generativelanguage.googleapis.com/v1beta/interactions';
let processed=0;
for (const entry of selected){
 const row=entry.role==='hero'?manifest.hero:entry.role==='product'?manifest.products.find(x=>x.productId===entry.id):manifest.editorials?.find(x=>x.id===entry.id);
 if(row?.source==='owned')throw Error(`Refusing to overwrite merchant asset ${entry.id} with AI demo imagery. Use a separate demo workspace.`);
 if(row?.source==='generated'&&!flags.replace){console.log('SKIP existing generated:',entry.id);continue;}
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),180000);
 let response;
 let input=entry.prompt;
 if(entry.role!=='hero'&&!flags['no-reference']&&manifest.hero?.source==='generated'&&manifest.hero.path){
  const referenceFile=safePublic(manifest.hero.path,'images');
  if(fs.existsSync(referenceFile)){const refBytes=fs.readFileSync(referenceFile);const t=detectRaster(refBytes);if(t)input=[{type:'image',mime_type:t.mime,data:refBytes.toString('base64')},{type:'text',text:'Use the supplied fictional campaign image ONLY as a visual reference for lighting, material sophistication, composition and color continuity. Generate a NEW original image without copying the subjects. '+entry.prompt}];}
 }
 try {response=await fetch(endpoint,{method:'POST',signal:controller.signal,headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify(buildImageRequest({model,input,aspectRatio:entry.aspectRatio,imageSize:plan.imageSize}))});}
 finally{clearTimeout(timeout);}
 const sensitiveInput=typeof input==='string'?[input]:input.flatMap(x=>[x.text,x.data]).filter(Boolean);
 const image=await readImageResponse(response,entry.id,{secrets:[key,...sensitiveInput]});const record=writeDemoAsset({entry,buffer:image,model,site,manifest});processed++;console.log(JSON.stringify({generated:entry.id,...record}));
}
mode.presentationMode='fictional-demo';mode.assetProvision={imageGenerationEnabled:true,imageGenerationProvider:`Gemini API ${model}`,assetsAvailable:processed>0};save(modeFile,mode);
console.log(JSON.stringify({status:'GENERATED_SOURCE_FILES_PENDING_VISUAL_APPROVAL',generatedCount:processed,disclosure:plan.disclosure,next:'Run npm run media:audit -- --mode demo and visually review all images in a browser.'}));
