import type {ReactNode} from 'react';
export function Marquee({items,className='',duration=28}:{items:ReactNode[];className?:string;duration?:number}){
return <div className={`overflow-hidden ${className}`} aria-label="Scrolling highlights"><div className="flex w-max gap-8 motion-reduce:flex-wrap motion-reduce:animate-none" style={{animation:`marqueeMove ${duration}s linear infinite`}}>{[0,1].map(copy=><div key={copy} aria-hidden={copy===1} className="flex shrink-0 items-center gap-8">{items.map((v,i)=><span key={i} className="whitespace-nowrap">{v}</span>)}</div>)}</div></div>;
}
