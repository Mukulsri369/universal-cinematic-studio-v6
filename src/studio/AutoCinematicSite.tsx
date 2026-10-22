import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Box,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Eye,
  Layers,
  MoveUpRight,
  Plus,
  RotateCcw,
  ShoppingBag,
  Sliders,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import raw from './generated.site.json';
import allExperiencePresets from '../../experience-presets.json';
import allSiteTemplates from '../../site-templates.json';
import type { CameraStyle, EffectStyle, ExperiencePreset, LightingMood, ProductHotspot } from './experience';
import { ExperienceModules, type SiteModule } from './modules/ExperienceModules';
import {
  AnimatedCounter,
  MagneticButton,
  Marquee,
  ParallaxSection,
  Reveal,
  ScrollProgress,
  SmoothScroll,
  SpotlightCard,
  WordReveal,
} from '@/components/creative';
import { FaqSection } from '@/components/sections/FaqSection';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import './studio.css';
import './premium.css';
import { PhotographicMedia, isPhotographicPath } from './media/PhotographicMedia';
import './media/photographic-media.css';

gsap.registerPlugin(ScrollTrigger);
const ModelViewport = lazy(() => import('./ModelViewport'));

type Product = {
  id: string;
  name: string;
  category?: string;
  description?: string;
  modelPath?: string | null;
  imagePath?: string | null;
  price?: number | null;
  currency?: string;
  purchaseUrl?: string | null;
  concept?: string;
  specs?: Record<string, string>;
  hotspots?: ProductHotspot[];
};

type Config = {
  schemaVersion: number;
  template: string;
  brand: string;
  category: string;
  eyebrow: string;
  headline: string;
  emphasis: string;
  summary: string;
  accent: string;
  secondary: string;
  background: string;
  foreground: string;
  concept: string;
  heroImagePath?: string | null;
  assetMode?: 'fictional-demo'|'commercial-verified';
  materialImages?: {id:string;src:string;alt:string}[];
  layout: string;
  chapters: string[];
  products: Product[];
  recipe?: string[];
  supportEmail?: string | null;
};

const site = raw as unknown as Config;
const presetsMap = allExperiencePresets as Record<string, ExperiencePreset>;
const defaultExperience = presetsMap[site.template] || {
  mood: 'fashion',
  camera: 'runway',
  motion: 'editorial',
  effects: 'soft',
  productInteraction: 'orbit',
};

type CategoryRealmKey = 'all' | 'footwear' | 'clothing' | 'watches' | 'accessories';

const categoryRealms: Record<
  CategoryRealmKey,
  {
    id: CategoryRealmKey;
    label: string;
    templateRef: string;
    kicker: string;
    title: string;
    subtitle: string;
    accent: string;
    secondary: string;
    background: string;
    foreground: string;
    concept: string;
    experience: ExperiencePreset;
    finishes: { id: string; name: string; hex: string }[];
  }
> = {
  all: {
    id: 'all',
    label: 'All Creations',
    templateRef: 'fashion-runway',
    kicker: 'THE COMPLETE ARCHIVE · 04 ATELIERS',
    title: 'Sculpted across four disciplines.',
    subtitle: 'Footwear, couture drapery, precision horology, and architectural accessories unified in a single spatial curation.',
    accent: site.accent || '#e8c7b8',
    secondary: site.secondary || '#8c5854',
    background: site.background || '#120e10',
    foreground: site.foreground || '#faf2ef',
    concept: 'sneaker',
    experience: presetsMap['fashion-runway'] || defaultExperience,
    finishes: [
      { id: 'champagne', name: 'Rose Champagne', hex: '#e8c7b8' },
      { id: 'emerald', name: 'Kinetic Mint', hex: '#c8f3e0' },
      { id: 'gold', name: 'Horology Gold', hex: '#e4bb83' },
      { id: 'titanium', name: 'Warm Titanium', hex: '#f6ddba' },
    ],
  },
  footwear: {
    id: 'footwear',
    label: 'Footwear Lab',
    templateRef: 'footwear-lab',
    kicker: 'DISCIPLINE 01 · KINETIC FOOTWEAR',
    title: 'Rotating showcase with directional rim lighting.',
    subtitle: 'Engineered elastomer geometry and hand-lasted calfskin staged under high-contrast directional runway lighting.',
    accent: '#c8f3e0',
    secondary: '#365b57',
    background: '#091b1a',
    foreground: '#f0fff7',
    concept: 'sneaker',
    experience: presetsMap['footwear-lab'] || { mood: 'fashion', camera: 'runway', motion: 'editorial', effects: 'soft', productInteraction: 'orbit' },
    finishes: [
      { id: 'mint', name: 'Glacier Mint', hex: '#c8f3e0' },
      { id: 'obsidian', name: 'Carbon Silver', hex: '#b8c7c4' },
      { id: 'copper', name: 'Thermal Copper', hex: '#df9a78' },
    ],
  },
  clothing: {
    id: 'clothing',
    label: 'Designer Clothing',
    templateRef: 'fashion-runway',
    kicker: 'DISCIPLINE 02 · COUTURE DRAPERY',
    title: 'Editorial presentation with fluid fabric motion.',
    subtitle: 'Double-faced 620gsm cashmere and bias-cut silk translated into continuous sculptural ribbon geometry.',
    accent: '#f0c8bb',
    secondary: '#b16866',
    background: '#181215',
    foreground: '#faefed',
    concept: 'fabric',
    experience: presetsMap['fashion-runway'] || { mood: 'fashion', camera: 'runway', motion: 'editorial', effects: 'soft', productInteraction: 'orbit' },
    finishes: [
      { id: 'blush', name: 'Cashmere Rose', hex: '#f0c8bb' },
      { id: 'ivory', name: 'Raw Silk Ivory', hex: '#f7eee4' },
      { id: 'garnet', name: 'Nocturne Bordeaux', hex: '#c97a78' },
    ],
  },
  watches: {
    id: 'watches',
    label: 'Haute Horlogerie',
    templateRef: 'luxury-product',
    kicker: 'DISCIPLINE 03 · PRECISION HOROLOGY',
    title: 'Macro close-up calibration with metallic specular rig.',
    subtitle: 'Satinated rose-gold alloys, diamond-cut hands, and exposed mechanical architecture under macro studio lighting.',
    accent: '#e4bb83',
    secondary: '#6f4535',
    background: '#0c0b0c',
    foreground: '#f6efe4',
    concept: 'watch',
    experience: { mood: 'jewelry', camera: 'macro', motion: 'precision', effects: 'soft', productInteraction: 'orbit' },
    finishes: [
      { id: 'rosegold', name: '18k Rose Gold', hex: '#e4bb83' },
      { id: 'platinum', name: 'Brushed Platinum', hex: '#d8e0e8' },
      { id: 'bronze', name: 'Aged Bronze', hex: '#c49363' },
    ],
  },
  accessories: {
    id: 'accessories',
    label: 'Luxury Accessories',
    templateRef: 'eyewear-atelier',
    kicker: 'DISCIPLINE 04 · OPTICAL & JEWELLERY ATELIER',
    title: 'Gallery studio composition and interactive inspection.',
    subtitle: 'Beta-titanium eyewear frames, interlocking vermeil rings, and structured weekender packs in a warm gallery stage.',
    accent: '#f6ddba',
    secondary: '#a48365',
    background: '#151613',
    foreground: '#fff9eb',
    concept: 'eyewear',
    experience: presetsMap['eyewear-atelier'] || { mood: 'gallery', camera: 'reveal', motion: 'precision', effects: 'soft', productInteraction: 'orbit' },
    finishes: [
      { id: 'titanium', name: 'Champagne Titanium', hex: '#f6ddba' },
      { id: 'vermeil', name: 'Antwerp Vermeil', hex: '#edd6ad' },
      { id: 'sage', name: 'Florentine Olive', hex: '#d4e6aa' },
    ],
  },
};

