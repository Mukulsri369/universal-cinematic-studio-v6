import {useEffect, type ReactNode} from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useReducedMotion} from './useMotionPreferences';
gsap.registerPlugin(ScrollTrigger);
/** Mount ONCE at an app root. Do not also mount the legacy SmoothScroll component. */
export function LenisScrollBridge({children}:{children:ReactNode}){
 const reduced=useReducedMotion();
 useEffect(()=>{
  if(reduced)return;
  const lenis=new Lenis({autoRaf:false});
  const tick=(time:number)=>lenis.raf(time*1000);
  const update=()=>ScrollTrigger.update();
  lenis.on('scroll',update);gsap.ticker.add(tick);
  ScrollTrigger.refresh();
  return()=>{gsap.ticker.remove(tick);lenis.off('scroll',update);lenis.destroy();ScrollTrigger.refresh();};
 },[reduced]);
 return <>{children}</>;
}
