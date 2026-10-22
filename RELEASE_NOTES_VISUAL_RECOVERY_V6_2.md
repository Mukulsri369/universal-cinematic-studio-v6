# Universal Cinematic Studio v6.2 — visual recovery patch

This is a SOURCE PATCH to the user's uploaded MAISON VÉRA website (`test--main.zip`), not a fully visually approved cinematic website.

## Changes
- Real-media contract: `PhotographicMedia` permits PNG/JPEG/WebP/AVIF and labels missing real images. Existing illustrated SVGs are not accepted as product photography in premium retail surfaces.
- Hero is photographic when no real GLB asset is supplied; interactive 3D remains enabled only for a verified model path.
- 3D-only controls are hidden in photo views; product labels and accessibility text are more honest.
- Collection, editorial filmstrip, compare, product rail, and material triptych use photos or explicit missing-media notices, not SVG drawings and gradient substitutes.
- Added `heroImagePath` propagation to site generator and demo example; generator updates the provenance ledger when regenerating a site.
- `npm run visual:audit` now enforces hero + per-product raster file presence, size/dimensions where detectable, and asset provenance. Expected to FAIL until seven original or approved photo files are supplied; do not bypass it.
- `npm run visual:briefs` prints seven distinct image-generation / photo sourcing briefs.
- `npm run check:visual` runs visual asset gate + TypeScript + build in a fully installed environment.
- Audit documentation + AI Studio guided asset generation / screenshot review prompt included.

## Verification performed here
- TypeScript transpilation parser: changed TSX files parsed successfully (syntax only).
- Node.js unit tests: 10/10 PASS.
- Static import scanner: 0 local missing imports / undeclared modules.
- `npm run visual:audit`: BLOCKED as expected: missing hero + six SVG illustration assets, no raster photos.
- `npm run typecheck`: NOT PASS — node_modules not installed in this container; missing `vite/client` type definitions. This is an environment dependency limitation, not proof of a new source issue. Production build and real browser screenshot visual QA have not been run here.

## To complete professional imagery
1. Import this patch into the latest AI Studio project or upload to an appropriately named branch of your new GitHub repository (user handles upload).
2. Follow `AI_STUDIO_VISUAL_RECOVERY_PROMPT.md`, enable/provide a real image generation provider or upload owned/licensed editorial photography.
3. Save `/public/images/maison-hero.webp` and the 6 product photographs, update `generated.site.json` `heroImagePath` and `imagePath`, update `visual-assets.manifest.json` truthful image source and rights. Original sample image specs in docs/MAISON_FICTIONAL_IMAGE_SHOT_LIST.json.
4. Run `npm run visual:audit` (must pass) plus normal TypeScript/build/browser tests; manual visual review required.
5. True photoreal rotating 3D products need accurate rights-cleared GLB models; photographs alone cannot create authentic rotatable 3D replicas.
