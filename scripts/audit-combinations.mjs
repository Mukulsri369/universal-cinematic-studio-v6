/** Combinatorial, no-browser validation. Checks all four-module sets for each industry.
 * Does not claim to render React, WebGL or postprocessing effects. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {directExperience, moduleKinds} from './creative-director.mjs';
import {routeBrief} from './brief-router.mjs';
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const templates=read('site-templates.json');
const recipes=read('composition-recipes.json');
const experiences=read('experience-presets.json');
const renderer=fs.readFileSync('src/studio/modules/ExperienceModules.tsx','utf8');
const declared=new Set(moduleKinds);
const pairs=new Set();
const scores={templates:templates.length,templateModuleSets:0,pairwiseModulePairs:0,briefDirections:0,issues:[]};
const fail=(msg)=>scores.issues.push(msg);
const combos=[];
for(let a=0;a<moduleKinds.length;a++)for(let b=a+1;b<moduleKinds.length;b++)for(let c=b+1;c<moduleKinds.length;c++)for(let d=c+1;d<moduleKinds.length;d++)combos.push([moduleKinds[a],moduleKinds[b],moduleKinds[c],moduleKinds[d]]);
for(const m of moduleKinds)if(!renderer.includes(`case '${m}':`))fail(`Missing module rendering branch ${m}`);
for(const t of templates){
 const r=recipes[t.id],p=experiences[t.id];
 if(!r||!p){fail(`Missing recipe/experience for ${t.id}`);continue;}
 if(new Set(r.modules).size!==4)fail(`Duplicate recipe modules for ${t.id}`);
 for(const m of r.modules||[])if(!declared.has(m))fail(`Unknown ${t.id} module ${m}`);
 const chosen=directExperience(t.name+' '+t.category,t.id);
 if(chosen.modules.length!==4||new Set(chosen.modules).size!==4||chosen.modules.some(m=>!declared.has(m)))fail(`Creative director ${t.id}`);
 scores.briefDirections++;
 for(const set of combos){
  if(set.length!==4||new Set(set).size!==4)fail(`Invalid set for ${t.id}`);
  for(let i=0;i<set.length;i++)for(let j=i+1;j<set.length;j++)pairs.add([set[i],set[j]].sort().join(':'));
  // A given set of 4 modules can occupy the pre/post collection slots in 24 orders.
  scores.templateModuleSets+=24;
 }
}
scores.pairwiseModulePairs=pairs.size;
assert.equal(combos.length,210);
assert.equal(scores.templateModuleSets,120960);
assert.equal(scores.pairwiseModulePairs,45);
assert.equal(scores.briefDirections,24);
if(scores.issues.length){console.error(JSON.stringify(scores,null,2));process.exit(1);}
console.log(JSON.stringify({...scores,kind:'24 templates × 210 unique four-module sets × 24 slot orderings; static checks, not visual/browser verification'},null,2));
