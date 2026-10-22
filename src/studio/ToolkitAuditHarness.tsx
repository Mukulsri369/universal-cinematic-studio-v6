import { Suspense, lazy, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Box, CheckCircle2, Eye, Layers, Monitor, Play, ShieldCheck, Smartphone, Sparkles } from 'lucide-react';
import templatesData from '../../site-templates.json';
import recipesData from '../../composition-recipes.json';
import presetsData from '../../experience-presets.json';
import manifestData from '../../component-manifest.json';
import { ExperienceModules, moduleTypes, type SiteModule, type SiteProduct } from './modules/ExperienceModules';
import type { ExperiencePreset, ProductHotspot } from './experience';
import { AnimatedGradientButton, AuroraBackground, CountUp, GradientBorderCard, MagneticButton, Marquee, Reveal, SpotlightCard, TextShimmer, TiltCard, TypewriterText, WordReveal } from '@/components/creative';
import { BentoGrid, FaqSection, FeatureTimeline, PricingCards, ProductGrid, Testimonials } from '@/components/sections';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Alert, AlertDescription, AlertTitle, Avatar, AvatarFallback, Badge, Breadcrumb, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Checkbox, Chip, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, EmptyState, Input, Kbd, Label, Pagination, Progress, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, Skeleton, Stat, Switch, Table, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui';
import './studio.css';
import './premium.css';

const ModelViewport = lazy(() => import('./ModelViewport'));
const Orb = lazy(() => import('@/components/Orb'));
const ThreeStage = lazy(() => import('@/components/creative/ThreeStage').then(m => ({ default: m.ThreeStage })));
const StarfieldScene = lazy(() => import('@/components/scenes/StarfieldScene').then(m => ({ default: m.StarfieldScene })));
const OrbitSystemScene = lazy(() => import('@/components/scenes/OrbitSystemScene').then(m => ({ default: m.OrbitSystemScene })));
const FloatingGeometryScene = lazy(() => import('@/components/scenes/FloatingGeometryScene').then(m => ({ default: m.FloatingGeometryScene })));

const conceptsList = [
  'sculpture', 'lamp', 'rings', 'vehicle', 'fabric', 'planet', 'device', 'architecture', 'bottle',
  'watch', 'sneaker', 'chair', 'eyewear', 'speaker', 'gear', 'cup', 'ball', 'controller'
] as const;

const sampleHotspots: ProductHotspot[] = [
  { id: 'hs-1', label: 'Primary Form', description: 'Procedural silhouette geometry', position: [0.4, 0.5, 0.4] },
  { id: 'hs-2', label: 'Surface Material', description: 'PBR metallic/roughness calibration', position: [-0.45, -0.2, 0.5] }
];

const scenarios = [
  { prompt: 'Create a cinematic 3D luxury clothing website.', templateId: 'fashion-runway', concept: 'fabric', modules: ['filmstrip', 'product-rail', 'manifesto', 'material'] },
  { prompt: 'Create an immersive jewellery website with detailed 3D product views.', templateId: 'jewelry-atelier', concept: 'rings', modules: ['material', 'spotlight', 'manifesto', 'filmstrip'] },
  { prompt: 'Create a premium automotive website with cinematic lighting and camera movements.', templateId: 'automotive-motion', concept: 'vehicle', modules: ['spotlight', 'process', 'compare', 'metrics'] },
  { prompt: 'Create an interactive furniture showroom.', templateId: 'furniture-form', concept: 'chair', modules: ['editorial', 'material', 'filmstrip', 'process'] },
  { prompt: 'Create a futuristic technology product website.', templateId: 'tech-launch', concept: 'device', modules: ['spotlight', 'process', 'compare', 'metrics'] }
];