const categoryOrder: CategoryRealmKey[] = ['all', 'footwear', 'clothing', 'watches', 'accessories'];

const atelierFaqs = [
  {
    question: 'How are the 3D product models rendered in this storefront?',
    answer:
      'Each piece is rendered in real time using React Three Fiber, Three.js PBR materials, and mood-calibrated studio lightformers. When a licensed GLB file is supplied in public/models/, the viewer automatically normalizes and mounts the exact product mesh; otherwise it displays an explicitly labeled conceptual 3D silhouette.',
  },
  {
    question: 'Does each fashion category use a distinct lighting and camera setup?',
    answer:
      'Yes. Footwear uses directional runway lighting and sweeping camera paths; Designer Clothing uses soft editorial fill; Watches use high-contrast metallic jewellery lighting with macro camera proximity; Accessories use warm gallery lightformers.',
  },
  {
    question: 'How does the experience adapt for mobile devices and reduced motion?',
    answer:
      'Below-the-fold 3D viewports pause rendering when offscreen or when the browser tab is hidden, adapt pixel ratio dynamically via PerformanceMonitor, and switch to static demand rendering when prefers-reduced-motion is enabled.',
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(m.matches);
    update();
    m.addEventListener('change', update);
    return () => m.removeEventListener('change', update);
  }, []);
  return reduced;
}

function cost(p: Product) {
  if (typeof p.price !== 'number') return 'Price on request';
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: p.currency || 'INR', maximumFractionDigits: 0 }).format(p.price);
  } catch {
    return `${p.price}`;
  }
}

function AnimIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.85, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type BagItem = { product: Product; finish: string; size: string; qty: number };

