import {useRef,type MouseEvent,type ReactNode} from 'react';
import {motion,useReducedMotion} from 'motion/react';
export function TiltCard({children,className=''}:{children:ReactNode;className?:string}){
const reduced=useReducedMotion();const ref=useRef<HTMLDivElement>(null);const onMove=(e:MouseEvent<HTMLDivElement>)=>{if(!ref.current||reduced)return;const r=e.currentTarget.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;ref.current.style.transform=`perspective(900px) rotateX(${-y*7}deg) rotateY(${x*7}deg)`};
return <motion.div ref={ref} className={`transform-gpu transition-transform duration-200 ${className}`} onMouseMove={onMove} onMouseLeave={()=>{if(ref.current)ref.current.style.transform='none'}}>{children}</motion.div>;
}
