import { useEffect,useRef,useState } from 'react';
import gsap from 'gsap';
export function AnimatedCounter({value,suffix=''}:{value:number;suffix?:string}){
 const [amount,setAmount]=useState(0); const holder=useRef<HTMLSpanElement>(null);
 useEffect(()=>{if(!holder.current)return; if(matchMedia('(prefers-reduced-motion: reduce)').matches){setAmount(value);return;}
 const target={n:0};const observer=new IntersectionObserver((entries)=>{if(!entries[0]?.isIntersecting)return; const t=gsap.to(target,{n:value,duration:1.5,ease:'power2.out',onUpdate:()=>setAmount(Math.round(target.n))});observer.disconnect();return()=>t.kill();});observer.observe(holder.current);return()=>observer.disconnect();},[value]);
 return <span ref={holder}>{amount.toLocaleString()}{suffix}</span>;
}
