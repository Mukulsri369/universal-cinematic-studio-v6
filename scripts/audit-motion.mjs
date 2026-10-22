import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.cwd();
const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const blueprints=read('motion-blueprints.json');const siteTemplates=read('site-templates.json');const manifest=read('component-manifest.json');
const motion=manifest.components.filter(x=>x.category==='cinematic-motion');
assert.equal(motion.length,10);
assert.equal(blueprints.templates.length,siteTemplates.length);
const referenced=new Set();
for(const item of blueprints.templates){
 assert(siteTemplates.some(x=>x.id===item.template),'unknown template: '+item.template);
 assert.equal(new Set(item.components).size,item.components.length,'duplicate motion module');
 assert(item.mediaPolicy.photographicHero===true,'photographic hero gate missing');
 for(const id of item.components){const component=motion.find(x=>x.id===id);assert(component,'unknown module: '+id);assert(fs.existsSync(path.join(root,component.source)),'missing source '+component.source);referenced.add(id);}
}
for(const item of motion)assert(fs.existsSync(path.join(root,item.source)));
assert(fs.existsSync('src/motion/motion.css'));
assert(fs.existsSync('src/motion/MotionShowcase.tsx'));
const main=fs.readFileSync('src/main.tsx','utf8');assert(main.includes("view==='motion'"),'motion preview route missing');
const glb=fs.readFileSync('src/motion/CinematicScrollWorld.tsx','utf8');
assert(!/torusGeometry|boxGeometry|capsuleGeometry/.test(glb),'no cartoon product fallback');
console.log(JSON.stringify({status:'PASS',industryBlueprints:blueprints.templates.length,motionComponents:motion.length,referencedComponents:referenced.size,previewRoute:'?view=motion',note:'This is static integrity only; not screenshot or browser validation.'},null,2));
