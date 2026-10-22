/** Asset-first creative system; Node-only — never import into browser code. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
export const root = path.resolve(import.meta.dirname, '../..');
export const siteFile = path.join(root,'src/studio/generated.site.json');
export const visualFile = path.join(root,'visual-assets.manifest.json');
export const modeFile = path.join(root,'visual-quality.config.json');
export const read = p => JSON.parse(fs.readFileSync(p,'utf8'));
export const save = (p,x) => fs.writeFileSync(p,JSON.stringify(x,null,2)+'\n');
export const slug = v => String(v).toLowerCase().replace(/[^a-z0-9-]/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'').slice(0,72);
export const hash = b => crypto.createHash('sha256').update(b).digest('hex');
export const safePublic = (reference, folder) => {
  if(typeof reference!=='string'|| !/^\/[a-z0-9/_-]+\.(?:png|jpe?g|webp|avif|glb)$/i.test(reference)||reference.includes('..')||!reference.startsWith('/'+folder+'/')) throw Error(`Unsafe /${folder}/ path: ${reference}`);
  const resolved=path.resolve(root,'public',reference.slice(1));
  if(!resolved.startsWith(path.resolve(root,'public',folder)+path.sep))throw Error('Path escaped public directory');
  return resolved;
};
export function detectRaster(buf){
  if(buf.length>=24&&buf.subarray(0,8).toString('hex')==='89504e470d0a1a0a')return {mime:'image/png',ext:'png',width:buf.readUInt32BE(16),height:buf.readUInt32BE(20)};
  if(buf.length>30&&buf.toString('ascii',0,4)==='RIFF'&&buf.toString('ascii',8,12)==='WEBP'){
    let w,h,tag=buf.toString('ascii',12,16);
    if(tag==='VP8X'){w=1+buf.readUIntLE(24,3);h=1+buf.readUIntLE(27,3);}
    else if(tag==='VP8 '){w=buf.readUInt16LE(26)&0x3fff;h=buf.readUInt16LE(28)&0x3fff;}
    else if(tag==='VP8L'){const a=buf.readUInt32LE(21);w=(a&16383)+1;h=((a>>>14)&16383)+1;}
    if(w&&h)return {mime:'image/webp',ext:'webp',width:w,height:h};
  }
  if(buf.length>20&&buf[0]===0xff&&buf[1]===0xd8){
    let i=2;while(i+9<buf.length){if(buf[i]!==0xff){i++;continue;}const marker=buf[i+1];if(marker===0xd9||marker===0xda)break;const len=buf.readUInt16BE(i+2);if(len<2)break;if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker))return {mime:'image/jpeg',ext:'jpg',width:buf.readUInt16BE(i+7),height:buf.readUInt16BE(i+5)};i+=2+len;
    }
  }
  return null;
}
export const scanFile = p => {
  const b=fs.readFileSync(p);const v=detectRaster(b);
  if(!v)throw Error(`Unrecognized raster header: ${p} (AVIF requires separately configured decoder/converter)`);
  if(v.width<640||v.height<480)throw Error(`Image too small: ${v.width}x${v.height}`);
  if(b.length>24_000_000)throw Error('Image over 24 MB. Optimize first.');
  return {...v,bytes:b.length,sha256:hash(b)};
};
const groups={
  fashion:'couture construction, fabric drape, runway-level styling, actual textile microtexture',
  footwear:'luxury footwear design, soles, stitching and material grain',
  jewelry:'fine metal craftsmanship, gem optics and realistic macro reflections',
  watches:'precision watchmaking, authentic dial mechanics and metal machining',
  automotive:'high-end concept automotive design, real automotive optics and reflections',
  lighting:'architectural luminaires, true practical light falloff and interiors',
  furniture:'luxury design furniture, joinery, realistic textiles and architectural context',
  architecture:'contemporary architecture, natural materials, daylight and truthful perspective',
  beauty:'premium skin-care product photography, realistic packaging and natural skin texture',
  cosmetics:'editorial beauty photography, realistic cosmetics and accurate packaging',
  fragrance:'luxury perfume bottle photography, subtle glass refraction and shadows',
  electronics:'consumer electronics photography, accurate physical construction and material response',
  gaming:'premium gaming hardware with plausible mechanical details',
  hospitality:'high-end hospitality architecture, realistic interiors, daylight, lifestyle',
  food:'realistic commercial culinary photography, natural ingredients and appetizing textures',
  cosmic:'real astronomical photography-based space imagery or technically accurate scientific visualization; do not imply astronomical graphics are actual telescopic photographs',
  affiliate:'editorial product-finds collections with consistent premium product packshots; do not depict unverified listings as genuine items',
  tech:'believable prototype product photography with physically plausible industrial design and studio lighting',
  wellness:'natural botanical wellness setting, real material textures, candid atmospheric lighting',
  saas:'realistic professional creative technology environment; product interface screenshots must come from an actual running application, not synthetic image generation',
  art:'gallery-grade art exhibition photography, realistic framed objects and surface light; avoid copies of copyrighted artworks',
  eyewear:'finely machined optical frames and realistic lens refraction, precision macro photography',
  audio:'high-end speaker and studio sound system photography with accurate materials',
  outdoor:'adventure equipment field photography, weather-accurate light, rugged materials and practical construction',
  sports:'sports equipment action/editorial photography, realistic human anatomy and authentic-looking gear',
  education:'photography-led education environments, readable interface elements must be real HTML, not fake generated text'
};
export function kindDetail(s){const k=String(s||'').toLowerCase();return Object.entries(groups).find(([g])=>k.includes(g))?.[1]||`high-end ${k||'product'} campaign with real-world material physics and studio-quality composition`}
const base='ORIGINAL FICTIONAL CONCEPT, photographically believable, sophisticated art-direction, real-world anatomy and physics, professional optics, true materials and fabric texture, plausible shadows, restrained natural color grading, editorial craft. Never use cartoon, CGI toy, 3D render look, vector art, gradients pretending to be imagery, captions, watermarks, logos, branded emblems, nonsense writing, duplicate limbs or deformed geometry. Not an image of a real purchasable SKU.';
export function makePlan(site){
  const brand=site.brand.replace(/\bDEMO\b|FICTIONAL/gi,'').replace(/·/g,' ').trim()||'original studio brand';
  const mood=kindDetail(site.category);
  const palette=`Palette inspiration ${site.background||'#191615'}, ${site.accent||'#bd9f84'}. Harmonized across all shots.`;
  const hero={id:'hero',role:'hero',aspectRatio:'16:9',label:'Campaign hero',alt:`Fictional ${brand} campaign photograph`,prompt:`${base} Campaign photograph for fictional ${brand}. Brand category ${site.category}: ${mood}. A striking real photographic scene with compelling human/subject focus when appropriate to industry; cinematic but photoreal lighting, believable environment and subtle deep shadows. Strong negative space on left for HTML typography, product/editorial subject on the RIGHT. Full-bleed landscape 16:9. ${palette}`};
  const products=(site.products||[]).map((p,i)=>({id:p.id,role:'product',aspectRatio:'4:5',label:p.name,alt:`Fictional concept photograph of ${p.name}`,productId:p.id,prompt:`${base} Product catalogue/editorial hybrid photograph, fictional ${p.name}. Business ${site.category}; type ${p.category||p.concept||site.category}; ${kindDetail(p.category||p.concept||site.category)}. Describe visual design: ${String(p.description||'distinctively crafted original product').replace(/Shown as[^.]*\./gi,'').trim()}. Product is unmistakably visible, well composed with elegant controlled light, close-up believable materials. Portrait 4:5, frame variation number ${i+1}. Do not print names on the photograph. ${palette}` }));
  const details=['material-macro','editorial-detail','studio-process'].map((k,i)=>({id:k,role:'material',aspectRatio:'4:5',label:k,alt:`Fictional ${site.category} editorial detail ${i+1}`,prompt:`${base} Original ${site.category} editorial macro photo (${k}) for fictional ${brand}. ${mood}. Real, tactile, nuanced material micro-details, strong actual photographic depth of field, genuine-looking light and shadow. Different composition than product cards. Sophisticated realistic photography, portrait 4:5. ${palette}`}));
  return {schemaVersion:1,mode:'fictional-demo',brand:site.brand,industry:site.category,model:'gemini-3.1-flash-image',imageSize:'2K',assets:[hero,...products,...details],disclosure:'All AI generated visuals are fictional illustrative assets; not exact inventory or authentic product photos.'};
}
export const normalizeFlags = args => {
 const flags={};for(let i=0;i<args.length;i++){if(args[i].startsWith('--')){const name=args[i].slice(2);if(['execute','approve-spend','replace','acknowledge-rights','apply','require-3d-all','no-reference'].includes(name))flags[name]=true;else flags[name]=args[++i];}}
 return flags;
};
export function writeDemoAsset({entry,buffer,model,site,manifest}){
 const v=detectRaster(buffer);if(!v)throw Error('Image API did not return PNG, JPEG, or WebP raster');
 if(v.width<640||v.height<480)throw Error('Generated image is too small to publish');
 const reference=`/images/demo/${slug(entry.id)}.${v.ext}`;
 const absolute=safePublic(reference,'images');fs.mkdirSync(path.dirname(absolute),{recursive:true});fs.writeFileSync(absolute,buffer);
 const meta={path:reference,desiredPath:reference,kind:entry.role==='hero'?'campaign-photo':entry.role==='product'?'product-photo':'editorial-photo',source:'generated',rightsStatus:'approved',fictionalCampaign:true,approvalScope:'fictional demonstration only',generatedWith:model,prompt:entry.prompt,createdAt:new Date().toISOString(),sha256:hash(buffer),dimensions:[v.width,v.height],alt:entry.alt};
 if(entry.role==='hero'){site.heroImagePath=reference;manifest.hero={...manifest.hero,...meta};}
 else if(entry.role==='product'){const p=site.products.find(x=>x.id===entry.id);if(!p)throw Error('Missing product '+entry.id);p.imagePath=reference;const row=manifest.products.find(x=>x.productId===entry.id);if(row)Object.assign(row,meta);else manifest.products.push({productId:entry.id,...meta});}
 else {site.materialImages ??=[];const index=['material-macro','editorial-detail','studio-process'].indexOf(entry.id);site.materialImages[index]={id:entry.id,src:reference,alt:entry.alt};manifest.editorials??=[];const old=manifest.editorials.findIndex(x=>x.id===entry.id);if(old>=0)manifest.editorials[old]={id:entry.id,...meta};else manifest.editorials.push({id:entry.id,...meta});}
 save(siteFile,site);save(visualFile,manifest);return {reference,dimensions:meta.dimensions,sha256:meta.sha256};
}
export const verifyGlb=p=>{const b=fs.readFileSync(p);if(b.length<20||b.toString('ascii',0,4)!=='glTF'||b.readUInt32LE(4)!==2||b.readUInt32LE(8)!==b.length)throw Error('Not a valid uncompressed GLB 2 header');return {bytes:b.length,sha256:hash(b)};};
