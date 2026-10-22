import test from 'node:test';
import assert from 'node:assert/strict';
import {routeBrief} from '../scripts/brief-router.mjs';
test('routes clothing brand to fashion, jewellery to jewellery, lighting to lighting',()=>{
 assert.equal(routeBrief('cinematic clothing fashion brand').templateId,'fashion-runway');
 assert.equal(routeBrief('diamond jewelry rings').templateId,'jewelry-atelier');
 assert.equal(routeBrief('designer chandelier lighting collection').templateId,'lighting-studio');
});
test('ambiguous request declares low confidence',()=>{
 const result=routeBrief('Hello new things');assert.equal(result.confidence,'low');assert.ok(result.notes.length);
});
