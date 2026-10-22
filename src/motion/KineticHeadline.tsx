import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useMotionPreferences';

gsap.registerPlugin(ScrollTrigger);
export type KineticHeadlineProps = { text: string; as?: 'h1'|'h2'|'h3'|'p'; className?: string; stagger?: number; trigger?: 'enter'|'scrub' };
/** Original word-by-word reveal: accessible text stays in the DOM, spans are visual only. */
export function KineticHeadline({text,as='h2',className='',stagger=.045,trigger='enter'}: KineticHeadlineProps) {
  const el = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !el.current) return;
    const ctx = gsap.context(() => {
      const words = el.current!.querySelectorAll('[data-kinetic-word]');
      gsap.fromTo(words, {yPercent:110,rotate:2,opacity:0}, {
        yPercent:0,rotate:0,opacity:1,stagger:trigger==='enter'?stagger:0,ease:trigger==='scrub'?'none':'power3.out',duration:.9,
        scrollTrigger:{trigger:el.current,start:'top 88%',end:trigger==='scrub'?'top 25%':undefined,
          scrub:trigger==='scrub'?0.65:false,toggleActions:trigger==='enter'?'play none none reverse':undefined}
      });
    }, el);
    return () => ctx.revert();
  }, [text,reduced,stagger,trigger]);
  const Tag=as;
  return <Tag ref={el as React.Ref<HTMLHeadingElement & HTMLParagraphElement>} className={className} aria-label={text}>
    <span className="cm-screen-reader">{text}</span>
    <span aria-hidden="true" className="cm-kinetic-visual">{text.split(/(\s+)/).map((part,i)=>part.trim()?<span className="cm-word-clip" key={i}><span data-kinetic-word className="cm-word">{part}</span></span>:<span key={i}>{part}</span>)}</span>
  </Tag>;
}
