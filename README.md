# Universal Cinematic Studio v6.1 — AI Studio GitHub Starter

> **v6.2 Visual Recovery Note:** The MAISON VÉRA project uploaded by the user contains six SVG concept posters and zero authentic product GLBs or photo assets. This patch changes commercial surfaces to be photography-first, and deliberately BLOCKS `npm run visual:audit` until real image files are provided. Read `RELEASE_NOTES_VISUAL_RECOVERY_V6_2.md`, `docs/MAISON_VISUAL_FORENSIC_AUDIT.md`, and `AI_STUDIO_VISUAL_RECOVERY_PROMPT.md` before claiming visual readiness.


**A source-code toolkit for original, premium, interactive 3D websites** across fashion, retail, technology, hospitality, architecture, art, education and more. It is a starter and creative system, not a guarantee of Apple-level CGI or photorealistic representations of any product.

**v6.1 QA:** fixed four duplicate-module recipes and added offline checks for 120,960 static ordered module combinations and 10 automated tests. See `RELEASE_NOTES_V6_1.md` and `docs/AI_STUDIO_INTEGRATION_RELEASE_GATE.md`. These checks do not replace production builds or browser tests.

## Included, verifiably

- **24 distinct industry directions** in `site-templates.json` with palettes, copy starters, concepts, typography/layout moods.
- **24 composable design recipes** in `composition-recipes.json` and matching lighting, camera, motion and effects in `experience-presets.json`.
- **75 component export entries** in `component-manifest.json`: the original 59 reusable components plus **10 original cinematic section exports** and **6 new original procedural 3D concept exports**. Export entries share some source files; they are not 75 separate packages.
- **10 composable page-section types:** editorial, filmstrip/lookbook, product spotlight, interactive product rail, process, collection metrics, material study, comparison, manifesto and category index. They are rendered by `src/studio/modules/ExperienceModules.tsx` and selected by template/brief.
- **Per-product 3D viewer:** user-provided local GLB/GLTF can replace conceptual geometry; responsive OrbitControls, product hotspots, cinematic lighting, camera profiles, restrained postprocessing, on-screen loading, reduced-motion option and GPU performance adjustments.
- **12 pre-existing 3D concept types**, plus **6 more** (eyewear, speaker, outdoor backpack, beverage cup, ball, controller). All are approximate silhouettes, not approved replicas.
- Keyword-driven **brief router + creative director** for initial section composition; Google AI Studio handles actual AI-driven edits after import.
- Asset auditor, site doctor, recipe auditor, seven automated Node tests, GitHub Actions source checks.

## Fast start

Use **Node.js 22** and network access to npm. Extract the ZIP *contents* into your repository root; all the following should be at root.

```bash
npm install
npm run site:list
npm run site:brief -- --brief "premium clothing and footwear"
npm run site:director -- --brief "editorial lookbook with 3D footwear and product comparison"
npm run site:auto -- --brand "YOUR FASHION BRAND" --brief "editorial lookbook with 3D footwear" 
npm run dev
npm run check:premium
```

Using your own product catalog JSON with real assets:

```bash
npm run site:auto -- --brand "YOUR BRAND" --brief "premium fashion lookbook" --spec examples/fashion-chain-v6.example.json
```

`site:auto` **writes `src/studio/generated.site.json`**. `site:brief` and `site:director` only print suggestions. Use `--dry-run` with `site:auto` to preview without changing the config. `site:new -- --template <ID> --brand <brand>` picks a specified preset.

For product models, place licensed `.glb` files at `public/models/` and point each `products[].modelPath` to `/models/filename.glb`; images go in `public/images/` and are referenced using `/images/filename.webp`. Supply accurate verified prices, specs, image rights and purchase URLs. If no asset exists, the demo clearly labels its procedural concept view.

## Google AI Studio

1. Upload **unpacked ZIP files and folders** to the root of `https://github.com/Mukulsri369/universal-ai-development-toolkit` (or another repository). Preserve `.github/`, `src/`, `scripts/`, `docs/`, `site-templates.json`, `composition-recipes.json`, `package.json` and `AGENTS.md`.
2. In [Google AI Studio Build](https://ai.google.dev/gemini-api/docs/aistudio-build-mode), choose **Add files (+) → Import from GitHub** and select the repository.
3. Paste `PROMPT_ONE_CLICK_CINEMATIC_SITE.md` and replace the brand/product placeholders. The instructions direct AI Studio to use source code rather than just read GitHub links.
4. Inspect the produced site and run build checks. It does **not** install automatically into every future project. Import the repo for each new project or adapt an existing imported one.

## Honest limitations and verification

**Verified here:** 24 template definitions, 24 recipes, 75 registry component exports, seven Node unit tests, source audits, generated configuration examples and TypeScript/TSX **syntax transpilation** (88 source modules, no syntax diagnostics).

**Not verified here:** npm dependency installation timed out; therefore `npm run typecheck`, Vite production build, Playwright/device browser testing, FPS, WebGL hardware support and visual polish at production quality remain unverified. npm availability, licensed GLBs/textures, HDR calibration, mobile profiling, accessibility audit and checkout/backend integration are still required for a commercially deployable website.

This toolkit does **not** bundle the complete third-party 21st.dev marketplace or UI UX Pro Max skill; their official installation workflows remain optional. No real branded GLB or photography is included. It does not create a perfect high-detail 3D copy of any photographed product without a proper digital asset workflow.

See `START_HERE_AI_STUDIO.md`, `docs/V6_ARCHITECTURE_AND_RELEASE_NOTES.md`, `docs/PRODUCT_ASSET_REQUIREMENTS.md` and `docs/QUALITY_GATES.md`.

## v6.3 — Hybrid Fictional Demo + Verified Merchant Asset Modes

This revision adds `npm run media:plan`, `media:reset`, `media:generate`, `media:ingest`, `media:audit`, `media:promote`, and `media:test`, plus a universal photo-first storefront at `/?view=universal`. See `docs/HYBRID_ASSET_WORKFLOWS.md` and `AI_STUDIO_HYBRID_MASTER_PROMPT.md`.

**Default state:** intentional `fictional-demo` with **no freshly generated photos bundled**. Run server-side image generation with an authorized Google API key and explicit billing approval; use real merchant photos and GLBs for commercial sites. A PNG/JPEG file existing is not evidence of photorealistic visual quality or real-product identity. Rendering/build and billable generation were not verified when packaging this source.

## v6.4 cinematic motion library

Ten original modules under `src/motion/`: kinetic typography, masked photo reveals, pinned horizontal galleries, cursor image previews, sticky chapters, scroll-video playback, scroll-frame playback, GLB camera choreography and a Lenis/GSAP bridge. Blueprint suggestions cover all 24 sector templates. See `docs/MOTION_SYSTEM_GUIDE.md` and run `npm run motion:plan -- --template fashion-runway`.

Developer preview: `?view=motion` (real media must be provided). New Google AI Studio handoff: `AI_STUDIO_MOTION_MASTER_PROMPT.md`.

`npm run motion:audit` and `npm run motion:test` verify code/manifest integrity. They do **not** verify browsers, realism or build success. Production build and real screenshots remain mandatory.
