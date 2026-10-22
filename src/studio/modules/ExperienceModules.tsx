import { useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, MoveUpRight, Scan } from 'lucide-react';
import './experience-modules.css';
import { PhotographicMedia, isPhotographicPath } from '../media/PhotographicMedia';

export type SiteProduct = {
  id:string;name:string;description?:string;imagePath?:string|null;modelPath?:string|null;
  price?:number|null;currency?:string;concept?:string;category?:string;
  specs?: Record<string,string>;
};
export type SiteModule = 'editorial'|'filmstrip'|'spotlight'|'product-rail'|'process'|'metrics'|'material'|'compare'|'manifesto'|'category-index';
export const moduleTypes:SiteModule[]=['editorial','filmstrip','spotlight','product-rail','process','metrics','material','compare','manifesto','category-index'];
type Props={materialImages?:{id:string;src:string;alt:string}[];modules?:string[];slot:'pre-collection'|'post-collection';brand:string;category:string;summary:string;chapters:string[];products:SiteProduct[];onOpen:(index:number)=>void;reducedMotion:boolean};
type Common=Omit<Props,'modules'|'slot'>;
const inView={initial:{opacity:0,y:32},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.1},transition:{duration:.85,ease:[.22,1,.36,1] as [number,number,number,number]}};
function Intro({eyebrow,title,description}:{eyebrow:string;title:string;description?:string}){
 return <div className="studio-mod-head"><span className="studio-mod-kicker">{eyebrow}</span><h2>{title}</h2>{description&&<p>{description}</p>}</div>;
}
function Picture({p,index}:{p:SiteProduct;index:number}){
 return <div className={`studio-mod-picture studio-mod-picture-${index%5}`}>
 <PhotographicMedia src={p.imagePath} alt={`${p.name} editorial photograph`} kind="product" />
 </div>;
}
export function Editorial({brand,category,summary}:{brand:string;category:string;summary:string}){
 return <motion.section {...inView} className="studio-mod studio-mod-editorial" aria-label="Brand editorial">
 <div className="studio-mod-editorial-index">01 — THE POINT OF VIEW</div><div><span className="studio-mod-kicker">{category} / {brand}</span><h2>Designed to be <em>experienced.</em></h2><p>{summary}</p></div><div className="studio-mod-editorial-ornament" aria-hidden="true"/>
 </motion.section>;
}
export function Filmstrip({products,onOpen}:{products:SiteProduct[];onOpen:(index:number)=>void}){
 return <section className="studio-mod studio-mod-filmstrip" aria-label="Editorial product lookbook"><Intro eyebrow="VISUAL JOURNAL / 01" title="The visual journal." description="Explore the collection as a sequence of stories."/>
 <div className="studio-mod-filmstrip-track">{products.slice(0,6).map((p,i)=><button key={p.id} className="studio-mod-frame" onClick={()=>onOpen(i)} aria-label={`${p.modelPath ? "Inspect 3D model" : "View product"} ${p.name}`}><Picture p={p} index={i}/><span className="studio-mod-frame-caption">{p.name} <ArrowUpRight size={18}/></span></button>)}</div></section>;
}
export function Spotlight({products,onOpen}:{products:SiteProduct[];onOpen:(index:number)=>void}){
 const first=products[0];if(!first)return null;
 return <motion.section {...inView} className="studio-mod studio-mod-spotlight" aria-label="Featured object">
 <div><span className="studio-mod-kicker">THE OBJECT / 001</span><h2>{first.name}</h2><p>{first.description||'Explore the concept from every perspective.'}</p><button className="studio-mod-link" onClick={()=>onOpen(0)}>Explore object <Scan size={19}/></button></div>
 <button className="studio-mod-spotlight-picture" onClick={()=>onOpen(0)} aria-label={`View ${first.name}` }><Picture p={first} index={0}/><span>{first.modelPath ? "OPEN 3D VIEW" : "VIEW PHOTOGRAPH"} <MoveUpRight size={19}/></span></button>
 </motion.section>;
}
export function ProductRail({products,onOpen}:{products:SiteProduct[];onOpen:(index:number)=>void}){
 const [active,setActive]=useState(0);if(!products.length)return null;const forward=(n:number)=>setActive(v=>(v+n+products.length)%products.length);
 return <section className="studio-mod studio-mod-rail" aria-label="Interactive collection browsing"><Intro eyebrow="THE EDIT / CURATED OBJECTS" title="One collection. Many perspectives."/>
 <div className="studio-mod-rail-body"><button onClick={()=>onOpen(active)} className="studio-mod-rail-preview" aria-label={`View ${products[active].name}`}><Picture p={products[active]} index={active}/><span>{products[active].modelPath ? "VIEW IN 3D" : "VIEW PHOTOGRAPH"} <MoveUpRight/></span></button>
 <div className="studio-mod-rail-info"><span className="studio-mod-kicker">0{active+1} / {String(products.length).padStart(2,'0')}</span><h3>{products[active].name}</h3><p>{products[active].description||'Detailed 3D exploration is available for this conceptual collection.'}</p><div className="studio-mod-rail-actions"><button onClick={()=>forward(-1)} aria-label="Previous product"><ChevronLeft/></button><button onClick={()=>forward(1)} aria-label="Next product"><ChevronRight/></button></div></div></div>
 </section>;
}
export function Process({chapters}:{chapters:string[]}){
 return <section className="studio-mod studio-mod-process" aria-label="Story milestones"><Intro eyebrow="OUR APPROACH" title="Three chapters. One point of view."/>
 <div className="studio-mod-steps">{chapters.slice(0,4).map((x,i)=><motion.div {...inView} key={`${x}-${i}`} className="studio-mod-step"><span>{String(i+1).padStart(2,'0')}</span><h3>{x}</h3><ArrowUpRight size={20}/></motion.div>)}</div></section>;
}
export function Metrics({products}:{products:SiteProduct[]}){
 const numbers=[{n:products.length,label:'Collection objects'},{n:products.filter(p=>p.modelPath).length,label:'Owner-supplied 3D assets'},{n:products.filter(p=>isPhotographicPath(p.imagePath)).length,label:'Products with photographic files'}];
 return <section className="studio-mod studio-mod-metrics" aria-label="Collection overview"><span className="studio-mod-kicker">COLLECTION OVERVIEW — VERIFIED FROM CONFIGURATION</span><div className="studio-mod-metrics-grid">{numbers.map(x=><div key={x.label}><strong>{String(x.n).padStart(2,'0')}</strong><span>{x.label}</span></div>)}</div></section>;
}
export function Material({category,summary,products,materialImages=[]}:{category:string;summary:string;products:SiteProduct[];materialImages?:{id:string;src:string;alt:string}[]}){
 const caption=['LIGHT / SHADOW','FORM / FINISH',`${category.toUpperCase()} / MOOD`];
 return <section className="studio-mod studio-mod-material" aria-label="Material design direction"><Intro eyebrow="MATERIAL EXPLORATION" title="A study in texture and light." description={summary}/>
 <div className="studio-mod-material-board">{caption.map((text,i)=><div key={text}><PhotographicMedia src={materialImages[i]?.src||products[i]?.imagePath} alt={materialImages[i]?.alt||`${products[i]?.name||category} material detail`} kind="material"/><span className="studio-mod-kicker">{text}</span><span>0{i+1}</span></div>)}</div><p className="studio-mod-note">Materials depicted are artistic presentations; verify actual product composition with the seller.</p></section>;
}
export function Compare({products,onOpen}:{products:SiteProduct[];onOpen:(index:number)=>void}){
 if(products.length<2)return null;
 return <section className="studio-mod studio-mod-compare" aria-label="Product comparison"><Intro eyebrow="EXPLORE SIDE BY SIDE" title="Find your perspective." description="Only product details supplied in this project are displayed."/>
 <div className="studio-mod-compare-grid">{products.slice(0,3).map((p,i)=><div key={p.id}><Picture p={p} index={i}/><h3>{p.name}</h3>{p.specs?Object.entries(p.specs).slice(0,5).map(([k,v])=><div className="studio-mod-spec" key={k}><span>{k}</span><strong>{v}</strong></div>):<p className="studio-mod-note">No verified specifications supplied.</p>}<button className="studio-mod-link" onClick={()=>onOpen(i)}>Inspect object <ArrowUpRight size={17}/></button></div>)}</div></section>;
}
export function Manifesto({brand,summary}:{brand:string;summary:string}){
 return <motion.section {...inView} className="studio-mod studio-mod-manifesto" aria-label="Brand manifesto"><span className="studio-mod-kicker">A DIFFERENT KIND OF DIGITAL STORY</span><h2>Look closer.<br/><em>Feel more.</em></h2><p>{summary}</p><span className="studio-mod-manifesto-signature">{brand}</span></motion.section>;
}
export function CategoryIndex({products,onOpen}:{products:SiteProduct[];onOpen:(index:number)=>void}){
 const grouped=Object.entries(products.reduce<Record<string,{index:number;count:number}>>((o,p,i)=>{const k=p.category||p.concept||'collection';if(!o[k])o[k]={index:i,count:0};o[k].count++;return o;},{}));
 return <section className="studio-mod studio-mod-index" aria-label="Browse by category"><Intro eyebrow="DISCOVER THE COLLECTION" title="Choose your direction."/><div className="studio-mod-index-items">{grouped.map(([name,{index,count}],i)=><button onClick={()=>onOpen(index)} key={name}><span>0{i+1}</span><strong>{name}</strong><span>{count} OBJECT{count===1?'':'S'}</span><ArrowRight size={24}/></button>)}</div></section>;
}
export function ExperienceModules({modules=[],slot,...props}:Props){
 const allowed=modules.filter((m):m is SiteModule=>moduleTypes.includes(m as SiteModule));
 const chosen=slot==='pre-collection'?allowed.slice(0,2):allowed.slice(2,4);
 return <MotionConfig reducedMotion="user">{chosen.map((m,i)=>{const key=`${m}-${i}-${slot}`;switch(m){
 case 'editorial':return <Editorial key={key} {...props}/>;
 case 'filmstrip':return <Filmstrip key={key} {...props}/>;
 case 'spotlight':return <Spotlight key={key} {...props}/>;
 case 'product-rail':return <ProductRail key={key} {...props}/>;
 case 'process':return <Process key={key} {...props}/>;
 case 'metrics':return <Metrics key={key} {...props}/>;
 case 'material':return <Material key={key} {...props}/>;
 case 'compare':return <Compare key={key} {...props}/>;
 case 'manifesto':return <Manifesto key={key} {...props}/>;
 case 'category-index':return <CategoryIndex key={key} {...props}/>;
 }})}</MotionConfig>;
}
export default ExperienceModules;
