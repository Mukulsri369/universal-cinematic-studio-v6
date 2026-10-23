import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {getImage,buildImageRequest,readImageResponse} from '../scripts/media/interactions.mjs';

const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a2ioAAAAASUVORK5CYII=','base64');
const image={type:'image',mime_type:'image/png',data:png.toString('base64')};
test('valid inline PNG in current and compatibility response shapes',()=>{
  for(const body of [{output_image:image},{steps:[{type:'model_output',content:[{type:'text',text:'done'},image]}]},{outputs:[image]}]) {
    assert.deepEqual(getImage({status:'completed',...body}),png);
  }
});
test('missing or URI-only image output is rejected',()=>{
  for(const body of [{},{steps:[]},{outputs:[{type:'text',text:'no image'}]},{output_image:{type:'image',uri:'https://example.com/image.png'}}]) assert.throws(()=>getImage(body),/no supported inline image/);
});
test('malformed response, base64 and raster data are rejected',()=>{
  for(const body of [null,[],42,{steps:{}},{outputs:{}},{steps:[null]},{steps:[{type:'model_output',content:{}}]},
    {output_image:{...image,data:42}},{output_image:{...image,data:'%%%'}},{output_image:{...image,data:'bm90IGFuIGltYWdl'}},
    {output_image:{...image,mime_type:'image/jpeg'}},{status:'failed',output_image:image}]) assert.throws(()=>getImage(body));
});
test('API errors and invalid JSON fail without echoing response bodies',async()=>{
  for(const status of [400,401,403,429,500]) await assert.rejects(readImageResponse(new Response('private-error-body',{status}),'hero'),new RegExp(`hero: API HTTP ${status}$`));
  await assert.rejects(readImageResponse(new Response('{broken'),'hero'),/Malformed Interactions JSON/);
  await assert.rejects(readImageResponse(Response.json({error:{message:'private-error-body'}}),'hero'),/^Error: Interactions API returned an error$/);
});
test('hero request uses 16:9, 2K inline image response configuration',()=>{
  assert.deepEqual(buildImageRequest({model:'gemini-3.1-flash-image',input:'fictional campaign',aspectRatio:'16:9'}),{
    model:'gemini-3.1-flash-image',input:'fictional campaign',response_format:{type:'image',delivery:'inline',aspect_ratio:'16:9',image_size:'2K'}
  });
});
test('hero CLI selects exactly one image and both spend flags are required before fetch',()=>{
  // Replace fetch before importing the actual CLI. No test can reach the network.
  const run=args=>spawnSync(process.execPath,['--input-type=module','-e',
    "globalThis.fetch=()=>{throw Error('NETWORK_FORBIDDEN_IN_TEST')};process.argv=['node','scripts/media/generate.mjs',...JSON.parse(process.env.TEST_MEDIA_ARGS)];await import('./scripts/media/generate.mjs');"],
    {cwd:new URL('..',import.meta.url),encoding:'utf8',env:{...process.env,GEMINI_API_KEY:'mock-key-not-a-secret',TEST_MEDIA_ARGS:JSON.stringify(args)}});
  for(const args of [['--only','hero'],['--only','hero','--approve-spend']]) {
    const r=run(args);assert.equal(r.status,0,r.stderr);const result=JSON.parse(r.stdout);
    assert.equal(result.status,'DRY_RUN_NO_API_CALL');assert.equal(result.count,1);assert.equal(result.assets[0].id,'hero');
  }
  const blocked=run(['--only','hero','--execute']);
  assert.notEqual(blocked.status,0);assert.match(blocked.stderr,/Explicit --approve-spend required/);assert.doesNotMatch(blocked.stderr,/NETWORK_FORBIDDEN/);
});
