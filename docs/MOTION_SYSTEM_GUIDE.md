# Universal Cinematic Studio v6.4 — original motion system

## Purpose

Production-oriented primitives for original cinematic e-commerce and editorial sites, not a one-click guarantee of award-winning design. Use real photography and licensed 3D models. Do not present decorative geometry, gradient backgrounds, or SVG product line art as authentic merchandise.

## API and media requirements

Import components from `src/motion/index.ts`, and include `src/motion/motion.css` once (the showcase route already imports it). All public-facing media URLs must resolve and be owned/licensed or properly generated.

| Component | Input | Purpose | Fallback |
|---|---|---|---|
| `KineticHeadline` | `text`, optional `trigger` | Staggered word reveals / controlled scroll | Full visible text |
| `MaskedImageReveal` | `src`, `alt`, `ratio` | Scroll scrubbed photo mask and scale | Explicit photo-needed panel |
| `PinnedHorizontalGallery` | `{id,image,alt,title}[]` | Editorial product rail pinned only on wide screens | Native touch scroll rail |
| `CursorPreviewList` | `{id,name,image,href}[]` | Fluid image cursor next to accessible project links | Inline mobile photos |
| `StickyChapterStory` | `{id,title,body,image,alt}[]` | Sticky image storytelling with text chapters | In-flow pictures on mobile |
| `ScrollVideoJourney` | `src`, `poster` | Scroll-controlled owner-supplied MP4/WebM | Static photographic poster |
| `ScrollFrameSequence` | `frames[]`, `alt` | Pre-rendered image sequence scrub | First frame |
| `CinematicScrollWorld` | `modelPath`, `poster`, `beats[]` | R3F real 3D camera choreography with validated beats | Poster, no counterfeit model |
| `LenisScrollBridge` | `children` | Single Lenis source synchronized to GSAP ticker | Native scroll / reduced motion |
| `AutoMotionExperience` | Industry template ID, brand/copy, real photo list, optional GLB/video/frames | Compose an asset-gated photographic site from a blueprint | Explicit asset-readiness screen |

## Motion director — industry-based initial plans

`npm run motion:plan -- --template fashion-runway`

`npm run motion:plan -- --template automotive-motion`

The automatic `AutoMotionExperience` composer applies the selected template when media is available; otherwise it explicitly blocks publication. The recommendations in `motion-blueprints.json` cover all 24 existing templates, but **do not automatically guarantee artistic quality**. They are prompts for composition, not pre-rendered site themes. Design the real page carefully per brief.

## Camera keyframe contract

```
const beats = [
  { progress: 0, position: [0,1,9], target: [0,0,0], rotation: [0,-0.3,0] },
  { progress: 0.5, position: [2,0,5], target: [0,0,0], rotation: [0,0.2,0] },
  { progress: 1, position: [-1,1,4], target: [0,0,0], rotation: [0,0.6,0] },
];
<CinematicScrollWorld modelPath="/models/my-licensed-product.glb" poster="/images/my-product.webp" label="Product introduction" beats={beats}/>
```

`progress` must be strictly increasing, start at 0 and end at 1. It is **not a geometry or model generator**.

## Scroll video sequencing

Source all videos independently. For a seamless camera-flight sequence, the final frame of clip N and first frame of clip N+1 must be identical or transition-matched. Merge/encode the clips into a seekable playback master before using `ScrollVideoJourney`; video currentTime scrubbing has variable precision and may stutter with sparse keyframes. For precision-critical Apple-like sequences prefer a frame sequence, short GOP encoding, or specialized playback optimization after measuring performance.

## Performance and a11y gates

- Test keyboard focus and reduced motion. Do not hide content when animation JS is absent.
- Allow native scrolling when reduced motion is requested. Mount one `LenisScrollBridge` only; don't also mount the existing `SmoothScroll`.
- Pinned rails must unpin on narrow displays; offer horizontal touch scroll.
- Avoid 3D canvas per product card; use one hero canvas and launch a viewer modal for a product.
- Load full photographic media before accepting premium visual QA, test 375px, 768px, 1440px and real phone GPU; measure LCP, CLS and INP.
- Production build depends on actual available React/GSAP/R3F npm packages and a valid lockfile; running only JSON/file audits is insufficient.

## Demo

Visit `?view=motion` for the isolated motion mechanics route. It has no photo assets by default and intentionally displays media-needed panels until you add approved imagery. In `src/motion/MotionShowcase.tsx` replace the four empty `media` values with actual image URLs and rerun tests. **Do not treat this developer route as a finished customer store.**
