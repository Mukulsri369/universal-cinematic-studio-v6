import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {routeBrief} from '../scripts/brief-router.mjs';
import {directExperience} from '../scripts/creative-director.mjs';
import {inferConcept} from '../scripts/concept-router.mjs';
const read=(name)=>JSON.parse(fs.readFileSync(new URL('../'+name,import.meta.url),'utf8'));
test('v6 has exactly 24 complete style, recipe and template entries',()=>{
 const templates=read('site-templates.json'),recipes=read('composition-recipes.json'),effects=read('experience-presets.json');
 assert.equal(templates.length,24);for(const t of templates){assert.ok(recipes[t.id]);assert.ok(effects[t.id]);assert.equal(recipes[t.id].modules.length,4);}
});
test('v6 specialized routing chooses meaningful templates',()=>{
 for(const [brief,expected] of [['cinematic fragrance perfume line','fragrance-noir'],['premium sunglasses eyewear','eyewear-atelier'],['gaming console brand','gaming-universe'],['boutique hotel resort','hospitality-escape'],['specialty coffee roastery','culinary-artisan'],['camping hiking brand','outdoor-expedition'],['sporting athlete equipment','sport-performance'],['skincare beauty brand','beauty-ritual'],['hi fi audio speaker','audio-soundstage']])assert.equal(routeBrief(brief).templateId,expected,brief);
});
test('product routing chooses distinct 3D silhouettes',()=>{
 for(const [name,expected] of [['Crystal eyewear','eyewear'],['Premium speaker','speaker'],['Hiking backpack','gear'],['Coffee mug','cup'],['Basketball','ball'],['Gamepad controller','controller']])assert.equal(inferConcept(name),expected,name);
});

test('creative director composes based on brief without leaving unsafe unknown modules',()=>{
 const d=directExperience('fashion lookbook product comparison and material study','fashion-runway');
 assert.equal(d.templateId,'fashion-runway');assert.equal(d.modules.length,4);
 assert.ok(d.modules.includes('filmstrip'));assert.ok(d.modules.includes('compare'));assert.equal(new Set(d.modules).size,4);
});
