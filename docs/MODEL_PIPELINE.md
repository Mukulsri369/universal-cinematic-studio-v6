# Production photorealism and asset pipeline

The included product is an ORIGINAL PROCEDURAL headphone study made with Three.js geometry. It demonstrates interactivity and lighting, **not an accurate representation of products you sell**. Serious brand-level realism needs an actual approved product asset, usually a PBR GLB/GLTF from the manufacturer, 3D artist or licensed marketplace.

1. Obtain a product model you own or may use commercially. Export glTF 2.0 / `.glb` with real PBR textures (base color, metalness, roughness, normal) and UV maps; do not scrape other brands' protected models.
2. Optimize geometry with glTF-Transform or other trusted asset pipeline. Use Draco/Meshopt geometry compression if supported. Compress textures (KTX2/Basis) when needed and supply local decoder resources when your loader requires them. Measure actual payload; an initial aspirational target is <= 4 MB for the hero GLB on mobile, not a hard invariant.
3. Save to `public/models/product.glb`. Set `productModelPath: '/models/product.glb'` in `src/cinematic/storefront.config.ts`.
4. In `src/cinematic/CinematicStage.tsx`, position/scale the `<LicensedGLB>` wrapper as required. Product assets vary in units. Verify camera field-of-view, bounds, orientation, reflections and material color space.
5. Currently environment reflections are generated locally using Drei `Environment` + `Lightformer`, avoiding dependency on a remote HDRI CDN. Replace with a licensed HDR environment for a specific shoot if needed.
6. Run lighthouse/mobile GPU checks and test iOS Safari, Android Chrome, desktop Chromium. If effects look bad or lag, turn off post-processing on mobile and cap DPR further.
7. Add one properly composed still fallback/poster image and alternative product text. No placeholder should be passed off as an exact customer product.

Useful upstream docs:
- R3F: https://r3f.docs.pmnd.rs
- Drei: https://drei.docs.pmnd.rs
- Postprocessing: https://react-postprocessing.docs.pmnd.rs
- Three postprocessing manual: https://threejs.org/manual/pages/how-to-use-post-processing.html
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
