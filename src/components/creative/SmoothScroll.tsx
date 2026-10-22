import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
export function SmoothScroll({children}:{children:ReactNode}){
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const scroll=new Lenis({autoRaf:true}); return ()=>scroll.destroy();},[]);
 return <>{children}</>;
}
