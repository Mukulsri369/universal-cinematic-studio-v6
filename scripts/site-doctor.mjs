import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
const base=process.cwd();
const s=JSON.parse(fs.readFileSync('src/studio/generated.site.json','utf8'));
const required=new Set(['id','name']);
const issues=[];const notices=[];
const rgb=c=>String(c||'').match(/^#([a-f\d]{6})$/i)?.[1].match(/.{2}/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
const luminance=c=>{const values=rgb(c);return values?values[0]*.2126+values[1]*.7152+values[2]*.0722:null;};
const a=luminance(s.foreground),b=luminance(s.background);
if(a===null||b===null)issues.push('Main palette colors must be #RRGGBB');
else{const ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);if(ratio<4.5)issues.push(`Main text contrast ${ratio.toFixed(2)}:1 < recommended 4.5:1`);else notices.push(`Main text contrast ${ratio.toFixed(2)}:1`);}
if(!Array.isArray(s.products)||!s.products.length)issues.push('No products');
const ids=new Set();
for(const p of s.products||[]){
 for(const k of required)if(!p[k])issues.push(`Missing ${k} on product`);
 if(ids.has(p.id))issues.push(`Duplicate product ID ${p.id}`);ids.add(p.id);
 if(p.price!=null&&(!Number.isFinite(p.price)||p.price<0))issues.push(`Invalid price on ${p.id}`);
 if(p.purchaseUrl&&!/^https:\/\//.test(p.purchaseUrl))issues.push(`Insecure purchase URL for ${p.id}`);
 for(const key of ['imagePath','modelPath'])if(p[key]){
  const allowed=key==='imagePath'?'/images/':'/models/';
  if(!p[key].startsWith(allowed))issues.push(`Invalid ${key} path for ${p.id}`);
  else if(!fs.existsSync(path.join(base,'public',p[key].slice(1))))issues.push(`Missing asset ${p[key]} for ${p.id}`);
 }
 if(!p.modelPath)notices.push(`${p.id} uses conceptual 3D; supply licensed GLB for accurate likeness.`);
}
if(!s.brand||!s.headline)issues.push('Brand or headline empty');
console.log(JSON.stringify({brand:s.brand,template:s.template,productCount:(s.products||[]).length,errors:issues,notices},null,2));
if(issues.length)process.exitCode=1;
