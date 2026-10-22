import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=n=>JSON.parse(fs.readFileSync(n,'utf8'));
const t=read('site-templates.json'),r=read('composition-recipes.json'),e=read('experience-presets.json');
const allowed=new Set(['editorial','filmstrip','spotlight','product-rail','process','metrics','material','compare','manifesto','category-index']);
assert.equal(t.length,24,'Expected 24 unique industry templates');
assert.equal(new Set(t.map(x=>x.id)).size,t.length);
assert.deepEqual(new Set(Object.keys(r)),new Set(t.map(x=>x.id)));
assert.deepEqual(new Set(Object.keys(e)),new Set(t.map(x=>x.id)));
for(const x of t){
 const entry=r[x.id];assert.ok(entry.modules.length===4,`Incorrect module count ${x.id}`);
 assert.ok(entry.modules.every(m=>allowed.has(m)),`Unknown module ${x.id}`);
 assert.ok(Array.isArray(x.chapters)&&x.chapters.length>=3,`Missing story ${x.id}`);
}
const source=fs.readFileSync('src/studio/AutoCinematicSite.tsx','utf8');
assert.match(source, /<ExperienceModules slot="pre-collection"/);
assert.match(source, /<ExperienceModules slot="post-collection"/);
const model=fs.readFileSync('src/studio/ModelViewport.tsx','utf8');
for(const kind of ['EyewearConcept','SpeakerConcept','GearConcept','CupConcept','BallConcept','ControllerConcept'])assert.ok(model.includes(kind),kind);
console.log(`PASS: ${t.length} templates, ${Object.keys(r).length} recipes, ${allowed.size} active module types and 6 new concept models (static checks only).`);