function ProductDialog({
  item,
  close,
  next,
  prev,
  reduced,
  onAddToBag,
}: {
  item: Product;
  close: () => void;
  next: () => void;
  prev: () => void;
  reduced: boolean;
  onAddToBag: (product: Product, finish: string, size: string) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const catKey = (item.category as CategoryRealmKey) in categoryRealms ? (item.category as CategoryRealmKey) : 'all';
  const realm = categoryRealms[catKey];

  const [activeFinish, setActiveFinish] = useState(realm.finishes[0]);
  const [activeMood, setActiveMood] = useState<LightingMood>(realm.experience.mood);
  const [activeCamera, setActiveCamera] = useState<CameraStyle>(realm.experience.camera);
  const [showHotspots, setShowHotspots] = useState(true);
  const [hudCollapsed, setHudCollapsed] = useState(false);

  useEffect(() => {
    const nextRealm = categoryRealms[(item.category as CategoryRealmKey) in categoryRealms ? (item.category as CategoryRealmKey) : 'all'];
    setActiveFinish(nextRealm.finishes[0]);
    setActiveMood(nextRealm.experience.mood);
    setActiveCamera(nextRealm.experience.camera);
  }, [item]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key.toLowerCase() === 'h') setHudCollapsed((v) => !v);
      if (e.key === 'Tab' && dialogRef.current) {
        const items = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])')
        );
        if (!items.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', key);
    closeRef.current?.focus();
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', key);
      document.body.style.overflow = old;
      previouslyFocused?.focus();
    };
  }, [close, next, prev]);

  const customExperience: ExperiencePreset = {
    ...realm.experience,
    mood: activeMood,
    camera: activeCamera,
  };

  return (
    <div
      className="cs-dialog-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-label={`3D preview of ${item.name}`} className="cs-dialog">
        <div className="cs-dialog-head">
          <div>
            <span className="cs-eyebrow">
              {realm.label.toUpperCase()} · {item.modelPath ? '3D VIEWER' : 'EDITORIAL PHOTO VIEWER'}
            </span>
            <h3>{item.name}</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onAddToBag(item, activeFinish.name, item.category === 'footwear' ? 'EU 42' : item.category === 'clothing' ? 'M / 48' : 'One Size')}
              className="cs-primary"
              style={{ minHeight: '42px', padding: '10px 20px' }}
            >
              Add to Atelier Bag · {cost(item)} <ShoppingBag size={15} />
            </button>
            <button ref={closeRef} aria-label="Close 3D preview" onClick={close} className="cs-circle">
              <X size={21} />
            </button>
          </div>
        </div>

        <div className="cs-dialog-view">
          <Suspense fallback={<div className="cs-model-fallback" />}>
            {item.modelPath ? (
              <ModelViewport modelPath={item.modelPath}
                concept={item.concept || site.concept} accent={activeFinish.hex}
                interactive reducedMotion={reduced} stage="detail" label={item.name}
                experience={customExperience} hotspots={showHotspots ? item.hotspots || [] : []}/>
            ) : (
              <PhotographicMedia src={item.imagePath} alt={`${item.name} studio product photograph`} kind="viewer" />
            )}
          </Suspense>

          {/* 3D controls only appear for actual models, not static photography. */}
          {item.modelPath && (
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(920px, 94%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => setHudCollapsed((v) => !v)}
              style={{
                background: '#141115',
                color: '#faf2ef',
                border: '1px solid rgba(255,255,255,0.2)',
                borderBottom: hudCollapsed ? '1px solid rgba(255,255,255,0.2)' : 'none',
                padding: '6px 14px',
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {hudCollapsed ? '▴ Show Studio Controls (H)' : '▾ Hide Controls · Zen Mode (H)'}
            </button>
            {!hudCollapsed && (
              <div
                style={{
                  width: '100%',
                  background: '#120f12f2',
                  border: '1px solid rgba(255,255,255,0.22)',
                  padding: '14px 20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  fontSize: '11px',
                }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span style={{ opacity: 0.6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Material Finish:</span>
                  {realm.finishes.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveFinish(f)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 10px',
                        border: activeFinish.id === f.id ? `1px solid ${f.hex}` : '1px solid rgba(255,255,255,0.15)',
                        background: activeFinish.id === f.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: f.hex, display: 'inline-block' }} />
                      {f.name}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span style={{ opacity: 0.6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Studio Rig:</span>
                  {(['fashion', 'jewelry', 'warm-gallery', 'architectural'] as LightingMood[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setActiveMood(m)}
                      style={{
                        padding: '5px 10px',
                        border: activeMood === m ? '1px solid var(--cs-accent)' : '1px solid rgba(255,255,255,0.15)',
                        background: activeMood === m ? 'rgba(255,255,255,0.1)' : 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowHotspots((v) => !v)}
                    style={{
                      padding: '5px 10px',
                      border: showHotspots ? '1px solid var(--cs-accent)' : '1px solid rgba(255,255,255,0.15)',
                      background: showHotspots ? 'rgba(255,255,255,0.1)' : 'transparent',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    {showHotspots ? 'Hotspots: ON' : 'Hotspots: OFF'}
                  </button>
                </div>
              </div>
            )}
          </div>
          )}
        </div>

        <div className="cs-dialog-foot">
          <p>
            {item.modelPath ? 'Drag to orbit 360° · scroll to zoom.' : 'Photographic detail view.'} Arrow keys switch pieces.{' '}
            {item.modelPath
              ? '3D file supplied by store owner.'
              : 'Photography-only view. A verified model is required before enabling 360° rotation.'}
          </p>
          <div className="cs-dialog-arrows">
            <button className="cs-circle" aria-label="Previous product" onClick={prev}>
              <ChevronLeft />
            </button>
            <button className="cs-circle" aria-label="Next product" onClick={next}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AutoCinematicSite() {
  const reduced = useReducedMotion();
  const storyRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryRealmKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFinishIndex, setActiveFinishIndex] = useState(0);
  const [customLightingMood, setCustomLightingMood] = useState<LightingMood | null>(null);
  const [customCameraStyle, setCustomCameraStyle] = useState<CameraStyle | null>(null);
  const [stageHudCollapsed, setStageHudCollapsed] = useState(false);
  const [customModuleOverride, setCustomModuleOverride] = useState<SiteModule | null>(null);

  // Shopping / Curation Bag Drawer State
  const [bagOpen, setBagOpen] = useState(false);
  const [bagItems, setBagItems] = useState<BagItem[]>([
    { product: site.products[0], finish: 'Glacier Mint', size: 'EU 42', qty: 1 },
  ]);
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const activeRealm = categoryRealms[activeCategory];
  const currentFinish = activeRealm.finishes[activeFinishIndex % activeRealm.finishes.length] || activeRealm.finishes[0];

  const filteredProducts = useMemo(() => {
    return site.products.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        `${p.name} ${p.category || ''} ${p.description || ''} ${p.concept || ''}`.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const featuredStageProduct = useMemo(() => {
    if (activeCategory === 'all') return site.products[0];
    return site.products.find((p) => p.category === activeCategory) || site.products[0];
  }, [activeCategory]);

  const stageExperience: ExperiencePreset = useMemo(
    () => ({
      ...activeRealm.experience,
      mood: customLightingMood || activeRealm.experience.mood,
      camera: customCameraStyle || activeRealm.experience.camera,
    }),
    [activeRealm, customLightingMood, customCameraStyle]
  );

  const showDialog = selected !== null && site.products[selected];

  useEffect(() => {
    if (reduced || !storyRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-story-chapter]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 55, opacity: 0.3 },
          { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 42%', scrub: 0.65 } }
        );
      });
    }, storyRef);
    return () => ctx.revert();
  }, [reduced]);

  const handleNext = () => setSelected((n) => (n === null ? 0 : (n + 1) % site.products.length));
  const handlePrev = () => setSelected((n) => (n === null ? 0 : (n - 1 + site.products.length) % site.products.length));

  const handleCategoryChange = (cat: CategoryRealmKey) => {
    setActiveCategory(cat);
    setActiveFinishIndex(0);
    setCustomLightingMood(null);
    setCustomCameraStyle(null);
  };

  const addToBag = (product: Product, finish = currentFinish.name, size = 'Standard') => {
    setReservationSubmitted(false);
    setBagItems((prev) => {
      const idx = prev.findIndex((x) => x.product.id === product.id && x.finish === finish && x.size === size);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { product, finish, size, qty: 1 }];
    });
    setBagOpen(true);
  };

  const removeFromBag = (index: number) => {
    setBagItems((prev) => prev.filter((_, i) => i !== index));
  };

  const bagTotal = useMemo(() => {
    return bagItems.reduce((sum, item) => sum + (item.product.price || 0) * item.qty, 0);
  }, [bagItems]);

  const isDemo = site.brand.includes('DEMO');

  return (
    <SmoothScroll>
      <ScrollProgress />
      <main
        className={`cs-site cs-layout-${site.layout} cs-template-${site.template}`}
        style={
          {
            '--cs-bg': activeRealm.background,
            '--cs-text': activeRealm.foreground,
            '--cs-accent': currentFinish.hex,
            '--cs-secondary': activeRealm.secondary,
            transition: reduced ? 'none' : 'background-color 0.6s ease, color 0.6s ease',
          } as React.CSSProperties
        }
      >
        <a href="#cs-collection" className="cs-skip">
          Skip animation, go to products
        </a>

        {/* Strict 3-Zone Top Bar Contract */}
        <header className="cs-header" id="cs-top">
          <a href="#cs-top" className="cs-brand">
            {site.brand}
          </a>
          <span className="cs-asset-status">{site.assetMode==='commercial-verified'?'MERCHANT PHOTOGRAPHY':'FICTIONAL AI-ASSISTED DEMO'}</span>
          <nav aria-label="Main navigation">
            <a href="#cs-realms">Ateliers</a>
            <a href="#cs-story">Craft</a>
            <a href="#cs-collection">Collection</a>
            <a href="#cs-atelier-faq">Client Services</a>
          </nav>
          <button
            type="button"
            onClick={() => setBagOpen(true)}
            className="cs-header-link"
            style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #ffffff6b', cursor: 'pointer', color: 'inherit' }}
            aria-label={`Open Atelier Bag with ${bagItems.reduce((a, b) => a + b.qty, 0)} items`}
          >
            Atelier Bag ({bagItems.reduce((a, b) => a + b.qty, 0)}) <ShoppingBag size={15} />
          </button>
        </header>

        {/* 1. Cinematic Opening with Immersive 3D Visuals & Refined Typography */}
        <section className="cs-hero" aria-label={site.headline + ' ' + site.emphasis}>
          <div className="cs-hero-noise" aria-hidden="true" />
          <div className="cs-orbit-outline" aria-hidden="true" />
          <div className="cs-hero-content">
            <AnimIn>
              <div className="cs-eyebrow">
                {activeRealm.kicker}
              </div>
            </AnimIn>
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {site.headline}
              <br />
              <em>{site.emphasis}</em>
            </motion.h1>
            <AnimIn delay={0.18}>
              <p className="cs-hero-summary">{activeRealm.subtitle}</p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#cs-realms" className="cs-primary">
                  {site.products.some(p=>p.modelPath) ? 'Enter 3D Atelier' : 'Discover the Atelier'} <ArrowRight size={17} />
                </a>
                <a
                  href="#cs-collection"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 22px',
                    border: '1px solid rgba(255,255,255,0.24)',
                    borderRadius: '100px',
                    fontSize: '12px',
                    letterSpacing: '0.06em',
                  }}
                >
                  Explore 6 Pieces <ArrowUpRight size={15} />
                </a>
              </div>
            </AnimIn>

            {/* Quick Discipline Switcher Pills inside Hero */}
            <AnimIn delay={0.28}>
              <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Switch active fashion discipline">
                {categoryOrder.map((catKey) => {
                  const r = categoryRealms[catKey];
                  const active = activeCategory === catKey;
                  return (
                    <button
                      key={catKey}
                      type="button"
                      onClick={() => handleCategoryChange(catKey)}
                      style={{
                        padding: '8px 16px',
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        border: active ? `1px solid ${r.accent}` : '1px solid rgba(255,255,255,0.16)',
                        background: active ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.28)',
                        color: active ? r.accent : 'inherit',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </AnimIn>
          </div>

          {/* Editorial hero prioritizes genuine imagery; WebGL is used only with a real 3D asset. */}
          {featuredStageProduct?.modelPath ? (
            <div className="cs-hero-model" aria-hidden="true">
              <Suspense fallback={<div className="cs-model-fallback" />}>
                <ModelViewport modelPath={featuredStageProduct.modelPath}
                  concept={featuredStageProduct.concept || activeRealm.concept}
                  accent={currentFinish.hex} reducedMotion={reduced}
                  label={featuredStageProduct.name} experience={stageExperience} />
              </Suspense>
            </div>
          ) : (
            <div className="cs-hero-photo" aria-hidden="true">
              <PhotographicMedia src={isPhotographicPath(site.heroImagePath) ? site.heroImagePath : featuredStageProduct?.imagePath}
                alt={`${site.brand} premium editorial campaign`} kind="hero" eager />
            </div>
          )}
          <div className="cs-vertical-label">{site.category.toUpperCase()} / FOUR-DISCIPLINE SPATIAL STOREFRONT</div>
          <a href="#cs-realms" className="cs-scroll">
            SCROLL TO DISCOVER <ArrowDown size={17} />
          </a>
        </section>

        {/* Subtle Editorial Marquee from Toolkit Creative Components */}
        <Marquee
          duration={34}
          className="border-y border-white/15 py-4 text-[11px] uppercase tracking-[0.28em] opacity-75"
          items={[
            '01 · FOOTWEAR LAB — DIRECTIONAL RUNWAY LIGHTING',
            '02 · DESIGNER CLOTHING — SCULPTURAL DRAPE MOTION',
            '03 · HAUTE HORLOGERIE — MACRO METALLIC CALIBRATION',
            '04 · LUXURY ACCESSORIES — TITANIUM & VERMEIL STUDIO',
          ]}
        />

        {/* 2. Product-Specific 3D Experience Stage (Footwear, Clothing, Watches, Accessories) */}
        <section
          id="cs-realms"
          aria-label="Interactive Category 3D Stage"
          style={{
            padding: 'clamp(80px, 10vw, 140px) clamp(22px, 7vw, 120px)',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <div className="mx-auto max-w-[1600px]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
                <div>
                  <span className="cs-eyebrow">{activeRealm.kicker}</span>
                  <h2 style={{ fontSize: 'clamp(38px, 5vw, 76px)', fontWeight: 480, letterSpacing: '-0.06em', lineHeight: 1.04, margin: '14px 0 0' }}>
                    <WordReveal text={activeRealm.title} />
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product-specific 3D experience tabs">
                  {(['footwear', 'clothing', 'watches', 'accessories'] as CategoryRealmKey[]).map((key) => {
                    const tabRealm = categoryRealms[key];
                    const isSelected = activeCategory === key;
                    return (
                      <button
                        key={key}
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => handleCategoryChange(key)}
                        style={{
                          padding: '11px 20px',
                          fontSize: '11px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          border: isSelected ? `1px solid ${tabRealm.accent}` : '1px solid rgba(255,255,255,0.18)',
                          background: isSelected ? tabRealm.accent : 'transparent',
                          color: isSelected ? tabRealm.background : 'inherit',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {tabRealm.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-8 lg:grid-cols-[1fr_1.45fr] items-stretch">
              {/* Left Column: Editorial Story + Bespoke Specs */}
              <SpotlightCard className="flex flex-col justify-between p-8 sm:p-10 rounded-none border-white/15 bg-white/[0.02]">
                <div>
                  <div className="flex items-center justify-between text-xs opacity-65 tracking-widest uppercase">
                    <span>{featuredStageProduct.id}</span>
                    <span>·</span>
                    <span>Template: {activeRealm.templateRef}</span>
                  </div>
                  <h3 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 480, letterSpacing: '-0.04em', margin: '18px 0 12px' }}>
                    {featuredStageProduct.name}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.85, opacity: 0.75, marginBottom: '28px' }}>{featuredStageProduct.description}</p>

                  {featuredStageProduct.specs && (
                    <div className="space-y-3 border-t border-white/15 pt-5">
                      {Object.entries(featuredStageProduct.specs).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                          <span className="opacity-60 uppercase tracking-wider">{k}</span>
                          <strong className="font-medium">{v}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest opacity-55">Atelier Valuation</div>
                    <div className="text-xl font-semibold tabular-nums" style={{ color: currentFinish.hex }}>
                      {cost(featuredStageProduct)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const idx = site.products.findIndex((p) => p.id === featuredStageProduct.id);
                        setSelected(idx >= 0 ? idx : 0);
                      }}
                      style={{
                        padding: '12px 18px',
                        border: '1px solid rgba(255,255,255,0.28)',
                        background: 'transparent',
                        color: 'inherit',
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      Full-Screen 3D <Eye size={14} className="inline ml-1" />
                    </button>
                    <button
                      type="button"
                      onClick={() => addToBag(featuredStageProduct, currentFinish.name)}
                      className="cs-primary"
                      style={{ minHeight: '44px', padding: '10px 22px', gap: '12px' }}
                    >
                      Reserve Piece <ShoppingBag size={15} />
                    </button>
                  </div>
                </div>
              </SpotlightCard>

              {/* Right Column: Interactive 3D Stage with Collapsible Bottom Dock */}
              <div
                style={{
                  position: 'relative',
                  minHeight: '540px',
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: `radial-gradient(ellipse at 55% 45%, color-mix(in srgb, ${currentFinish.hex} 18%, transparent), transparent 65%), ${activeRealm.background}`,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: '22px',
                    right: '22px',
                    zIndex: 5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    opacity: 0.72,
                    pointerEvents: 'none',
                  }}
                >
                  <span>
                    {featuredStageProduct.modelPath ? `3D MODEL: ${featuredStageProduct.name}` : `EDITORIAL PHOTO: ${featuredStageProduct.name}`}
                  </span>
                  <span>{featuredStageProduct.modelPath ? 'DRAG TO ROTATE · SCROLL TO ZOOM' : 'PHOTO VIEW · 3D MODEL NOT PROVIDED'}</span>
                </div>

                <Suspense fallback={<div className="cs-model-fallback" />}>
                  {featuredStageProduct.modelPath ? (
                    <ModelViewport modelPath={featuredStageProduct.modelPath}
                      concept={featuredStageProduct.concept || activeRealm.concept}
                      accent={currentFinish.hex} interactive reducedMotion={reduced}
                      stage="detail" label={featuredStageProduct.name}
                      experience={stageExperience} hotspots={featuredStageProduct.hotspots || []} />
                  ) : (
                    <PhotographicMedia src={featuredStageProduct.imagePath}
                      alt={`${featuredStageProduct.name} product photograph`} kind="viewer" />
                  )}
                </Suspense>

                {/* Controls are actionable only when an actual 3D model is provided. */}
                {featuredStageProduct.modelPath && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'min(760px, 94%)',
                    zIndex: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setStageHudCollapsed((v) => !v)}
                    style={{
                      background: '#110e10',
                      color: '#faf2ef',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderBottom: stageHudCollapsed ? '1px solid rgba(255,255,255,0.2)' : 'none',
                      padding: '4px 12px',
                      fontSize: '9px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    {stageHudCollapsed ? '▴ Expand Studio Controls' : '▾ Collapse Studio Dock'}
                  </button>
                  {!stageHudCollapsed && (
                    <div
                      style={{
                        width: '100%',
                        background: '#110e10ee',
                        border: '1px solid rgba(255,255,255,0.2)',
                        padding: '10px 14px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        fontSize: '10px',
                      }}
                    >
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="opacity-60 uppercase tracking-wider mr-1">Finish:</span>
                        {activeRealm.finishes.map((f, idx) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setActiveFinishIndex(idx)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '4px 9px',
                              border: currentFinish.id === f.id ? `1px solid ${f.hex}` : '1px solid rgba(255,255,255,0.14)',
                              background: currentFinish.id === f.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                              color: 'inherit',
                              cursor: 'pointer',
                            }}
                          >
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: f.hex }} />
                            {f.name}
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="opacity-60 uppercase tracking-wider mr-1">Lighting:</span>
                        {(['fashion', 'jewelry', 'warm-gallery', 'automotive'] as LightingMood[]).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setCustomLightingMood(m)}
                            style={{
                              padding: '4px 8px',
                              border: stageExperience.mood === m ? `1px solid ${currentFinish.hex}` : '1px solid rgba(255,255,255,0.14)',
                              background: stageExperience.mood === m ? 'rgba(255,255,255,0.1)' : 'transparent',
                              color: 'inherit',
                              cursor: 'pointer',
                              textTransform: 'capitalize',
                            }}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. GSAP ScrollTrigger 3-Act Editorial Narrative */}
        <section ref={storyRef} id="cs-story" className="cs-story" aria-label="Brand story">
          <div className="cs-story-intro">
            <AnimIn>
              <div className="cs-eyebrow">A STORY IN THREE ACTS</div>
              <h2>
                Beyond what <em>you expect.</em>
              </h2>
            </AnimIn>
          </div>
          <div className="cs-story-chapters">
            {site.chapters.map((title, i) => (
              <div key={title} className="cs-story-chapter" data-story-chapter>
                <div className="cs-story-count">
                  0{i + 1} <span>/ 0{site.chapters.length}</span>
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>
                    {i === 0
                      ? site.summary
                      : i === 1
                      ? 'Every movement is intentional. From bias-cut cashmere folds to directional runway shadow falloff, each surface responds to light and touch.'
                      : 'Precision horology and architectural titanium eyewear calibrated for both desktop studio inspection and responsive mobile browsing.'}
                  </p>
                </div>
                <div className="cs-story-line" />
              </div>
            ))}
          </div>
        </section>

        {/* 4. Pre-Collection Composable ExperienceModules (Filmstrip & ProductRail) */}
        <ExperienceModules slot="pre-collection"
          modules={site.recipe}
          brand={site.brand}
          category={site.category}
          summary={site.summary}
          chapters={site.chapters}
          products={site.products}
          materialImages={site.materialImages}
          onOpen={setSelected}
          reducedMotion={reduced}
        />

        {/* 5. Interactive Collection Discovery & Filtering Interface */}
        <section id="cs-collection" className="cs-collection">
          <AnimIn className="cs-collection-head">
            <div>
              <div className="cs-eyebrow">THE COLLECTION / EDITORIAL PHOTOGRAPHY</div>
              <h2>
                Every angle, <em>a new story.</em>
              </h2>
            </div>
            <div className="space-y-4 w-full max-w-[440px]">
              <p style={{ margin: 0 }}>
                Explore the collection through photographs. Authentic 360° viewers appear only for products with seller-provided 3D models.
              </p>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search footwear, cashmere, tourbillon, eyewear..."
                aria-label="Search collection pieces"
                className="bg-black/30 border-white/20 text-white placeholder:text-white/45"
              />
            </div>
          </AnimIn>

          {/* Animated Category Filter Bar */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-y border-white/15 py-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter collection by category">
              {categoryOrder.map((catKey) => {
                const r = categoryRealms[catKey];
                const isSelected = activeCategory === catKey;
                const count = catKey === 'all' ? site.products.length : site.products.filter((p) => p.category === catKey).length;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => handleCategoryChange(catKey)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      border: isSelected ? `1px solid ${currentFinish.hex}` : '1px solid rgba(255,255,255,0.14)',
                      background: isSelected ? currentFinish.hex : 'transparent',
                      color: isSelected ? activeRealm.background : 'inherit',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                    }}
                  >
                    {r.label} ({count})
                  </button>
                );
              })}
            </div>
            <div className="text-xs opacity-65 tabular-nums">
              Showing {filteredProducts.length} of {site.products.length} archive pieces
            </div>
          </div>

          <div className="cs-products">
            {filteredProducts.map((product, i) => {
              const globalIndex = site.products.findIndex((p) => p.id === product.id);
              const idx = globalIndex >= 0 ? globalIndex : i;
              return (
                <AnimIn key={product.id} className="cs-product" delay={Math.min(i * 0.07, 0.3)}>
                  <button className="cs-product-visual" aria-label={`${product.modelPath ? "Inspect 3D model" : "View photo"} of ${product.name}`} onClick={() => setSelected(idx)}>
                    <PhotographicMedia src={product.imagePath} alt={`${product.name} product photography`} kind="product" />
                    <span className="cs-product-mode">
                      {product.category?.toUpperCase()} · {product.modelPath ? '3D ASSET' : 'PHOTO VIEW'}
                    </span>
                    <span className="cs-product-action">
                      {product.modelPath ? 'INSPECT IN 3D' : 'VIEW PRODUCT'} <MoveUpRight size={17} />
                    </span>
                  </button>
                  <div className="cs-product-meta">
                    <div>
                      <span className="cs-product-id">
                        0{idx + 1} / {product.id} · {product.category || site.category}
                      </span>
                      <h3>{product.name}</h3>
                      <p>{product.description || 'Explore the details in 3D.'}</p>
                    </div>
                    <div className="cs-product-price">
                      <div className="tabular-nums font-semibold">{cost(product)}</div>
                      <button
                        type="button"
                        onClick={() => addToBag(product)}
                        style={{
                          marginTop: '12px',
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.28)',
                          color: 'inherit',
                          padding: '6px 11px',
                          fontSize: '10px',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Plus size={12} /> Add to Bag
                      </button>
                      {product.purchaseUrl && (
                        <a
                          href={product.purchaseUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          aria-label={`View purchase options for ${product.name}`}
                        >
                          Purchase <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </AnimIn>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm opacity-70 mb-4">No archive pieces matched your filter criteria.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="cs-primary"
              >
                Reset Archive Filters <RotateCcw size={15} />
              </button>
            </div>
          )}

          {isDemo && (
            <div className="cs-demo-notice">
              FICTIONAL DEMO — Generated images represent imagined products, not real inventory. For commercial publication replace every product photo with an authentic merchant image and add licensed GLB models for true 3D viewers.
            </div>
          )}
        </section>

        {/* 6. Post-Collection Composable ExperienceModules (Compare & Spotlight) + Live Module Explorer */}
        <ExperienceModules slot="post-collection"
          modules={site.recipe}
          brand={site.brand}
          category={site.category}
          summary={site.summary}
          chapters={site.chapters}
          products={site.products}
          materialImages={site.materialImages}
          onOpen={setSelected}
          reducedMotion={reduced}
        />

        {/* Additional Composable Module Switcher (Editorial, Material, Manifesto, CategoryIndex, Process, Metrics) */}
        <section
          aria-label="Additional Atelier Story Modules"
          style={{
            padding: '60px clamp(22px, 8vw, 150px) 20px',
            borderTop: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="cs-eyebrow">EXTENDED EDITORIAL MODULES · COMPOSABLE ARCHITECTURE</span>
            <div className="flex flex-wrap gap-2">
              {(['material', 'category-index', 'manifesto', 'editorial', 'process', 'metrics'] as SiteModule[]).map((mod) => {
                const active = (customModuleOverride || 'material') === mod;
                return (
                  <button
                    key={mod}
                    type="button"
                    onClick={() => setCustomModuleOverride(mod)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      border: active ? `1px solid ${currentFinish.hex}` : '1px solid rgba(255,255,255,0.15)',
                      background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                      color: 'inherit',
                      cursor: 'pointer',
                    }}
                  >
                    {mod}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <ExperienceModules
          slot="pre-collection"
          modules={[customModuleOverride || 'material']}
          brand={site.brand}
          category={site.category}
          summary={site.summary}
          chapters={site.chapters}
          products={site.products}
          materialImages={site.materialImages}
          onOpen={setSelected}
          reducedMotion={reduced}
        />

        {/* 7. Parallax Editorial Statement & Craftsmanship Proof */}
        <ParallaxSection distance={35}>
          <section className="cs-statement" aria-label="Design philosophy">
            <AnimIn>
              <span className="cs-eyebrow">DIGITAL CRAFT / IN MOTION</span>
              <blockquote>
                Not more effects.
                <br />
                <em>More feeling.</em>
              </blockquote>
              <div className="cs-statement-rule" />
              <div className="mt-14 grid max-w-3xl mx-auto grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl sm:text-4xl font-light tabular-nums" style={{ color: currentFinish.hex }}>
                    <AnimatedCounter value={4} suffix=" Ateliers" />
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest opacity-60">Footwear · Couture · Horology · Optical</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-light tabular-nums" style={{ color: currentFinish.hex }}>
                    <AnimatedCounter value={6} suffix=" Creations" />
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest opacity-60">Interactive 3D Silhouettes & Hotspots</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-light tabular-nums" style={{ color: currentFinish.hex }}>
                    <AnimatedCounter value={360} suffix="°" />
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest opacity-60">PBR Studio Lightformer Inspection</div>
                </div>
              </div>
            </AnimIn>
          </section>
        </ParallaxSection>

        {/* 8. Client Services & Technical Provenance FAQ (Reusing FaqSection) */}
        <section
          id="cs-atelier-faq"
          aria-label="Client Services and Provenance"
          style={{ padding: '100px clamp(22px, 8vw, 150px)', borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <div className="mx-auto max-w-4xl">
            <AnimIn>
              <span className="cs-eyebrow">CLIENT SERVICES & 3D PROVENANCE</span>
              <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 480, letterSpacing: '-0.05em', margin: '16px 0 36px' }}>
                Transparency in <em>every dimension.</em>
              </h2>
              <FaqSection items={atelierFaqs} />
            </AnimIn>
          </div>
        </section>

        {/* 9. Finale Section */}
        <section className="cs-finale" id="cs-finale">
          <div className="cs-finale-ambient" />
          <AnimIn>
            <div className="cs-eyebrow">A DIFFERENT PERSPECTIVE</div>
            <h2>
              Explore what’s <em>possible.</em>
            </h2>
            <p>Experience each footwear, garment, timepiece, and accessory study in interactive three-dimensional space.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="#cs-collection">Explore the collection</MagneticButton>
              <button
                type="button"
                onClick={() => setBagOpen(true)}
                style={{
                  padding: '14px 24px',
                  border: '1px solid rgba(255,255,255,0.28)',
                  borderRadius: '100px',
                  background: 'transparent',
                  color: 'inherit',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Open Atelier Bag ({bagItems.reduce((a, b) => a + b.qty, 0)})
              </button>
            </div>
          </AnimIn>
        </section>

        <footer className="cs-footer">
          <a href="#cs-top">{site.brand}</a>
          <span>
            {isDemo ? 'DEMONSTRATION — NOT A LIVE STORE' : 'An original immersive digital storefront'} · {new Date().getFullYear()}
          </span>
          <div className="flex flex-wrap gap-5">
            <a href="?view=audit">QA Harness ↗</a>
            <a href="?view=classic">Classic Stage ↗</a>
            <a href="?view=toolkit">Component Catalog ↗</a>
          </div>
        </footer>

        {/* Interactive 3D Product Modal */}
        {showDialog && (
          <ProductDialog
            item={showDialog}
            close={() => setSelected(null)}
            next={handleNext}
            prev={handlePrev}
            reduced={reduced}
            onAddToBag={addToBag}
          />
        )}

        {/* Slide-Over Atelier Curation / Reservation Drawer */}
        {bagOpen && (
          <div
            className="cs-dialog-backdrop"
            style={{ justifyItems: 'end', padding: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setBagOpen(false);
            }}
          >
            <aside
              role="dialog"
              aria-modal="true"
              aria-label="Atelier Curation Bag"
              style={{
                width: 'min(480px, 100vw)',
                height: '100dvh',
                background: '#141013',
                color: '#faf2ef',
                borderLeft: '1px solid rgba(255,255,255,0.18)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '28px',
                overflowY: 'auto',
              }}
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/15 pb-5">
                  <div>
                    <span className="cs-eyebrow">PRIVATE CLIENT CURATION</span>
                    <h3 className="text-xl font-medium mt-1">Atelier Bag ({bagItems.reduce((a, b) => a + b.qty, 0)})</h3>
                  </div>
                  <button type="button" onClick={() => setBagOpen(false)} className="cs-circle" aria-label="Close Atelier Bag">
                    <X size={18} />
                  </button>
                </div>

                {bagItems.length === 0 ? (
                  <div className="py-16 text-center text-sm opacity-65">Your Atelier Bag is empty. Select any piece to reserve for private inspection.</div>
                ) : (
                  <div className="divide-y divide-white/10 my-6">
                    {bagItems.map((entry, idx) => (
                      <div key={`${entry.product.id}-${entry.finish}-${idx}`} className="py-4 flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest opacity-60">
                            {entry.product.category} · {entry.finish} · {entry.size}
                          </div>
                          <div className="font-medium text-sm mt-1">{entry.product.name}</div>
                          <div className="text-xs opacity-75 mt-1 tabular-nums">
                            {cost(entry.product)} × {entry.qty}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromBag(idx)}
                          aria-label={`Remove ${entry.product.name}`}
                          className="p-2 opacity-60 hover:opacity-100"
                          style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {bagItems.length > 0 && (
                <div className="border-t border-white/15 pt-5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-70 uppercase tracking-wider text-xs">Estimated Valuation</span>
                    <strong className="text-lg tabular-nums" style={{ color: currentFinish.hex }}>
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(bagTotal)}
                    </strong>
                  </div>

                  {reservationSubmitted ? (
                    <div className="p-4 border border-emerald-400/30 bg-emerald-500/10 text-xs leading-relaxed text-emerald-200">
                      <strong>Private Salon Inquiry Recorded (Demo)</strong>
                      <p className="mt-1 opacity-80">
                        Reference #MV-2026-{bagItems.length}09 prepared for {clientName || 'Private Client'}. Note: This is a truthful demonstration interface; no real payment or live order dispatch has been processed.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setReservationSubmitted(true);
                      }}
                      className="space-y-3"
                    >
                      <Input
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Client Name for Salon Appointment"
                        aria-label="Client Name"
                      />
                      <Input
                        required
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="Client Email"
                        aria-label="Client Email"
                      />
                      <button type="submit" className="cs-primary w-full justify-center">
                        Request Private Salon Viewing (Demo) <ArrowRight size={16} />
                      </button>
                      <p className="text-[11px] opacity-55 leading-relaxed">
                        Demonstration storefront only — no live payment gateway or false checkout claim is made.
                      </p>
                    </form>
                  )}
                </div>
              )}
            </aside>
          </div>
        )}
      </main>
    </SmoothScroll>
  );
}
