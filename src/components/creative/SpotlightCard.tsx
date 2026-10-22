import { useRef,useState,type MouseEvent,type ReactNode } from 'react';
import { cn } from '@/lib/utils';
export function SpotlightCard({children,className=''}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null);const [position,setPosition]=useState({x:0,y:0});
 function move(e:MouseEvent<HTMLDivElement>){const r=ref.current?.getBoundingClientRect();if(r)setPosition({x:e.clientX-r.left,y:e.clientY-r.top});}
 return <div ref={ref} onMouseMove={move} className={cn('group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]',className)}>
 <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100' style={{background:`radial-gradient(340px circle at ${position.x}px ${position.y}px,rgba(139,92,246,.18),transparent 65%)`}}/>
 <div className='relative'>{children}</div></div>;
}
