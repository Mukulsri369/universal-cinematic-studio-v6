import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useReducedMotion} from './useMotionPreferences';
gsap.registerPlugin(ScrollTrigger);
export type MaskedImageRevealProps={src:string;alt:string;caption?:string;ratio?:string;className?:string;priority?:boolean};
export function MaskedImageReveal({src,alt,caption,ratio='4 / 5',className='',priority=false}:MaskedImageRevealProps){
 const root=useRef<HTMLElement>(null);const reduced=useReducedMotion();const [broken,setBroken]=useState(false);
 useEffect(()=>setBroken(false),[src]);
 useEffect(()=>{if(reduced||!root.current||!src)return;
  const ctx=gsap.context(()=>{
   gsap.fromTo(root.current,{clipPath:'inset(14% 12% 14% 12% round 1.25rem)'},{clipPath:'inset(0% 0% 0% 0% round 0rem)',ease:'none',scrollTrigger:{trigger:root.current,start:'top 96%',end:'center 46%',scrub:.6}});
   const picture=root.current!.querySelector('img');if(picture)gsap.fromTo(picture,{scale:1.16},{scale:1,ease:'none',scrollTrigger:{trigger:root.current,start:'top bottom',end:'bottom top',scrub:.6}});
  },root);return()=>ctx.revert();},[src,reduced]);
 return <figure ref={root} className={`cm-image-reveal ${className}`} style={{aspectRatio:ratio}}>
 {src&&!broken?<img src={src} alt={alt} loading={priority?'eager':'lazy'} decoding="async" onError={()=>setBroken(true)}/>:<div className="cm-asset-unavailable" role="img" aria-label="Photo required">Real photograph required</div>}
 {caption&&<figcaption>{caption}</figcaption>}</figure>;
}
