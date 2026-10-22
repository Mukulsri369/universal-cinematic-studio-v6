import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useReducedMotion,useWideViewport} from './useMotionPreferences';
gsap.registerPlugin(ScrollTrigger);
export type StoryChapter={id:string;eyebrow?:string;title:string;body:string;image:string;alt:string};
export function StickyChapterStory({chapters}:{chapters:StoryChapter[]}){
 const root=useRef<HTMLElement>(null);const [active,setActive]=useState(0);const reduced=useReducedMotion();const wide=useWideViewport();
 useEffect(()=>{if(!root.current||!wide||reduced)return;const ctx=gsap.context(()=>{
  root.current!.querySelectorAll<HTMLElement>('[data-cm-chapter]').forEach((node,i)=>{
   ScrollTrigger.create({trigger:node,start:'top 56%',end:'bottom 44%',onEnter:()=>setActive(i),onEnterBack:()=>setActive(i)});
  });
 },root);return()=>ctx.revert();},[chapters,reduced,wide]);
 return <section className="cm-story" ref={root} aria-label="Scroll narrative">
  <div className="cm-story-visual" aria-hidden="true">{chapters.map((c,i)=><div key={c.id} className={`cm-story-image ${i===active?'is-active':''}`}>{c.image?<img src={c.image} alt="" loading={i===0?'eager':'lazy'}/>:<div className="cm-asset-unavailable">Photograph required</div>}</div>)}</div>
  <div className="cm-story-chapters">{chapters.map((c,i)=><article key={c.id} className="cm-story-chapter" data-cm-chapter onMouseEnter={()=>{if(!wide||reduced)setActive(i)}}>
   <span>{c.eyebrow||String(i+1).padStart(2,'0')}</span><h2>{c.title}</h2><p>{c.body}</p>
   <div className="cm-story-inline-image">{c.image?<img src={c.image} alt={c.alt} loading="lazy"/>:null}</div>
  </article>)}</div>
 </section>;
}
