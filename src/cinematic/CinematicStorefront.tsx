import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, AudioLines, ChevronRight, MoveUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { storefront } from './storefront.config';
import './cinematic.css';

const Stage = lazy(() => import('./CinematicStage').then(x => ({ default: x.CinematicStage })));
gsap.registerPlugin(ScrollTrigger);

function supportsWebGL() {
  if (typeof document === 'undefined') return false;
  try { const canvas = document.createElement('canvas'); return !!(canvas.getContext('webgl2') || canvas.getContext('webgl')); }
  catch { return false; }
}
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fn = () => setReduced(q.matches);
    q.addEventListener('change', fn); return () => q.removeEventListener('change', fn);
  }, []);
  return reduced;
}
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export default function CinematicStorefront() {
  const scrollProgress = useRef(0);
  const story = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [webglAvailable, setWebglAvailable] = useState(false);
  useEffect(() => setWebglAvailable(supportsWebGL()), []);
  useEffect(() => {
    if (!story.current || reducedMotion) return;
    const context = gsap.context(() => {
      ScrollTrigger.create({ trigger: story.current, start: 'top bottom', end: 'bottom top', scrub: true, onUpdate: s => { scrollProgress.current = s.progress; } });
      gsap.utils.toArray<HTMLElement>('[data-cine-fade]').forEach((el) => {
        gsap.fromTo(el, { y: 44, opacity: 0.2 }, { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 40%', scrub: true } });
      });
    }, story);
    return () => context.revert();
  }, [reducedMotion]);

  return <main className="cine" style={{ '--cine-accent': storefront.accent } as React.CSSProperties}>
    <a className="cine-skip" href="#features">Skip animated product showcase</a>
    <header className="cine-header">
      <a className="cine-wordmark" href="#home" aria-label={`${storefront.brand} home`}><AudioLines size={21} strokeWidth={1.5}/>{storefront.brand}<span>®</span></a>
      <nav aria-label="Main navigation"><a href="#craft">The craft</a><a href="#features">Details</a><a href="#experience">Experience</a></nav>
      <a className="cine-header-cta" href="#experience">Discover the product <MoveUpRight size={14}/></a>
    </header>
    <section className="cine-hero" id="home">
      <div className="cine-hero-backdrop" />
      <div className="cine-hero-copy">
        <motion.div initial={{ opacity:0,y:15 }} animate={{ opacity:1,y:0 }} transition={{duration:.8}} className="cine-eyebrow"><span className="cine-dot"/> {storefront.eyebrow}</motion.div>
        <motion.h1 initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{delay:.12,duration:1,ease:[.22,1,.36,1]}}>A new dimension <em>of desire.</em></motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.45,duration:1}}>A product is more than something you own. It is something you feel. Step into the details.</motion.p>
        <motion.a initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.6,duration:.8}} className="cine-primary" href="#craft">Begin the experience <ArrowRight size={17}/></motion.a>
      </div>
      <div className="cine-hero-side-label">AN INTERACTIVE DESIGN EXPERIENCE — 2026</div>
      <a href="#craft" className="cine-scroll-cue">SCROLL TO EXPLORE <ArrowDown size={17}/></a>
      <div className="cine-hero-orbit cine-hero-orbit-one" aria-hidden="true"/><div className="cine-hero-orbit cine-hero-orbit-two" aria-hidden="true"/>
    </section>

    <section ref={story} id="craft" className="cine-story" aria-label="Explore our interactive product">
      <div className="cine-stage-sticky">
        <div className="cine-stage-visual" aria-hidden="true">
          {webglAvailable ? <Suspense fallback={<div className="cine-fallback"><div className="cine-fallback-halo" /></div>}><Stage progressRef={scrollProgress} modelPath={storefront.productModelPath} reducedMotion={reducedMotion}/></Suspense> : <div className="cine-fallback"><div className="cine-fallback-halo"/><span>3D preview requires a WebGL-capable browser</span></div>}
        </div>
        <div className="cine-stage-topline"><span>THE OBJECT OF ATTENTION</span><span>PRODUCT STUDY / 001</span></div>
        <div className="cine-stage-caption">INTERACTIVE RENDER • DRAG TO ROTATE</div>
      </div>
      <div className="cine-story-content">
        <div className="cine-story-panel cine-story-panel-intro" data-cine-fade><span className="cine-small-label">01 / FORM MEETS FEELING</span><h2>{storefront.product}</h2><p>{storefront.description}</p></div>
        <div className="cine-story-panel cine-story-panel-middle" data-cine-fade><span className="cine-small-label">02 / A DIFFERENT PERSPECTIVE</span><h2>Perfection in <em>the details.</em></h2><p>Move through the story and watch the product respond. Scroll-controlled camera direction makes the design part of the narrative.</p></div>
        <div className="cine-story-panel cine-story-panel-last" data-cine-fade><span className="cine-small-label">03 / LIGHT, MATERIAL, MOTION</span><h2>Every angle. <em>Intentional.</em></h2><p>Studio-inspired reflections and carefully measured movement add depth without compromising usability.</p></div>
      </div>
    </section>

    <section id="features" className="cine-features">
      <Reveal><p className="cine-section-kicker">BEYOND THE SURFACE</p><h2>Engineered to <em>make an impression.</em></h2></Reveal>
      <div className="cine-feature-grid">{storefront.features.map((item,i)=><Reveal key={item.number} delay={i*.1} className="cine-feature"><div className="cine-feature-top"><span>{item.number}</span><Sparkles size={17}/></div><h3>{item.title}</h3><p>{item.body}</p><ChevronRight size={18} className="cine-feature-arrow"/></Reveal>)}</div>
    </section>
    <section className="cine-quote"><Reveal><span>NOT SIMPLY SEEN</span><blockquote>“The extraordinary lives in the smallest details.”</blockquote><div className="cine-quote-rule" /></Reveal></section>
    <section id="experience" className="cine-buy"><div className="cine-buy-glow"/><div className="cine-buy-content"><Reveal><div className="cine-buy-edition"><ShieldCheck size={16}/>{storefront.edition}</div><h2>Bring the experience <em>home.</em></h2><p>{storefront.priceLabel}</p>{storefront.checkoutUrl ? <a className="cine-primary" href={storefront.checkoutUrl} rel="noopener noreferrer">Explore purchase options <ArrowRight size={17}/></a> : <div className="cine-buy-disabled">Demo storefront · Configure checkoutUrl to enable sales</div>}</Reveal></div></section>
    <footer className="cine-footer"><span>{storefront.brand} © 2026</span><span>Cinematic product experiences, intentionally built.</span><a href="?view=toolkit">Developer component catalog →</a></footer>
  </main>;
}
