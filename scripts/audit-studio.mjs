import fs from 'node:fs';
import path from 'node:path';
const here=process.cwd();
const load=(name)=>JSON.parse(fs.readFileSync(path.join(here,name),'utf8'));
const templates=load('site-templates.json');
const recipes=load('composition-recipes.json');
const moduleTypes=new Set(['editorial','filmstrip','spotlight','product-rail','process','metrics','material','compare','manifesto','category-index']);
const config=load('src/studio/generated.site.json');
const required=['src/studio/ModelViewport.tsx','src/studio/AutoCinematicSite.tsx','src/studio/studio.css',
  'scripts/new-site.mjs','site-templates.json','src/studio/generated.site.json','START_HERE_AI_STUDIO.md','AGENTS.md',
  'docs/ASSET_PIPELINE.md','docs/TEMPLATES_AND_ROUTING.md'];
const missing=required.filter(f=>!fs.existsSync(path.join(here,f)));
const checks=[];
checks.push(['twenty-four template definitions',templates.length===24]);
checks.push(['all recipes have valid modules',templates.every(t=>Array.isArray(recipes[t.id]?.modules)&&recipes[t.id].modules.length>=3&&recipes[t.id].modules.every(m=>moduleTypes.has(m)))]);
checks.push(['unique template IDs',new Set(templates.map(x=>x.id)).size===templates.length]);
checks.push(['valid palette HEX',templates.every(t=>[t.accent,t.secondary,t.background,t.foreground].every(c=>/^#[0-9a-fA-F]{6}$/.test(c)))]);
checks.push(['generated site references real template',templates.some(t=>t.id===config.template)]);
checks.push(['nonempty product list',Array.isArray(config.products)&&config.products.length>=1]);
checks.push(['unique product IDs',new Set(config.products.map(p=>p.id)).size===config.products.length]);
checks.push(['product IDs and names',config.products.every(p=>p.id&&p.name)]);
checks.push(['missing required files',missing.length===0]);
let missingModels=[];
for(const p of config.products)if(p.modelPath){
  const rel=p.modelPath.replace(/^\//,'');
  if(!p.modelPath.startsWith('/models/')||!fs.existsSync(path.join(here,'public',rel)))missingModels.push(p.modelPath);
}
checks.push(['referenced model assets present',missingModels.length===0]);
const failed=checks.filter(([n,ok])=>!ok);
for(const [name,ok] of checks)console.log(`${ok?'OK  ':'FAIL'} ${name}`);
if(missing.length)console.log('Missing files:',missing);
if(missingModels.length)console.log('Missing models:',missingModels);
console.log(`Templates: ${templates.length}, configured products: ${config.products.length}`);
if(failed.length)process.exit(1);
console.log('Studio source/manifest audit PASSED. This does NOT verify npm installation, rendering or visual quality.');