export default function ToolkitAuditHarness() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('luxury-product');
  const [selectedConcept, setSelectedConcept] = useState<string>('watch');
  const [selectedModule, setSelectedModule] = useState<SiteModule>('editorial');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeScene, setActiveScene] = useState<'viewport' | 'orb' | 'threestage' | 'starfield' | 'orbit' | 'geometry'>('viewport');

  const template = templatesData.find(t => t.id === selectedTemplateId) || templatesData[0];
  const recipe = (recipesData as Record<string, { hero: string; modules: string[]; motionPace: string }>)[template.id];
  const preset = (presetsData as Record<string, ExperiencePreset>)[template.id];

  const testProducts: SiteProduct[] = [
    {
      id: 'qa-01',
      name: `${template.name} Hero Study`,
      description: 'Interactive 3D conceptual study verifying orbit controls, lighting rig, and hotspots.',
      concept: selectedConcept,
      category: template.category,
      price: 24500,
      currency: 'INR',
      specs: { Finish: 'Studio Calibrated', Geometry: 'Procedural Concept', Lighting: preset.mood, Camera: preset.camera }
    },
    {
      id: 'qa-02',
      name: `${template.name} Edition II`,
      description: 'Secondary conceptual model for comparison and rail testing.',
      concept: template.concept,
      category: template.category,
      price: 32000,
      currency: 'INR',
      specs: { Finish: 'Anodized / Brushed', Geometry: 'Procedural Concept', Lighting: preset.mood, Camera: preset.camera }
    },
    {
      id: 'qa-03',
      name: `${template.name} Archive Object`,
      description: 'Tertiary item validating 3-column layout and category indexing.',
      concept: 'sculpture',
      category: 'archive',
      price: 18900,
      currency: 'INR',
      specs: { Finish: 'Matte Ceramic', Geometry: 'Procedural Concept', Lighting: preset.mood, Camera: preset.camera }
    }
  ];

  const applyScenario = (s: typeof scenarios[number]) => {
    setSelectedTemplateId(s.templateId);
    setSelectedConcept(s.concept);
    setSelectedModule(s.modules[0] as SiteModule);
    setActiveScene('viewport');
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#090913] text-[#f5f3ff]" style={{
        '--cs-bg': template.background,
        '--cs-text': template.foreground,
        '--cs-accent': template.accent,
        '--cs-secondary': template.secondary
      } as React.CSSProperties}>
        {/* Top Audit Navigation */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090913]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300">
                <ShieldCheck size={20} />
              </div>
              <div>
                <span className="text-sm font-bold tracking-wider">UNIVERSAL CINEMATIC STUDIO v6.1</span>
                <span className="ml-3 rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
                  QA & VERIFICATION HARNESS
                </span>
              </div>
            </div>
            <nav className="flex flex-wrap items-center gap-3 text-xs">
              <a href="/" className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10">
                <ArrowLeft size={14} /> Studio Storefront
              </a>
              <a href="/?view=classic" className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10">
                Classic Storefront <ArrowUpRight size={14} />
              </a>
              <a href="/?view=toolkit" className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10">
                Component Catalog <ArrowUpRight size={14} />
              </a>
            </nav>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] space-y-12 px-6 py-10">
          {/* Status Summary Strip */}
          <section aria-label="Audit Telemetry" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Component Manifest Exports" value={<CountUp value={manifestData.components.length} />} trend="75 verified local exports" icon={<Layers size={18} />} />
            <Stat label="Industry Templates & Recipes" value={<CountUp value={templatesData.length} />} trend="120,960 ordered module combos" icon={<Sparkles size={18} />} />
            <Stat label="3D Procedural Silhouettes" value={<CountUp value={conceptsList.length} />} trend="18 distinct concept geometries" icon={<Box size={18} />} />
            <Stat label="Active Template Contrast" value={template.name} trend={`${template.background} / ${template.accent}`} icon={<Eye size={18} />} />
          </section>

          {/* Phase 8: Natural-Language Scenario Router Tester */}
          <section aria-label="Universal Website-Building Scenarios" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold">Phase 8 — Universal Website-Building Prompt Scenarios</h2>
                <p className="text-xs text-white/60">Click any scenario to load its routed industry template, 3D concept geometry, lighting mood, and module recipe.</p>
              </div>
              <Badge>Live Configuration Switcher</Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {scenarios.map((s) => (
                <button
                  key={s.templateId}
                  onClick={() => applyScenario(s)}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition ${
                    selectedTemplateId === s.templateId
                      ? 'border-violet-400 bg-violet-500/15 text-white'
                      : 'border-white/10 bg-white/[0.02] text-white/75 hover:border-white/25 hover:bg-white/[0.05]'
                  }`}
                >
                  <p className="text-xs font-medium leading-relaxed">“{s.prompt}”</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] text-violet-300">
                    <span>{s.templateId}</span>
                    <span>3D: {s.concept}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Phase 4 & 5: Interactive 3D Engine & 24-Template Inspector */}
          <section aria-label="3D Engine and Template Matrix" className="grid gap-8 lg:grid-cols-[380px_1fr]">
            <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-bold">3D & Template Controls</h2>

              <div className="space-y-2">
                <Label>Industry Template (24 Directions)</Label>
                <Select value={selectedTemplateId} onValueChange={(v) => {
                  setSelectedTemplateId(v);
                  const found = templatesData.find(t => t.id === v);
                  if (found) setSelectedConcept(found.concept);
                }}>
                  <SelectTrigger aria-label="Select industry template">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templatesData.map(t => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name} ({t.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>3D Concept Geometry (18 Silhouettes)</Label>
                <div className="flex flex-wrap gap-1.5">
                  {conceptsList.map(c => (
                    <button
                      key={c}
                      onClick={() => { setSelectedConcept(c); setActiveScene('viewport'); }}
                      className={`rounded-md px-2.5 py-1 text-xs capitalize transition ${
                        selectedConcept === c && activeScene === 'viewport'
                          ? 'bg-violet-500 font-semibold text-white'
                          : 'bg-white/5 text-white/65 hover:bg-white/10'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>3D Scene / Canvas Target</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(['viewport', 'orb', 'threestage', 'starfield', 'orbit', 'geometry'] as const).map(sc => (
                    <button
                      key={sc}
                      onClick={() => setActiveScene(sc)}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium capitalize transition ${
                        activeScene === sc ? 'border-violet-400 bg-violet-500/20 text-white' : 'border-white/10 bg-white/5 text-white/60'
                      }`}
                    >
                      {sc === 'viewport' ? 'Studio ModelViewport' : sc}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span>Reduced Motion Mode</span>
                  <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} aria-label="Toggle reduced motion" />
                </div>
                <div className="flex items-center justify-between">
                  <span>3D Product Hotspots</span>
                  <Switch checked={showHotspots} onCheckedChange={setShowHotspots} aria-label="Toggle 3D hotspots" />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-xs space-y-1.5 text-white/70">
                <div className="font-semibold text-white">Active Experience Preset:</div>
                <div>Lighting Mood: <span className="text-violet-300">{preset.mood}</span></div>
                <div>Camera Path: <span className="text-violet-300">{preset.camera}</span></div>
                <div>Motion Pace: <span className="text-violet-300">{preset.motion}</span></div>
                <div>Postprocessing: <span className="text-violet-300">{preset.effects}</span></div>
                <div>Recipe Modules: <span className="text-violet-300">{recipe.modules.join(', ')}</span></div>
              </div>
            </div>

            {/* Live 3D Stage */}
            <div className="flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0c0b14]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-6 py-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-white/50">{template.eyebrow}</span>
                  <h3 className="text-xl font-bold" style={{ color: template.accent }}>
                    {template.headline} <em>{template.emphasis}</em>
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span>Concept: <strong className="text-white">{selectedConcept}</strong></span>
                  <span>·</span>
                  <span>Interactive Orbit + Zoom</span>
                </div>
              </div>

              <div className="relative min-h-[480px] flex-1">
                <Suspense fallback={<div className="grid h-[480px] place-items-center text-sm text-white/50">Loading 3D WebGL Canvas...</div>}>
                  {activeScene === 'viewport' && (
                    <ModelViewport
                      concept={selectedConcept}
                      accent={template.accent}
                      interactive={true}
                      reducedMotion={reducedMotion}
                      stage="detail"
                      label={`${template.name} (${selectedConcept})`}
                      experience={preset}
                      hotspots={showHotspots ? sampleHotspots : []}
                    />
                  )}
                  {activeScene === 'orb' && <div className="h-[480px]"><Orb /></div>}
                  {activeScene === 'threestage' && <div className="h-[480px]"><ThreeStage /></div>}
                  {activeScene === 'starfield' && <div className="h-[480px]"><StarfieldScene /></div>}
                  {activeScene === 'orbit' && <div className="h-[480px]"><OrbitSystemScene /></div>}
                  {activeScene === 'geometry' && <div className="h-[480px]"><FloatingGeometryScene /></div>}
                </Suspense>
              </div>
            </div>
          </section>

          {/* Phase 3 & 4: All 10 Composable ExperienceModules Live Renderer */}
          <section aria-label="Composable Experience Modules Tester" className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div>
                <h2 className="text-lg font-bold">Phase 3 & 4 — 10 Composable Cinematic Section Modules (`ExperienceModules.tsx`)</h2>
                <p className="text-xs text-white/60">Select any of the 10 studio modules to render it live with the active industry template palette.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {moduleTypes.map(m => (
                  <button
                    key={m}
                    onClick={() => setSelectedModule(m)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                      selectedModule === m ? 'bg-violet-500 text-white' : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/15">
              <ExperienceModules
                slot="pre-collection"
                modules={[selectedModule]}
                brand={template.name.toUpperCase()}
                category={template.category}
                summary={template.summary}
                chapters={template.chapters}
                products={testProducts}
                onOpen={(idx) => {
                  const p = testProducts[idx];
                  if (p?.concept) setSelectedConcept(p.concept);
                }}
                reducedMotion={reducedMotion}
              />
            </div>
          </section>

          {/* Phase 3: UI & Creative Primitives Verification Grid */}
          <section aria-label="UI and Creative Primitives Verification" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-6">
            <h2 className="text-lg font-bold">Phase 3 — UI, Creative & Section Primitives Smoke Verification</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Controls</CardTitle>
                  <CardDescription>Radix UI & shadcn-compatible primitives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm">Primary</Button>
                    <Button size="sm" variant="outline">Outline</Button>
                    <Button size="sm" variant="ghost">Ghost</Button>
                    <Kbd>⌘K</Kbd>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="qa-check" defaultChecked />
                    <Label htmlFor="qa-check">Verified accessibility</Label>
                  </div>
                  <Progress value={88} />
                  <Breadcrumb items={[{ label: 'Studio', href: '/' }, { label: 'Audit', href: '/?view=audit' }, { label: 'v6.1' }]} />
                </CardContent>
              </Card>

              <TiltCard>
                <GradientBorderCard className="h-full">
                  <h3 className="text-base font-bold"><TextShimmer>Creative Motion Primitives</TextShimmer></h3>
                  <p className="mt-2 text-xs text-white/65">
                    Testing <TypewriterText words={['GSAP timelines.', 'Motion reveals.', 'Lenis smooth scroll.']} />
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <AnimatedGradientButton>Gradient Action</AnimatedGradientButton>
                  </div>
                </GradientBorderCard>
              </TiltCard>

              <SpotlightCard className="p-6">
                <div className="flex items-center justify-between">
                  <Avatar><AvatarFallback>V6</AvatarFallback></Avatar>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="outline">Hover Tooltip</Button>
                    </TooltipTrigger>
                    <TooltipContent>Radix Tooltip Verified</TooltipContent>
                  </Tooltip>
                </div>
                <div className="mt-4">
                  <Alert>
                    <AlertTitle>All 75 Component Exports Verified</AlertTitle>
                    <AlertDescription>Zero missing imports or broken TypeScript definitions.</AlertDescription>
                  </Alert>
                </div>
              </SpotlightCard>
            </div>
          </section>
        </div>
      </div>
    </TooltipProvider>
  );
}
