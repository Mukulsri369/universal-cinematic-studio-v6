import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const recipes=read('motion-blueprints.json').templates;
const manifest=read('component-manifest.json').components;
const motions=new Set(manifest.filter(x=>x.category==='cinematic-motion').map(x=>x.id));
test('24 industry templates have matching blueprints',()=>{const ids=read('site-templates.json').map(x=>x.id);assert.equal(recipes.length,ids.length);assert.deepEqual(recipes.map(x=>x.template),ids)});
test('unique valid motion composition per industry',()=>{for(const r of recipes){assert.equal(new Set(r.components).size,r.components.length);assert(r.components.every(x=>motions.has(x)));}});
test('no implicit photo fabrication or source bypass',()=>{for(const r of recipes){assert.equal(r.mediaPolicy.photographicHero,true);assert.equal(r.mediaPolicy.sourcePhotos,true)}});
test('motion system respects reduced motion',()=>{const files=['KineticHeadline','MaskedImageReveal','PinnedHorizontalGallery','CursorPreviewList','StickyChapterStory','ScrollVideoJourney','ScrollFrameSequence','CinematicScrollWorld','LenisScrollBridge'];for(const name of files){const text=fs.readFileSync(`src/motion/${name}.tsx`,'utf8');assert(text.includes('useReducedMotion'),name)}});
test('verified 3d model and poster gate',()=>{const code=fs.readFileSync('src/motion/CinematicScrollWorld.tsx','utf8');assert(code.includes('modelPath'));assert(code.includes('poster'));assert(!code.includes('torusGeometry'))});
test('scoped scroll trigger teardown',()=>{for(const name of ['PinnedHorizontalGallery','StickyChapterStory','ScrollVideoJourney','ScrollFrameSequence','CinematicScrollWorld']){const code=fs.readFileSync(`src/motion/${name}.tsx`,'utf8');assert(code.includes('ScrollTrigger'));assert(code.includes('revert()')||code.includes('.kill()'),name)}});

test('industry composer blocks missing photography',()=>{const src=fs.readFileSync('src/motion/AutoMotionExperience.tsx','utf8');assert(src.includes('Visual assets are required'));assert(src.includes('legitimate.length'));assert(src.includes('MaskedImageReveal'));});
