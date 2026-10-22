import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {useReducedMotion} from './useMotionPreferences';
export type PreviewItem={id:string;name:string;image:string;href:string;category?:string};
/** Pointer preview is decorative. Keyboard and touch users retain full image and link access. */
export function CursorPreviewList({items}:{items:PreviewItem[]}){
 const [active,setActive]=useState<string|null>(null);const floating=useRef<HTMLDivElement>(null);const reduced=useReducedMotion();
 useEffect(()=>{const element=floating.current;if(!element||reduced)return;
  const x=gsap.quickTo(element,'x',{duration:.35,ease:'power3.out'});const y=gsap.quickTo(element,'y',{duration:.35,ease:'power3.out'});
  const move=(e:PointerEvent)=>{if(e.pointerType==='mouse'){x(e.clientX+22);y(e.clientY-100);}};
  window.addEventListener('pointermove',move,{passive:true});return()=>{window.removeEventListener('pointermove',move);gsap.set(element,{clearProps:'transform'});};
 },[reduced]);
 const item=items.find(x=>x.id===active);
 return <div className="cm-preview-list" onMouseLeave={()=>setActive(null)}>
  {items.map((x,i)=><a href={x.href} className="cm-preview-row" key={x.id} onMouseEnter={()=>setActive(x.id)} onFocus={()=>setActive(x.id)} onBlur={()=>setActive(null)}>
   <span>{String(i+1).padStart(2,'0')}</span><strong>{x.name}</strong><small>{x.category}</small><span aria-hidden="true">↗</span>
   <div className="cm-preview-mobile">{x.image?<img src={x.image} alt="" loading="lazy"/>:null}</div>
  </a>)}
  {!reduced&&<div className={`cm-preview-float ${item?.image?'cm-preview-visible':''}`} ref={floating} aria-hidden="true">{item?.image&&<img src={item.image} alt=""/>}</div>}
 </div>;
}
