# Motion reference research — provenance and limits

This is an **original implementation** of interaction patterns. Do not copy another site's bundled scripts, protected images, video, typefaces, or branded layouts.

## Website references

- **https://imdday.ch/** — publicly readable content identifies an experimental interactive-media event with an identity built around loops, animated imagery, and distinctive graphic typography. Inspiration: bold typographic rhythm, non-template layouts, visual surprise, repeatable visual motifs. Exact JS animation timing and browser video were **not captured or verified** in this build.
- **https://www.pragenhatlen.com/** — supplied as a motion reference. Automated retrieval failed here. Exact interactive transitions and source stack are **unverified**; request a user screen recording before promising pixel- or behavior-matched output. Reference URL retained for a future browser review.
- **https://avea.studio/** — accessible studio subpages identify product design, branding, and motion design among their services. Inspiration: restrained hierarchy, agency-grade composition, intentional transitions. We did not capture its full interactive homepage in this environment, so no claims about specific effects or libraries are made.

## Uploaded source research

1. `scroll-world-main (1).zip` (source: oso95/scroll-world; MIT in archive)
   - Framework-agnostic scroll-driven **video** journeys.
   - Carefully prepared scene videos and frame-identical connectors form a seamless sequence.
   - Requires external image/video generators (Monid/Higgsfield, possibly paid), a video pipeline, and real assets.
   - Our original `ScrollVideoJourney` and `ScrollFrameSequence` provide a reusable **playback** layer; they do not run the vendor-specific video-generation pipeline.
2. `ThreeJS_Animation_Scroll-main.zip`
   - Shows 3D GLB loading and transforming one object across scroll chapters.
   - Original demo uses older Three.js CDN imports and starts new GSAP tweens on scroll events. This could create conflicting tweens and was **not copied**.
   - Our `CinematicScrollWorld` uses one progress-based ScrollTrigger plus R3F `useFrame`, camera interpolation, reduced-motion, and licensed GLB assets.
   - No explicit LICENSE file was present in the supplied archive; treat code and embedded model/images as NOT cleared for reuse. **No bee model, demo images, or source code was copied.**
3. `ui-ux-pro-max-skill-main.zip` (MIT license in archive)
   - Contains design intelligence and motion guidelines, including `data/motion.csv`.
   - We applied the design principles of bounded transform animations, scroll cleanup, accessibility, design diversity, and reduced-motion support. We did not vendor the skill into runtime dependencies.

## Other prior repos and their roles

- `motiondivision/motion` — the installed Motion React package is used in existing toolkit components, complementary to GSAP for entering/view/layout motion.
- `nextlevelbuilder/ui-ux-pro-max-skill` — design guidance, not an automatically installed UI component library.
- `21st-dev/skill` / `21st-dev/magic-mcp` — optional marketplace/agent integrations, require supported access and possibly authentication.
- `morluto/rea` — browser-script/DOM/capture analysis in supported environments; it is not an animation library and is not required for the runtime.

## What still needs real-world study

Visually inspect the three original references on desktop and mobile, document 2–3 moments from each with timing, scrolling, pointer and reduced-motion behavior, and compare the implementation without copying source or protected assets. Keep this step marked **NOT RUN** until real captures exist.
