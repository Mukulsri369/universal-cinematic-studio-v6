import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {errorDiagnostics,sanitize} from '../scripts/media/errors.mjs';
import {readImageResponse} from '../scripts/media/interactions.mjs';
const detail=(name,fields)=>({'@type':`type.googleapis.com/google.rpc.${name}`,...fields});
const response=(status,message,details=[])=>Response.json({error:{code:status,message,status:status===400?'INVALID_ARGUMENT':status===403?'PERMISSION_DENIED':status===429?'RESOURCE_EXHAUSTED':'INTERNAL',details}},{status,headers:{'Retry-After':'30','Set-Cookie':'private-cookie'}});

test('400, 403, 429, 500 preserve safe Google diagnostics and sanitize secrets',async()=>{
  for(const status of [400,403,429,500]) {
    const key='fake-test-credential';const prompt='private fictional campaign prompt';
    const r=response(status,`Invalid parameter. ${key}. ${prompt}. Authorization: Bearer other-secret`,[
      detail('ErrorInfo',{reason:'INVALID_PARAMETER',domain:'googleapis.com',metadata:{quota_limit:'ImageRequests',quota_limit_value:'10',authorization:'hidden'}})
    ]);
    await assert.rejects(readImageResponse(r,'hero',{secrets:[key,prompt]}),e=>{
      assert.equal(e.diagnostics.httpStatus,status);assert.equal(e.diagnostics.googleCode,status);
      assert.match(e.diagnostics.message,/Invalid parameter/);assert.equal(e.diagnostics.retryAfter,'30');
      assert.equal(e.diagnostics.errorInfo[0].reason,'INVALID_PARAMETER');
      assert.equal(e.diagnostics.errorInfo[0].metadata.quota_limit_value,'10');
      assert.doesNotMatch(JSON.stringify(e.diagnostics)+e.message,/fake-test-credential|private fictional|other-secret|private-cookie|hidden/);
      assert.equal(e.diagnostics.cause,'UNKNOWN');return true;
    });
  }
});
test('quota violations, dimensions, RetryInfo and Retry-After are captured',async()=>{
  const d=await errorDiagnostics(response(429,'Quota exceeded',[
    detail('QuotaFailure',{violations:[{description:'Daily quota exceeded',quotaMetric:'images_per_day',quotaId:'ImagesPerDay',quotaValue:'0',quotaDimensions:{model:'gemini-3.1-flash-image',location:'global',consumer:'private-project'}}]}),
    detail('RetryInfo',{retryDelay:'42s'})
  ]));
  assert.equal(d.cause,'ZERO_QUOTA');assert.equal(d.quotaFailures[0].metadata.quotaMetric,'images_per_day');
  assert.equal(d.quotaFailures[0].metadata.quotaId,'ImagesPerDay');assert.equal(d.retryInfo[0].retryDelay,'42s');
  assert.deepEqual(d.quotaFailures[0].dimensions,{model:'gemini-3.1-flash-image',location:'global'});
});
test('specific causes require evidence rather than HTTP status alone',async()=>{
  for(const [message,details,cause] of [
    ['Try again',[],'UNKNOWN'],
    ['Quota exceeded',[detail('ErrorInfo',{reason:'RATE_LIMIT_EXCEEDED'})],'TEMPORARY_RATE_LIMIT'],
    ['Daily quota exhausted',[],'DAILY_QUOTA_EXHAUSTED'],
    ['Quota exceeded',[detail('QuotaFailure',{violations:[{description:'Quota exhausted',quotaValue:'10'}]})],'QUOTA_EXHAUSTED'],
    ['Billing account disabled',[],'BILLING_RESTRICTION'],
    ['Model overloaded; capacity exhausted',[],'MODEL_CAPACITY'],
    ['Quota exceeded',[detail('ErrorInfo',{reason:'QUOTA_EXCEEDED',metadata:{quota_limit_value:'0'}})],'ZERO_QUOTA']
  ]) assert.equal((await errorDiagnostics(response(429,message,details))).cause,cause);
});
test('empty, malformed JSON, text, unreadable and oversized errors are safe',async()=>{
  for(const [body,format] of [['','empty'],['{broken secret','malformed-json'],['private-error-body','text'],['null','json'],['x'.repeat(65537),'oversized']]) {
    const d=await errorDiagnostics(new Response(body,{status:500}));assert.equal(d.bodyFormat,format);
    assert.equal(d.message,null);assert.equal(d.cause,'UNKNOWN');assert.doesNotMatch(JSON.stringify(d),/private-error-body|broken secret/);
  }
  const d=await errorDiagnostics({status:500,text:async()=>{throw Error('secret')},headers:new Headers()});assert.equal(d.bodyFormat,'unreadable');
  await errorDiagnostics(response(400,'bad', [null,{},detail('QuotaFailure',{violations:[null]})]));
});
test('sanitizer removes known secrets, quoted request fragments, URLs, tokens and controls',()=>{
  for(const value of ['key=hidden','Authorization: Bearer hidden','Cookie: hidden','Set-Cookie: hidden','access_token=hidden','prompt: hidden','https://host/?key=hidden','"hidden"','Bearer hidden']) assert.doesNotMatch(sanitize(value),/hidden/);
  assert.doesNotMatch(sanitize('private%20value private value',['private value']),/private/);
  assert.doesNotMatch(sanitize('line\n\u001bnext'),/[\x00-\x1f]/);
});
test('approved mocked failing hero CLI performs exactly one fetch and exits',()=>{
  const script=`let calls=0;globalThis.fetch=async()=>{calls++;console.error('MOCK_CALL_'+calls);return Response.json({error:{code:429,status:'RESOURCE_EXHAUSTED',message:'Unknown limit'}},{status:429})};process.argv=['node','scripts/media/generate.mjs','--only','hero','--execute','--approve-spend'];await import('./scripts/media/generate.mjs');`;
  const r=spawnSync(process.execPath,['--input-type=module','-e',script],{cwd:new URL('..',import.meta.url),encoding:'utf8',env:{...process.env,GEMINI_API_KEY:'dummy-only',NODE_USE_ENV_PROXY:'1'}});
  assert.notEqual(r.status,0);assert.equal((r.stderr.match(/MOCK_CALL_/g)||[]).length,1);assert.match(r.stderr,/API HTTP 429/);assert.match(r.stderr,/UNKNOWN/);assert.doesNotMatch(r.stderr,/dummy-only/);
});
