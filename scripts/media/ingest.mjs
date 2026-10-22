/** Merchant-asset staging: keeps AI-created demo media separate from truthful commercial assets. */
import fs from 'node:fs';
import path from 'node:path';
import {read,save,root,siteFile,visualFile,normalizeFlags,slug,safePublic,scanFile,verifyGlb} from './core.mjs';
const f=normalizeFlags(process.argv.slice(2));
if(!['hero','product','model','material'].includes(f.asset))throw Error('--asset hero|product|model|material required');
if(!f.file)throw Error('--file <local-path> required; no URLs, no remote downloads');
if(!['owner','supplier','licensed'].includes(f.source))throw Error('--source owner|supplier|licensed required');
if(!f['rights-ref']||!f['approved-by']||!f['acknowledge-rights'])throw Error('--rights-ref, --approved-by and --acknowledge-rights required. Seller must document legitimate asset rights.');
if(f.asset!=='hero'&&!f.product&&!f.id)throw Error('--product <product-id> or --id <material-id> required');
const original=path.resolve(f.file);
if(!fs.statSync(original).isFile())throw Error('Source is not a local file');
const site=read(siteFile),manifest=read(visualFile);
const product=site.products.find(p=>p.id===f.product);
if(['product','model'].includes(f.asset)&&!product)throw Error('Product ID is not in current site configuration');
if(['product','model'].includes(f.asset)&&!f.sku)throw Error('--sku merchant SKU required for authentic product mapping');
const mode= f.asset==='model'?'models':'images';
const verified=f.asset==='model'?verifyGlb(original):scanFile(original);
const ext=f.asset==='model'?'glb':verified.ext;
const fileName=f.asset==='hero'?'campaign-hero':f.asset==='material'?slug(f.id||'material'):slug(f.product);
const reference=`/${mode}/merchant/${fileName}.${ext}`;
const destination=safePublic(reference,mode);
if(fs.existsSync(destination)&&!f.replace)throw Error('Asset already exists; use --replace only after reviewing original and destination');
const record={path:reference,kind:f.asset==='model'?'product-model':f.asset==='hero'?'campaign-photo':f.asset==='material'?'editorial-photo':'product-photo',source:'owned',supplierSource:f.source,sourceDocumentRef:f['rights-ref'],rightsStatus:'owned',rightsReviewedBy:f['approved-by'],rightsAttested:true,verificationLevel:'seller-attested-not-independently-verified',productSku:f.sku||null,sha256:verified.sha256,createdAt:new Date().toISOString(),dimensions:verified.width?[verified.width,verified.height]:null,bytes:verified.bytes,fictionalCampaign:false};
fs.mkdirSync(path.dirname(destination),{recursive:true});fs.copyFileSync(original,destination);
if(f.asset==='hero'){site.heroImagePath=reference;manifest.hero={...manifest.hero,...record};}
if(f.asset==='product'){product.imagePath=reference;let entry=manifest.products.find(x=>x.productId===product.id);if(!entry){entry={productId:product.id};manifest.products.push(entry)}Object.assign(entry,record);}
if(f.asset==='model'){product.modelPath=reference;let entry=manifest.products.find(x=>x.productId===product.id);if(!entry){entry={productId:product.id};manifest.products.push(entry)}entry.model3DPath=reference;entry.model3D={...record};}
if(f.asset==='material'){site.materialImages??=[];let idx=site.materialImages.findIndex(x=>x.id===f.id);let d={id:f.id,src:reference,alt:`Editorial detail ${f.id}`};if(idx>=0)site.materialImages[idx]=d;else site.materialImages.push(d);manifest.editorials??=[];let m=manifest.editorials.findIndex(x=>x.id===f.id);if(m>=0)manifest.editorials[m]={id:f.id,...record};else manifest.editorials.push({id:f.id,...record});}
save(siteFile,site);save(visualFile,manifest);
console.log(JSON.stringify({status:'STAGED_FOR_HUMAN_REVIEW_NOT_PUBLISHED',asset:f.asset,product:f.product||null,reference,integrity:verified,rights:'Claim and documentation reference recorded; no automated legal/visual authenticity verification was performed.',next:'Run npm run media:audit -- --mode commercial, then npm run media:promote -- --apply once complete'},null,2));
