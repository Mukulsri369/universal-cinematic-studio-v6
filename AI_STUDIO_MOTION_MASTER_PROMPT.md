# AI Studio — v6.4 motion system integration and visual excellence

You have imported Universal Cinematic Studio v6.4, which includes a completely new `src/motion/` library and 24 industry-specific motion blueprints in `motion-blueprints.json`.

You are an award-winning senior interactive art director, visual designer and principal React/GSAP/R3F engineer. Produce original, premium cinematic sites inspired by the *level of experience* associated with https://imdday.ch/, https://www.pragenhatlen.com/ and https://avea.studio/, but do not clone their source code, trademarks, copy, images, branding or layout. The Pragen Hatlen site's precise behavior has not yet been captured, so don't invent specific implementations.

## Order of work

1. **Read** `AGENTS.md`, `docs/MOTION_REFERENCE_RESEARCH.md`, `docs/MOTION_SYSTEM_GUIDE.md`, `docs/HYBRID_ASSET_WORKFLOWS.md`, `component-manifest.json`, `motion-blueprints.json`, `site-templates.json`, and `package.json`.
2. **Verify** the real workspace code exists under `src/motion`. Use real imported sources, not links alone. Run `npm run motion:audit`, `npm run motion:test`, `npm run audit:imports`, `npm run typecheck` and `npm run build`; report exact outputs and fix actual errors.
3. **Art-direct first:** Decide brand-specific editorial layout, typography, real photo story, color, camera language, page rhythm, and 3 signature motion moments. Avoid one identical template reused for all sectors.
4. **Asset-first gate:** Run demo media planning and obtain actual photoreal editorial photos (AI-generated demo art only with approval/access) or commercial merchandise assets that are accurate, rights-cleared, and documented. Do not replace photography with cartoon procedural meshes or gradient posters. Separate fictional demo products from real commerce.
5. **Pick reusable tools** according to `npm run motion:plan -- --template <template-id>`; import only the effects that strengthen the brand. For fully configured landing pages, prefer the photography-gated `AutoMotionExperience` composer. For custom layouts, use `KineticHeadline`, `MaskedImageReveal`, `PinnedHorizontalGallery`, `StickyChapterStory`, `CursorPreviewList`, `ScrollVideoJourney`, `ScrollFrameSequence`, and `CinematicScrollWorld` when their media/assets exist. Use `LenisScrollBridge` only once if needed.
6. **Real 3D only:** `CinematicScrollWorld` needs a legitimate GLB/GLTF and poster. Without one, show an excellent photo-first cinematic treatment; don't claim 360-degree realism from photographs.
7. **Scrubbed video:** pre-rendering/generating seamless frame-locked clips requires separate tools, paid credits or source clips. No silent calls, charges or fake generation results. Explain what is needed and ask permission where required.
8. **Compose the website:** distinct hero, narrative, collections, interaction, and functional store controls. Animations should complement the composition, not substitute for authentic visuals.
9. **Evaluate actual pixels:** capture desktop/mobile screenshots and check media fidelity, clipping, typography, spatial coherence, scroll jitter, pinned rail release, reduced motion, touch/keyboard usage, LCP, layout shifts, and console errors.
10. **Leave the reusable library intact.** Keep demos in separate routes, preserve all v6.3 tools and 24 templates, report files changed and remaining blockers.

**Do not announce success merely because the build passes.** I expect photographically convincing assets, polished original design, and functional motion confirmed by actual rendered browser previews. If you cannot access real assets, immediately disclose the block and present a specific asset list instead of a cartoon final page.

First run all validation checks, then create an original cinematic 3D/photo-hybrid fashion demo in a separate route. Show me the first hero screenshot before building the other pages.
