import { useEffect,useRef } from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useReducedMotion,useWideViewport} from './useMotionPreferences';
gsap.registerPlugin(ScrollTrigger);
export type GalleryItem={id:string;image:string;alt:string;title:string;eyebrow?:string;href?:string};
export function PinnedHorizontalGallery({items,title='The collection'}:{items:GalleryItem[];title?:string}){
 const section=useRef<HTMLElement>(null);const rail=useRef<HTMLDivElement>(null);const reduced=useReducedMotion();const wide=useWideViewport();
 useEffect(()=>{const wrapper=section.current;const track=rail.current;if(!wide||reduced||!wrapper||!track||items.length<2)return;
  const ctx=gsap.context(()=>{
   const distance=()=>Math.max(0,track.scrollWidth-wrapper.clientWidth);
   const tween=gsap.to(track,{x:()=>-distance(),ease:'none',scrollTrigger:{trigger:wrapper,start:'top top',end:()=>`+=${distance()+window.innerHeight*.35}`,scrub:.7,pin:true,invalidateOnRefresh:true,anticipatePin:1}});
   ScrollTrigger.refresh();return()=>{tween.kill();};
  },wrapper);return()=>ctx.revert();},[items,reduced,wide]);
 return <section className="cm-horizontal" ref={section} aria-label={title}>
  <div className="cm-horizontal-heading"><span>THE EDIT</span><h2>{title}</h2></div>
  <div className="cm-horizontal-viewport"><div className="cm-horizontal-track" ref={rail}>{items.map((x,i)=>
   <article className="cm-gallery-card" key={x.id}>
    {x.href?<a href={x.href} className="cm-gallery-image" aria-label={x.alt}>{x.image?<img src={x.image} alt={x.alt} loading="lazy"/>:<span>Photograph required</span>}</a>:<div className="cm-gallery-image">{x.image?<img src={x.image} alt={x.alt} loading="lazy"/>:<span>Photograph required</span>}</div>}
    <div className="cm-gallery-meta"><span>{x.eyebrow||String(i+1).padStart(2,'0')}</span><h3>{x.title}</h3></div>
   </article>)}</div></div>
 </section>;
}
