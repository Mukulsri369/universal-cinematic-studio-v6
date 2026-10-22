import { useRef, type MouseEvent } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function MagneticButton({href='#catalog',children='Explore toolkit'}:{href?:string;children?:string}){
 const ref=useRef<HTMLAnchorElement>(null);
 function move(event:MouseEvent<HTMLAnchorElement>){if(!ref.current || matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const rect=ref.current.getBoundingClientRect(); gsap.to(ref.current,{x:(event.clientX-rect.left-rect.width/2)*.12,y:(event.clientY-rect.top-rect.height/2)*.12,duration:.35,ease:'power2.out'});}
 function reset(){if(ref.current)gsap.to(ref.current,{x:0,y:0,duration:.45,ease:'elastic.out(1,.4)'});}
 return <Button asChild><a ref={ref} href={href} onMouseMove={move} onMouseLeave={reset}>{children}<ArrowUpRight size={17}/></a></Button>;
}
