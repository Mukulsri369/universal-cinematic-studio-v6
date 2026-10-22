# MAISON VÉRA — source and supplied screenshot audit

## Evidence directly checked
- The uploaded website screenshots show a crude hero footwear-like mesh, flat outlined illustrations for shoes/coat/watch, and three empty gradient material panels.
- `public/images/` contains exactly six lightweight `maison-*.svg` illustrations, no high-resolution photos.
- `public/models/` has only a README, no GLB/GLTF models.
- `src/studio/generated.site.json`: every one of six products has `modelPath: null` and `imagePath: /images/maison-*.svg`.
- `ModelViewport.tsx`: procedural mesh geometry is intentionally substituted when a GLB is unavailable. Fabric is a `torusKnotGeometry`; product concepts cannot approximate actual clothing.
- `ExperienceModules.tsx`: `Material` used hard-coded gradients rather than images; `Picture` permitted SVG or placeholders.
- The screenshot has a very large mixed-weight uppercase headline and the filmstrip shows cut-off editorial cards. This can be artistic, but here it competes with already weak media.
- Successful TypeScript/Playwright checks cannot establish photo realism or award-level composition.

## Root-cause priorities
1. **P0: Real asset availability, provenance, and local paths.** Need licensed/owned or explicitly fictional AI-generated photographic images. NEVER call SVG a photograph.
2. **P0: Media renderer truth.** Current patch uses raster-first `PhotographicMedia`, replaces fake 3D hero and commercial media with photo-only views absent actual GLB, and shows an explicit missing-image notice when assets aren't ready.
3. **P1: Visual QA as release gate.** `npm run visual:audit` fails until `heroImagePath` and six product images exist with file, metadata, width/provenance checks. This only establishes technical inputs, not visual realism.
4. **P1: Product-specific campaigns**: consistent art direction, accurate product identity and textiles. No invented material claims for real products.
5. **P1: Screenshots + visual approval.** Test mobile/desktop rendered page; tune composition, cropping, accessibility, transition restraint and product clarity.
6. **P2: Real 3D** requires actual GLB/GLTF (photogrammetry, CAD, Blender or commercially licensed models) with correct topology, PBR textures and optimized rendering; a generic procedural shoe is not a product likeness.

## Status
Source surgery performed; photography **not supplied** and preview/build **not proven** in this environment. Running `npm run visual:audit` now should return a **FAIL/BLOCKED** result for the expected missing photographic assets. This is intentional: it prevents superficial build-passed claims from misrepresenting visuals.

## Note on references
- `morluto/rea`: tools for website observation and script/bundle investigation, not a store of 3D assets. Use only with authorized sites and appropriate tooling.
- `motiondivision/motion`, `nextlevelbuilder/ui-ux-pro-max-skill`, `21st-dev`: motion/design/component resources, not a substitute for real photography or high-quality 3D models.

## What user must provide for exact product representation
Photos from owner/supplier, or explicit consent to generate FICTIONAL demo campaign images. Accurate 360-degree product views also need rights-cleared GLB/GLTF models per product. Site must label demonstrations appropriately.

## Exact demo asset counts
The six SVG illustrations weigh approximately 1.3–2.3 KB each and there is no binary photographic asset. The old asset audit passed because it checked that referenced files existed, not that they were photographs. All six JSON modelPath entries are null. The visual gate is deliberately RED until seven raster files have been generated/approved and their provenance recorded.
