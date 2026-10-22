import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=(f)=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const presets=read('experience-presets.json'),templates=read('site-templates.json'),budget=read('asset-budgets.json');
const required=['src/studio/experience/AdaptiveLightingRig.tsx','src/studio/experience/CameraDirector.tsx',
'src/studio/experience/CinematicAtmosphere.tsx','src/studio/experience/ProductHotspots.tsx','src/studio/experience/ConceptEnhancements.tsx',
'src/studio/premium.css','scripts/brief-router.mjs','scripts/audit-assets.mjs',
'docs/PREMIUM_EXPERIENCE_PLAYBOOK.md','docs/PRODUCT_ASSET_REQUIREMENTS.md','docs/ACCESSIBILITY_AND_PERFORMANCE.md','scripts/concept-router.mjs','scripts/create-site-from-brief.mjs'];
const failures=[];
for(const f of required)if(!fs.existsSync(path.join(root,f)))failures.push('Missing '+f);
for(const t of templates){
 const x=presets[t.id];if(!x||!x.mood||!x.camera||!x.motion||!x.effects)failures.push('Missing experience preset '+t.id);
}
if(!Number.isFinite(budget.preferredMaxVertices))failures.push('Asset budgets missing');
const scene=fs.readFileSync(path.join(root,'src/studio/ModelViewport.tsx'),'utf8');
for(const name of ['AdaptiveLightingRig','CameraDirector','CinematicAtmosphere','ProductHotspots','WatchConcept'])if(!scene.includes(name))failures.push('Experience not connected: '+name);
console.log(JSON.stringify({templates:templates.length,experiencePresets:Object.keys(presets).length,requiredFiles:required.length,failures},null,2));
if(failures.length)process.exitCode=1;else console.log('Premium source audit PASSED (runtime/browser checks still required).');
