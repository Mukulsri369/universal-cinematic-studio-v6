import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
const root = process.cwd();
import { inferConcept } from './concept-router.mjs';
const definitions = JSON.parse(fs.readFileSync(path.join(root, 'site-templates.json'), 'utf8'));
const byId = new Map(definitions.map(t => [t.id, t]));
const experiences = JSON.parse(fs.readFileSync(path.join(root,'experience-presets.json'),'utf8'));
const compositions = JSON.parse(fs.readFileSync(path.join(root,'composition-recipes.json'),'utf8'));
const argv = process.argv.slice(2);
const opts = {};
for (let i = 0; i < argv.length; i++) {
  let arg = argv[i];
  if (!arg.startsWith('--')) { console.error(`Unknown argument: ${arg}`); process.exit(2); }
  let [name, inline] = arg.slice(2).split('=', 2);
  if (['list', 'help', 'dry-run'].includes(name)) opts[name] = true;
  else opts[name] = inline ?? argv[++i];
}
if (opts.help) {
  console.log('npm run site:new -- --template lighting-studio --brand "Your Brand" --category lighting --product "Your first product"');
  console.log('Optional: --headline "..." --accent "#abc123" --spec examples/real-products.example.json --dry-run');
  process.exit(0);
}
if (opts.list) { for (const t of definitions) console.log(`${t.id.padEnd(23)} ${t.name}`); process.exit(0); }
const template = byId.get(opts.template || 'lighting-studio');
if (!template) { console.error(`Template "${opts.template}" not found. Run npm run site:list`); process.exit(2); }
let spec = {};
if (opts.spec) {
  const file = path.resolve(root, opts.spec);
  if (!file.startsWith(root + path.sep)) { console.error('Spec must be inside project root'); process.exit(2); }
  spec = JSON.parse(fs.readFileSync(file, 'utf8'));
}
if(spec.heroImagePath!=null && (typeof spec.heroImagePath!=='string'||!/^\/images\/[a-zA-Z0-9/_ .-]+$/.test(spec.heroImagePath)||spec.heroImagePath.includes('..'))){console.error('Unsafe heroImagePath. Use a local /images/... path');process.exit(2);}
const products = spec.products ?? [
  { id: 'concept-01', name: opts.product ?? 'Concept study 01', description:'Placeholder — replace with your actual product', modelPath: null, imagePath:null, price:null, currency:'INR', purchaseUrl:null, concept:template.concept },
  { id: 'concept-02', name: 'Concept study 02', description:'Placeholder — not a real inventory item', modelPath:null, imagePath:null, price:null, currency:'INR', purchaseUrl:null, concept:template.concept },
  { id: 'concept-03', name: 'Concept study 03', description:'Placeholder — replace with a verified product', modelPath:null, imagePath:null, price:null, currency:'INR', purchaseUrl:null, concept:template.concept }
];
if (!Array.isArray(products) || !products.length || products.some(p => !p.id || !p.name)) { console.error('Spec must provide a nonempty products array with id and name'); process.exit(2); }
if(new Set(products.map(p=>String(p.id))).size!==products.length){console.error('Every product must have a unique ID');process.exit(2);}
for (const p of products) {
  for (const k of ['modelPath','imagePath']) if (p[k] != null) {
    const prefix=k==='modelPath'?'/models/':'/images/';
    const allowed = typeof p[k]==='string' && p[k].startsWith(prefix) &&
      /^\/[a-zA-Z0-9/_ .-]+$/.test(p[k]) && !p[k].includes('..') && !p[k].includes('\\');
    if(!allowed){console.error(`Unsafe ${k} for ${p.id}. Use safe local assets in ${prefix}`);process.exit(2);}
  }
  if(p.price!=null&&(!Number.isFinite(p.price)||p.price<0)){console.error(`Invalid price for ${p.id}`);process.exit(2);}
  if (p.purchaseUrl && !/^https:\/\/[^\s/]+\.[^\s]+$/.test(p.purchaseUrl)) { console.error('purchaseUrl must be a complete https URL'); process.exit(2); }
  if(p.hotspots && (!Array.isArray(p.hotspots)||p.hotspots.length>8||p.hotspots.some(h=> !h.id||!h.label||!Array.isArray(h.position)||h.position.length!==3||!h.position.every(Number.isFinite)))) {console.error('Hotspots require id/label and numeric [x,y,z], maximum eight per product');process.exit(2);}
}
const allowedModules=new Set(['editorial','filmstrip','spotlight','product-rail','process','metrics','material','compare','manifesto','category-index']);
const modules=opts.modules?opts.modules.split(',').map(x=>x.trim()):compositions[template.id].modules;
if(modules.length!==4||new Set(modules).size!==4||modules.some(x=>!allowedModules.has(x))){console.error('Modules: four unique valid comma-separated module names required.');process.exit(2);}
const color = opts.accent ?? spec.accent ?? template.accent;
if (!/^#[0-9a-fA-F]{6}$/.test(color)) { console.error('Accent must be a #RRGGBB hex color.'); process.exit(2); }
const config = {
  schemaVersion:1, template:template.id, brand: opts.brand ?? spec.brand ?? 'YOUR BRAND',
  category: opts.category ?? spec.category ?? template.category,
  eyebrow:spec.eyebrow ?? template.eyebrow,
  headline:opts.headline ?? spec.headline ?? template.headline,
  emphasis:spec.emphasis ?? template.emphasis,
  heroImagePath:spec.heroImagePath ?? null,
  summary:spec.summary ?? template.summary,
  accent:color, secondary:spec.secondary ?? template.secondary,
  background:spec.background ?? template.background,
  foreground:spec.foreground ?? template.foreground,
  concept:template.concept, layout:template.layout,
  chapters: spec.chapters ?? template.chapters,
  products:products.map(p=>({...p, concept:p.concept||inferConcept(p.name,template.concept)})), experience:experiences[template.id], recipe:modules, supportEmail:spec.supportEmail ?? null
};
if (opts['dry-run']) { console.log(JSON.stringify(config,null,2)); process.exit(0); }
const out = path.join(root, 'src/studio/generated.site.json');
fs.mkdirSync(path.dirname(out), {recursive:true});
fs.writeFileSync(out, JSON.stringify(config,null,2)+'\n', 'utf8');
// Keep the image provenance ledger aligned to new site briefs. Never auto-approve rights.
const ledgerPath=path.join(root,'visual-assets.manifest.json');
if(fs.existsSync(ledgerPath)){
  const previous=JSON.parse(fs.readFileSync(ledgerPath,'utf8'));
  const prior=new Map((previous.products||[]).map(x=>[x.productId,x]));
  const heroMatch=previous.hero?.path===config.heroImagePath;
  const hero=heroMatch?previous.hero:{path:config.heroImagePath,kind:'campaign-photo',source:'pending',rightsStatus:'pending',alt:`${config.brand} editorial campaign`};
  const entries=config.products.map(product=>{
    const old=prior.get(product.id);
    return old && (old.desiredPath===product.imagePath || old.path===product.imagePath)
      ? old : {productId:product.id,desiredPath:product.imagePath,kind:'product-photo',source:'pending',rightsStatus:'pending',alt:`${product.name} product photography`,model3DPath:product.modelPath??null};
  });
  fs.writeFileSync(ledgerPath,JSON.stringify({schemaVersion:1,siteBrand:config.brand,hero,products:entries},null,2)+'\n','utf8');
}

console.log(`Created ${out} for ${config.brand} (${config.template}), ${config.products.length} products.`);
console.log('Use npm run dev for preview. Run npm run studio:audit and npm run build before shipping.');
console.log('Real 3D products require licensed .glb assets and correct per-product modelPath; otherwise previews are conceptual.');
