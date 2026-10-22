import {lazy,Suspense,useMemo,useState} from 'react';
import type {CSSProperties} from 'react';
import {motion} from 'motion/react';
import {ArrowRight,ArrowUpRight,ChevronLeft,ChevronRight,X} from 'lucide-react';
import config from './generated.site.json';
import {PhotographicMedia} from './media/PhotographicMedia';
import {ExperienceModules} from './modules/ExperienceModules';
import './universal-asset-site.css';
const ModelViewport=lazy(()=>import('./ModelViewport'));
type Product={id:string;name:string;description?:string;category?:string;imagePath?:string|null;modelPath?:string|null;concept?:string;price?:number|null;currency?:string;purchaseUrl?:string|null};
type Site={brand:string;headline:string;emphasis?:string;eyebrow?:string;summary?:string;category:string;background:string;foreground:string;accent:string;secondary:string;heroImagePath?:string|null;assetMode?:string;products:Product[];chapters:string[];recipe?:string[];materialImages?:{id:string;src:string;alt:string}[]};
const site=config as unknown as Site;
const entrance={initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.15},transition:{duration:.85,ease:[.22,1,.36,1] as [number,number,number,number]}};
function price(p:Product){if(p.price===null||p.price===undefined)return 'Enquire for details';try{return new Intl.NumberFormat('en-IN',{style:'currency',currency:p.currency||'INR'}).format(p.price);}catch{return String(p.price);}}
export default function UniversalAssetSite(){
 const [category,setCategory]=useState('all');const [selected,setSelected]=useState<number|null>(null);
 const kinds=useMemo(()=>['all',...new Set(site.products.map(p=>p.category||site.category))],[site.products]);
 const visible=site.products.map((p,i)=>({p,i})).filter(({p})=>category==='all'||(p.category||site.category)===category);
 const item=selected===null?null:site.products[selected];
 const next=(n:number)=>setSelected(i=>(i===null?0:(i+n+site.products.length)%site.products.length));
 return <div className="uas" style={{'--uas-bg':site.background,'--uas-ink':site.foreground,'--uas-accent':site.accent,'--uas-second':site.secondary} as CSSProperties}>
 <header className="uas-nav"><a href="#top" className="uas-brand">{site.brand}</a><nav><a href="#story">Story</a><a href="#collection">Collection</a><a href="#craft">Craft</a></nav><span className="uas-mode">{site.assetMode==='commercial-verified'?'MERCHANT ASSETS':'FICTIONAL VISUAL DEMO'}</span></header>
 <main id="top">
 <section className="uas-hero"><div className="uas-hero-visual"><PhotographicMedia src={site.heroImagePath} alt={`${site.brand} campaign photography`} kind="hero" eager/></div><div className="uas-hero-content"><motion.div {...entrance}><span className="uas-eyebrow">{site.eyebrow||'A CURATED EXPERIENCE'}</span><h1>{site.headline} <em>{site.emphasis}</em></h1><p>{site.summary}</p><a className="uas-cta" href="#collection">Discover the collection <ArrowRight size={18}/></a></motion.div></div><a className="uas-scroll" href="#story">SCROLL TO EXPLORE ↓</a></section>
 <section id="story" className="uas-story"><div className="uas-intro"><span className="uas-eyebrow">THE STORY</span><h2>Made to be <em>experienced.</em></h2></div><div className="uas-chapters">{site.chapters.map((s,i)=><motion.div {...entrance} key={i}><span>{String(i+1).padStart(2,'0')}</span><h3>{s}</h3></motion.div>)}</div></section>
 <ExperienceModules slot="pre-collection" modules={site.recipe} brand={site.brand} category={site.category} summary={site.summary||''} chapters={site.chapters} products={site.products} materialImages={site.materialImages} onOpen={setSelected} reducedMotion={false}/>
 <section id="collection" className="uas-collection"><span className="uas-eyebrow">THE COLLECTION</span><h2>Objects with <em>presence.</em></h2><div className="uas-filters" role="group" aria-label="Product categories">{kinds.map(k=><button key={k} type="button" className={category===k?'active':''} onClick={()=>setCategory(k)}>{k}</button>)}</div><div className="uas-grid">{visible.map(({p,i})=><motion.article {...entrance} className="uas-product" key={p.id}><button onClick={()=>setSelected(i)} aria-label={`View ${p.name}`} className="uas-product-photo"><PhotographicMedia src={p.imagePath} alt={`Photograph of ${p.name}`} kind="product"/><span>{p.modelPath?'EXPLORE ACTUAL 3D MODEL':'VIEW PHOTOGRAPH'} <ArrowUpRight size={17}/></span></button><div className="uas-product-caption"><div><span className="uas-eyebrow">{p.category||site.category}</span><h3>{p.name}</h3><p>{p.description}</p></div><div><strong>{price(p)}</strong>{p.purchaseUrl&&<a href={p.purchaseUrl} rel="noopener noreferrer sponsored" target="_blank">View seller <ArrowUpRight size={15}/></a>}</div></div></motion.article>)}</div></section>
 <section id="craft"><ExperienceModules slot="post-collection" modules={site.recipe} brand={site.brand} category={site.category} summary={site.summary||''} chapters={site.chapters} products={site.products} materialImages={site.materialImages} onOpen={setSelected} reducedMotion={false}/></section>
 <footer className="uas-footer"><div>{site.brand}</div><span>{site.assetMode==='commercial-verified'?'Commercial imagery supplied by merchant. Verify product listings before purchase.':'FICTIONAL DEMO: Imagery is illustrative, not photographs of actual inventory.'}</span><a href="#top">Back to top ↑</a></footer>
 </main>
 {item&&<div className="uas-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><section role="dialog" aria-modal="true" aria-label={`Product details for ${item.name}`} className="uas-dialog"><header><h2>{item.name}</h2><button onClick={()=>setSelected(null)} aria-label="Close"> <X/></button></header><div className="uas-inspect">{item.modelPath?<Suspense fallback={<div className="uas-loading">Loading 3D model…</div>}><ModelViewport modelPath={item.modelPath} concept={item.concept} interactive stage="detail" label={item.name} /></Suspense>:<PhotographicMedia src={item.imagePath} alt={`Detailed photo of ${item.name}`} kind="viewer"/>}</div><div className="uas-dialog-foot"><span>{item.modelPath?'Drag to orbit genuine model · zoom to inspect':'Photo view · no verified 3D model for this item'}</span><div><button aria-label="Previous item" onClick={()=>next(-1)}><ChevronLeft/></button><button aria-label="Next item" onClick={()=>next(1)}><ChevronRight/></button></div></div></section></div>}
 </div>;
}
