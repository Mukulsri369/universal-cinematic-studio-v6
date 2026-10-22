import test from 'node:test';
import assert from 'node:assert/strict';
import {inferConcept} from '../scripts/concept-router.mjs';
test('different products get different conceptual models, not generic fashion prop',()=>{
 assert.equal(inferConcept('Mens Leather Sneaker','fabric'),'sneaker');
 assert.equal(inferConcept('Evening Saree','sculpture'),'fabric');
 assert.equal(inferConcept('Gold Bracelet','sculpture'),'rings');
 assert.equal(inferConcept('Signature Watch','sculpture'),'watch');
});
