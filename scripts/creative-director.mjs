/** Deterministic brief interpreter: composition suggestions, NOT generative AI. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {routeBrief} from './brief-router.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const recipes=JSON.parse(fs.readFileSync(path.join(root,'composition-recipes.json'),'utf8'));
export const moduleKinds=['editorial','filmstrip','spotlight','product-rail','process','metrics','material','compare','manifesto','category-index'];
const preferences=[
  {pattern:/\blookbook|editorial photo|campaign|fashion story|visual journal\b/i,modules:['filmstrip','product-rail']},
  {pattern:/\bcompare|comparison|specifications?|technical details?\b/i,modules:['compare','spotlight']},
  {pattern:/\bmaterials?|textures?|finishes?|craftsmanship\b/i,modules:['material','spotlight']},
  {pattern:/\bcollection|catalog|shop|storefront|commerce\b/i,modules:['category-index','product-rail']},
  {pattern:/\bbrand story|storytelling|heritage|craft|origin\b/i,modules:['editorial','process']},
  {pattern:/\bproduct launch|showcase|reveal|hero object\b/i,modules:['spotlight','metrics']},
  {pattern:/\bminimal|quiet luxury|understated\b/i,modules:['editorial','manifesto']},
];
export function directExperience(brief,chosen){
 const base=routeBrief(brief);const templateId=chosen||base.templateId;
 if(!recipes[templateId])throw new Error('Unknown template '+templateId);
 const input=String(brief||'');
 const selected=[];
 for(const rule of preferences)if(rule.pattern.test(input))for(const m of rule.modules)if(!selected.includes(m))selected.push(m);
 for(const m of recipes[templateId].modules)if(!selected.includes(m))selected.push(m);
 return {templateId,modules:selected.slice(0,4),style:recipes[templateId].hero,motionDirection:recipes[templateId].motionPace,
  assetReminder:'For actual product fidelity supply licensed GLB/GLTF models, PBR textures, product photography and verified data.',
  caveat:'Keyword-based composition suggestions; use AI Studio for design interpretation, and inspect result before launch.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2);const i=args.indexOf('--brief');const j=args.indexOf('--template');
 const brief=i>=0?args[i+1]:'';if(!brief){console.error('Usage: npm run site:director -- --brief "editorial lookbook for my sneakers"');process.exit(2);}
 console.log(JSON.stringify(directExperience(brief,j>=0?args[j+1]:undefined),null,2));
}
