import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const templates=JSON.parse(fs.readFileSync(path.join(root,'site-templates.json'),'utf8'));
const tokens={
  'luxury-product':['luxury','premium','luxury goods','handbag','designer','leather'],
  'lighting-studio':['lamp','lighting','light fixtures','chandelier','pendant','luminaire'],
  'jewelry-atelier':['jewel','jewellery','jewelry','diamond','ring','necklace','gold'],
  'automotive-motion':['automobile','automotive','car','vehicle','motorcycle','suv','ev'],
  'fashion-runway':['clothing','fashion','apparel','streetwear','garment','dress','shoes','sneaker','runway','menswear','womenswear','boutique'],
  'cosmic-experience':['space','astronomy','cosmos','galaxy','planet','universe'],
  'creator-commerce':['affiliate','influencer','creator','curated','storefront','product finds','deals'],
  'tech-launch':['hardware','phone','electronics','gadget','headphones','camera','technology'],
  'architecture-gallery':['architecture','interior','property','home decor','real estate','furniture','design studio'],
  'wellness-organic':['wellness','skincare','serum','organic','beauty','health','cosmetics'],
  'saas-interactive':['software','saas','crm','app','platform','dashboard','analytics'],
  'art-exhibition':['art','museum','exhibition','gallery','sculpture','installation'],
  'footwear-lab':["footwear", "running shoes", "trainers", "athletic shoe", "sneakers", "sneaker brand", "footwear brand"],
  'fragrance-noir':["fragrance", "perfume", "perfumery", "cologne", "scents", "eau de parfum"],
  'eyewear-atelier':["eyewear", "glasses", "sunglasses", "spectacles", "frames", "optical"],
  'audio-soundstage':["audio", "hifi", "hi fi", "speaker", "earbuds", "sound system", "headset", "audiophile"],
  'furniture-form':["furniture", "sofa", "armchair", "tables", "home furnishings"],
  'hospitality-escape':["hotel", "resort", "hospitality", "staycation", "retreat", "boutique hotel", "villa"],
  'beauty-ritual':["beauty brand", "skincare", "makeup", "skin care", "cosmetics", "serum"],
  'outdoor-expedition':["outdoor", "camping", "hiking", "trekking", "backpack", "adventure gear"],
  'culinary-artisan':["food", "coffee", "tea", "restaurant", "bakery", "cafe", "chocolate", "beverage"],
  'sport-performance':["sports", "sporting", "athlete", "training", "fitness equipment", "performance gear"],
  'learning-lab':["school", "learning", "education", "course", "museum learning", "edtech"],
  'gaming-universe':["gaming", "game controller", "esports", "consoles", "gaming pc"]
};
export function routeBrief(brief){
  const words=` ${String(brief||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ')} `;
  const scored=templates.map(t=>{
    let score=0; const matched=[];
    for(const tag of (tokens[t.id]||[]))if(words.includes(` ${tag} `)){score+=tag.includes(' ')?7:3;matched.push(tag);}
    return {id:t.id,name:t.name,score,matched};
  }).sort((a,b)=>b.score-a.score||(a.id<b.id?-1:1));
  const chosen=scored[0].score?scored[0].id:'luxury-product';
  const template=templates.find(t=>t.id===chosen);
  return {templateId:chosen,confidence:scored[0].score>=4?'high':scored[0].score>0?'medium':'low',matches:scored.filter(x=>x.score>0).slice(0,4),
    experience:{category:template.category,concept:template.concept,layout:template.layout},
    notes:scored[0].score?[]:['No industry keywords matched. This defaults to luxury-product: confirm the industry before launch.']};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const args=process.argv.slice(2);
  const idx=args.indexOf('--brief');const brief=idx<0?args.join(' '):args[idx+1];
  if(!brief){console.error('Usage: npm run site:brief -- --brief "premium clothing and accessories brand"');process.exit(2);}
  console.log(JSON.stringify(routeBrief(brief),null,2));
}
