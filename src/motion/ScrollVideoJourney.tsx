import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useReducedMotion} from './useMotionPreferences';
gsap.registerPlugin(ScrollTrigger);
/** Scroll scrubs an owner-supplied, seekable MP4/WebM. Doesn't render or generate videos. */
export function ScrollVideoJourney({src,poster,caption,scrollScreens=4}:{src:string;poster:string;caption?:string;scrollScreens?:number}){
 const section=useRef<HTMLElement>(null);const video=useRef<HTMLVideoElement>(null);const reduced=useReducedMotion();const [failed,setFailed]=useState(false);
 useEffect(()=>setFailed(false),[src]);
 useEffect(()=>{if(reduced||!section.current||!video.current||!src)return;const el=video.current;
  let raf=0;let pending=0;let duration=0;let trigger:ScrollTrigger|undefined;
  const seek=()=>{raf=0;if(duration&&el.readyState>=1){try{if(Math.abs(el.currentTime-pending)>.035)el.currentTime=pending;}catch{ /* unavailable media */ }}};
  const metadata=()=>{trigger?.kill();duration=Math.max(0,el.duration-.05);if(!Number.isFinite(duration))duration=0;
   trigger=ScrollTrigger.create({trigger:section.current,start:'top top',end:()=>`+=${Math.max(1,scrollScreens)*window.innerHeight}`,pin:true,scrub:true,invalidateOnRefresh:true,
    onUpdate:self=>{pending=self.progress*duration;if(!raf)raf=requestAnimationFrame(seek);}});
  };
  el.pause();el.addEventListener('loadedmetadata',metadata);if(el.readyState>=1)metadata();
  return()=>{el.removeEventListener('loadedmetadata',metadata);trigger?.kill();cancelAnimationFrame(raf);};
 },[src,reduced,scrollScreens]);
 return <section className="cm-video" ref={section} aria-label={caption||'Scroll-controlled cinematic video'}>
  {src&&!failed?<video ref={video} preload="metadata" playsInline muted poster={poster||undefined} aria-label={caption||'Cinematic footage'} src={src} onError={()=>setFailed(true)}/>:poster?<img src={poster} alt={caption||'Campaign poster'}/>:<div className="cm-asset-unavailable">A real video or campaign image is required</div>}
  {caption&&<div className="cm-video-caption">{caption}</div>}
 </section>;
}
