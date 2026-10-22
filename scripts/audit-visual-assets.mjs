import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const cfg=JSON.parse(fs.readFileSync(path.join(root,'src/studio/generated.site.json'),'utf8'));
const policy=JSON.parse(fs.readFileSync(path.join(root,'visual-quality.config.json'),'utf8'));
const assets=JSON.parse(fs.readFileSync(path.join(root,'visual-assets.manifest.json'),'utf8'));
const problems=[];const good=[];
const allowed=/\.(jpe?g|png|webp|avif)$/i;
function checkFile(label,reference,metadata,width){
 if(!reference){problems.push(`${label}: missing imagePath`);return;}
 if (!allowed.test(reference)){problems.push(`${label}: imagePath ${reference} is not a photographic raster (SVG/illustration rejected)`);return;}
 if(!reference.startsWith('/images/')||reference.includes('..')||reference.includes('\\')){problems.push(`${label}: expected local /images/... asset`);return;}
 const abs=path.join(root,'public',reference.slice(1));
 if(!fs.existsSync(abs)){problems.push(`${label}: missing file public${reference}`);return;}
 const stat=fs.statSync(abs);if(!stat.isFile()){problems.push(`${label}: path is not a file`);return;}
 if(stat.size<32_000)problems.push(`${label}: asset is ${stat.size} bytes; likely thumbnail/invalid for premium photography`);
 const bytes=fs.readFileSync(abs);let w=null;let h=null;
 if(bytes.subarray(0,8).toString('hex')==='89504e470d0a1a0a'){w=bytes.readUInt32BE(16);h=bytes.readUInt32BE(20);}
 else if(bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP'){
  const tag=bytes.toString('ascii',12,16);
  if(tag==='VP8X'&&bytes.length>=30){w=1+bytes.readUIntLE(24,3);h=1+bytes.readUIntLE(27,3);}
  else if(tag==='VP8 '&&bytes.length>=30){w=bytes.readUInt16LE(26)&0x3fff;h=bytes.readUInt16LE(28)&0x3fff;}
  else if(tag==='VP8L'&&bytes.length>=25){let a=bytes.readUInt32LE(21);w=(a&16383)+1;h=((a>>>14)&16383)+1;}
 }else if(bytes[0]===0xff&&bytes[1]===0xd8){
  let i=2;while(i+9<bytes.length){if(bytes[i]!==0xff){i++;continue;}const marker=bytes[i+1];if(marker===0xd9||marker===0xda)break;const len=bytes.readUInt16BE(i+2);if(len<2)break;if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)){h=bytes.readUInt16BE(i+5);w=bytes.readUInt16BE(i+7);break;}i+=2+len;}
 }
 if(w!==null&&w<width)problems.push(`${label}: ${w}×${h} image too narrow; min width ${width}`);
 if(w===null&& !/\.avif$/i.test(reference))problems.push(`${label}: could not decode image dimensions / raster header`);
 if(metadata && metadata.path!==reference && metadata.desiredPath!==reference)problems.push(`${label}: provenance entry does not match selected imagePath`);
 if(!metadata||!['generated','owned','licensed'].includes(metadata.source)||!['approved','owned'].includes(metadata.rightsStatus)) problems.push(`${label}: asset provenance/rights not approved in visual-assets.manifest.json`);
 good.push({label,path:reference,bytes:stat.size,width:w,height:h,provenance:metadata?.source||'missing'});
}
checkFile('Hero',cfg.heroImagePath,assets.hero,policy.commercialRequirements.minHeroPhotoWidth);
const map=new Map((assets.products||[]).map(x=>[x.productId,x]));
for(const product of cfg.products){const item=map.get(product.id);checkFile(`Product ${product.id}`,product.imagePath,item,policy.commercialRequirements.minProductPhotoWidth);}
const result={status:problems.length?'BLOCKED':'ASSET_CHECK_PASSED_NOT_VISUAL_QUALITY_CERTIFIED',productCount:cfg.products.length,assetsPresent:good.length,problems,photos:good,limitations:['This test cannot tell whether the picture looks photorealistic, matches the merchandise, or is artistically good.','Manual screenshot comparison and source-rights review are still required.']};
console.log(JSON.stringify(result,null,2));if(problems.length)process.exitCode=1;
