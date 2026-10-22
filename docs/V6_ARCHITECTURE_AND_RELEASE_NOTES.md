# v6 architecture and known boundaries

## Additions over v5

| Area | v5 baseline | v6 additions |
|---|---|---|
| Industry directions | 12 | 24 total: footwear, fragrance, eyewear, audio, furniture, hospitality, beauty, outdoors, food, sports, education and gaming added |
| Reusable component exports | 59 | 75 total (new 10 cinematic section exports + 6 concept-3D exports) |
| Section design system | primarily a shared structure | 10 composable, active modules: editorial, filmstrip, spotlight, rail, process, metrics, material, compare, manifesto, index |
| Recipes | fixed sector aesthetic | 24 industry-specific recipes + keyword-based composition suggestions |
| 3D concepts | watch, sneaker, chair and other prior concepts | eyewear, speaker, backpack, cup, ball, controller added (procedural silhouettes only) |
| CLI | template-based generation | `site:director`, customized brief modules, `site:doctor`, `audit:recipes` |
| Accessibility / performance | basic reduced motion, lazy stage | modal focus wrapping, reduced-motion hero, tab-visibility frame pause; real device QA pending |

## Architecture

- `site-templates.json`: colors, sector focus and copy direction.
- `experience-presets.json`: actual camera/light/motion configs.
- `composition-recipes.json`: choices of four available design section modules for each industry.
- `scripts/brief-router.mjs`: keyword-based template selection.
- `scripts/creative-director.mjs`: keyword-driven composition recommendation (not a generative model).
- `scripts/create-site-from-brief.mjs`: one-command site config generation.
- `src/studio/modules/ExperienceModules.tsx`: actual composable React sections wired into `AutoCinematicSite.tsx` before/after product collection.
- `src/studio/ModelViewport.tsx` + `src/studio/experience/`: licensed model mounting, lighting, orbit controls, procedural conceptual fallbacks and quality controls.

## Product-asset fidelity

Premium photorealistic visuals cannot be guaranteed by procedural geometry and UI templates. A production workflow requires product photography, texture-ready PBR assets, correctly scaled UV-unwrapped licensed GLBs, compression/perf budgets, lighting calibration, accessibility/SEO, interactive QA and brand art direction.

## Testing completed on v6

- 7 Node tests passed, including industry routing and concept inference.
- Source verifier reported 75 component export entries with valid paths.
- Recipe, premium, studio and site-doctor source audits passed.
- 88 `.ts` / `.tsx` modules transpiled successfully by global TypeScript compiler for **syntax only**.
- The dependency installation attempt **timed out**, with no `node_modules` installed. `npm run typecheck`, `npm run build` and real browser/device rendering are **not verified**.
- No real branded GLB models are bundled. No GitHub upload was performed.

## Production gate

After uploading to a network-enabled environment, run `npm install && npm run check:premium`, check network and console errors, inspect 3D graphics on real midrange Android hardware and desktop browsers, validate reduced-motion/keyboard/contrast/SEO/semantic markup, and check purchase routes and real assets.
