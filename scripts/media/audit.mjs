import fs from 'node:fs';
import {read,siteFile,visualFile,normalizeFlags,safePublic,scanFile,verifyGlb,hash} from './core.mjs';
export function audit({site,manifest,mode,loadRaster=()=>{},loadGlb=()=>{},require3d=false}){
 const errors=[],warnings=[];const results=[];
 const records=[{id:'hero',reference:site.heroImagePath,meta:manifest.hero,role:'hero'},...(site.products||[]).map(p=>({id:p.id,reference:p.imagePath,meta:(manifest.products||[]).find(x=>x.productId===p.id),role:'product',modelPath:p.modelPath}))];
 for(const rec of records){
  if(!rec.reference){errors.push(`${rec.id}: image is missing`);continue;}
  if(!rec.meta||rec.reference!==rec.meta.path){errors.push(`${rec.id}: asset provenance missing or path mismatch`);continue;}
  if(rec.role==='product'&&mode==='commercial'&&!rec.meta.productSku)errors.push(`${rec.id}: merchant SKU not documented`);
  if(mode==='demo'&&(rec.meta.source!=='generated'||rec.meta.fictionalCampaign!==true))errors.push(`${rec.id}: not a generated fictional demo asset`);
  if(mode==='commercial'){
   if(rec.meta.source!=='owned'||!rec.meta.rightsAttested||!rec.meta.sourceDocumentRef||!rec.meta.rightsReviewedBy||rec.meta.fictionalCampaign!==false)errors.push(`${rec.id}: not an attested real-owner/supplier asset`);
   if(!rec.reference.startsWith('/images/merchant/'))errors.push(`${rec.id}: commercial photo must be in /images/merchant/`);
  }
  try{const actual=loadRaster(rec.reference);if(actual.sha256!==rec.meta.sha256)errors.push(`${rec.id}: hash mismatch`);if(actual.width<(rec.role==='hero'?1200:720))errors.push(`${rec.id}: image too narrow ${actual.width}px`);results.push({id:rec.id,image:rec.reference,dimensions:[actual.width,actual.height],source:rec.meta.source});}
  catch(e){errors.push(`${rec.id}: ${e.message}`)}
  if(rec.role==='product'){
   if(!rec.modelPath){if(require3d)errors.push(`${rec.id}: 3D model required but missing`);else warnings.push(`${rec.id}: photo-only until genuine GLB supplied`);}
   else if(mode==='commercial'){
    const row=rec.meta?.model3D;
    if(!row||row.path!==rec.modelPath||row.source!=='owned'||!row.sourceDocumentRef||row.productSku!==rec.meta.productSku)errors.push(`${rec.id}: 3D model lacks matching SKU provenance`);
    try{const actual=loadGlb(rec.modelPath);if(actual.sha256!==row?.sha256)errors.push(`${rec.id}: 3D model hash mismatch`);}catch(e){errors.push(`${rec.id}: GLB ${e.message}`)}
   }
  }
 }

 const detailIds=['material-macro','editorial-detail','studio-process'];
 for(const id of detailIds){
  const detail=site.materialImages?.find(x=>x.id===id);
  const meta=manifest.editorials?.find(x=>x.id===id);
  if(!detail||!meta||meta.path!==detail.src){errors.push(`${id}: missing approved editorial material photograph`);continue;}
  if(mode==='demo'&&(meta.source!=='generated'||meta.fictionalCampaign!==true))errors.push(`${id}: expected fictional generated editorial`);
  if(mode==='commercial'&&(meta.source!=='owned'||!meta.rightsAttested||!meta.sourceDocumentRef||meta.fictionalCampaign!==false))errors.push(`${id}: missing merchant-owned or licensed editorial evidence`);
  try{const v=loadRaster(detail.src);if(v.sha256!==meta.sha256)errors.push(`${id}: raster hash mismatch`);if(v.width<720)errors.push(`${id}: material image too small`);results.push({id,image:detail.src,dimensions:[v.width,v.height],source:meta.source});}catch(e){errors.push(`${id}: ${e.message}`)}
 }
 if(mode==='commercial'&&site.products.some(p=>p.purchaseUrl&&!/^https:\/\//i.test(p.purchaseUrl)))errors.push('Commercial checkout URLs must be HTTPS');
 if(mode==='commercial'&&/DEMO|FICTIONAL/i.test(site.brand))errors.push('Commercial brand still labeled DEMO/FICTIONAL; update verified merchant identity first');
 if(mode==='commercial'&&site.products.some(p=>/conceptual|demo|abstract study|fictional/i.test(p.description||'')))errors.push('Commercial descriptions still contain demo/conceptual text; replace with merchant-verified facts');
 if(mode==='commercial'&&site.products.some(p=>p.price!=null&&!Number.isFinite(p.price)))errors.push('Commercial prices contain invalid values');
 if(mode==='commercial')warnings.push('Rights attestations, product accuracy and 3D appearance require human/legal review; this audit is not independent verification.');
 if(mode==='demo')warnings.push('AI-generated images are fiction; do not advertise them as photographs of specific sellable products.');
 return {status:errors.length?'BLOCKED':mode==='commercial'?'COMMERCE_ASSET_GATE_PASSED_REQUIRES_MANUAL_REVIEW':'DEMO_ASSET_GATE_PASSED_REQUIRES_VISUAL_REVIEW',mode,assets:results.length,errors,warnings,results};
}
export function auditFromDisk(mode,require3d=false){
 const site=read(siteFile),manifest=read(visualFile);
 return audit({site,manifest,mode,require3d,loadRaster:ref=>scanFile(safePublic(ref,'images')),loadGlb:ref=>verifyGlb(safePublic(ref,'models'))});
}
if(process.argv[1]&&process.argv[1].endsWith('/media/audit.mjs')){
 const f=normalizeFlags(process.argv.slice(2));const mode=f.mode||'demo';if(!['demo','commercial'].includes(mode))throw Error('Expected --mode demo|commercial');
 const result=auditFromDisk(mode,Boolean(f['require-3d-all']));console.log(JSON.stringify(result,null,2));if(result.errors.length)process.exitCode=1;
}
