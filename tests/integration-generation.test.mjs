import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
const templates=JSON.parse(fs.readFileSync('site-templates.json','utf8'));
const modules=new Set(['editorial','filmstrip','spotlight','product-rail','process','metrics','material','compare','manifesto','category-index']);
const cli=path.resolve('scripts/new-site.mjs');
function run(args){return spawnSync(process.execPath,[cli,...args],{encoding:'utf8',timeout:4000});}
test('all 24 templates generate valid brand JSON without mutating source',()=>{
 const before=fs.readFileSync('src/studio/generated.site.json');
 for(const t of templates){
  const r=run(['--template',t.id,'--brand','TEST STUDIO','--dry-run']);
  assert.equal(r.status,0,`${t.id}: ${r.stderr}`);
  const cfg=JSON.parse(r.stdout);
  assert.equal(cfg.template,t.id);assert.equal(cfg.products.length,3);
  assert.equal(cfg.recipe.length,4);
  assert.equal(new Set(cfg.recipe).size,4);
  assert.ok(cfg.recipe.every(m=>modules.has(m)));
  assert.ok(cfg.experience,`${t.id} lacks cinematic experience`);
 }
 assert.deepEqual(fs.readFileSync('src/studio/generated.site.json'),before);
});
test('product-level conceptual and real assets configure independently',()=>{
 const dir=fs.mkdtempSync(path.join(process.cwd(),'examples','test-temp-'));
 try{
  const products=[
   {id:'sh-01',name:'Walking sneaker',modelPath:'/models/sneaker.glb',imagePath:'/images/sneaker.webp',price:4999,currency:'INR',concept:'sneaker',hotspots:[{id:'sole',label:'Midsole',position:[0,0,1]}]},
   {id:'wa-02',name:'Silver watch',modelPath:null,imagePath:null,concept:'watch',price:null},
   {id:'ey-03',name:'Sunglasses',modelPath:null,imagePath:null,concept:'eyewear'}
  ];
  const file=path.join(dir,'data.json');fs.writeFileSync(file,JSON.stringify({products}));
  const r=run(['--template','fashion-runway','--brand','FASHION TEST','--spec',path.relative(process.cwd(),file),'--dry-run']);
  assert.equal(r.status,0,r.stderr);
  const cfg=JSON.parse(r.stdout);assert.equal(cfg.products.length,3);
  assert.deepEqual(cfg.products.map(x=>x.concept),['sneaker','watch','eyewear']);
  assert.equal(cfg.products[0].modelPath,'/models/sneaker.glb');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('reject duplicate IDs, unsafe file paths and invalid pricing before generation',()=>{
 const dir=fs.mkdtempSync(path.join(process.cwd(),'examples','test-temp-'));
 try{
  const data=[
   [{id:'1',name:'A'}, {id:'1',name:'B'}],
   [{id:'1',name:'A',modelPath:'/models/../../etc/passwd'}],
   [{id:'1',name:'A',price:-100}],
   [{id:'1',name:'A',imagePath:'https://example.com/a.png'}]
  ];
  const file=path.join(dir,'data.json');
  for(const products of data){fs.writeFileSync(file,JSON.stringify({products}));const r=run(['--spec',path.relative(process.cwd(),file),'--brand','SAFETY','--dry-run']);assert.notEqual(r.status,0,`Unsafe spec permitted: ${JSON.stringify(products)}`);}
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
