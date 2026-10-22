import {useEffect,useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useReducedMotion} from './useMotionPreferences';
gsap.registerPlugin(ScrollTrigger);
/** Image-sequence alternative to video seek; frames must be provided by the site owner. */
export function ScrollFrameSequence({frames,alt,scrollScreens=3}:{frames:string[];alt:string;scrollScreens?:number}){
 const root=useRef<HTMLElement>(null);const image=useRef<HTMLImageElement>(null);const reduced=useReducedMotion();
 useEffect(()=>{if(reduced||frames.length<2||!root.current||!image.current)return;
  let last=-1;const trigger=ScrollTrigger.create({trigger:root.current,start:'top top',end:()=>`+=${Math.max(1,scrollScreens)*window.innerHeight}`,pin:true,scrub:true,invalidateOnRefresh:true,
   onUpdate:self=>{const i=Math.min(frames.length-1,Math.floor(self.progress*(frames.length-1)));if(i!==last&&image.current){last=i;image.current.src=frames[i];}}
  });
  const warm=frames.slice(0,Math.min(5,frames.length)).map(src=>{const img=new Image();img.src=src;return img;});
  return()=>{trigger.kill();warm.forEach(img=>{img.onload=null;});};
 },[frames,reduced,scrollScreens]);
 return <section className="cm-frame" ref={root} aria-label={alt}>{frames.length?<img ref={image} src={frames[0]} alt={alt}/>:<div className="cm-asset-unavailable">Render frames required</div>}</section>;
}
