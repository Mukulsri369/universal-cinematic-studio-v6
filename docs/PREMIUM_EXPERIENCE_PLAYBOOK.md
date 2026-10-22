# Premium experience architecture — v5

This is an **original implementation strategy**, not a clone of Apple, Awwwards entries, or other sites. Our goal: high craft and useful commerce, not excessive visual effects.

## Experience routing

`site-templates.json` contains 12 industry directions. `experience-presets.json` maps each to a lighting mood, camera path, motion pacing and postprocessing envelope. `npm run site:brief -- --brief "clothing fashion line"` proposes a matching template **deterministically**. This keyword router is not a trained generative AI. Google AI Studio may generate new layouts after inspecting actual components.

### Composition examples

| Business | Aesthetic | Visual centerpiece | Motion | Production assets needed |
|---|---|---|---|---|
| Fashion | Editorial runway, tactile materials | user-supplied mannequin/garment GLB | runway camera + section reveal | approved clothing photos, GLB or video, size charts |
| Luxury watch | Metallic macro | watch GLB, detail hotspots | slow macro reveal | dial and strap accurate 3D model |
| Jewelry | fine detail, graded highlights | gemstone GLB + studio reflections | precise macro movement | gem material + measurement verified |
| Lighting | Architectural shadows | true fixture GLB + baked room HDRI | architectural camera | IES profile / accurate dimensions |
| Automotive | kinetic wide-screen | car GLB and brand-owned materials | sweeping camera and scroll chapters | optimized car GLB, photo licenses |
| Cosmetics | warm organic | bottle GLB | quiet rotation and chapters | correct labels, textures |
| Affiliate creator store | commerce first | individual product GLB where available | lighter gallery motion | verified prices and working affiliate URLs |
| SaaS | UI product story | genuine interface screenshots | stepped motion | accurate actual UI and claims |

## Implemented in source

- Adaptive mood-based 3-point studio lights + lightformer environment.
- Hero camera paths (6 directions) that respect reduced-motion preference.
- Procedural atmosphere shader on premium desktop mode, suppressed on low-quality/reduced-motion rendering.
- Optional per-product annotation hotspots in detailed 3D view.
- Original conceptual models: watch, sneaker, chair, plus baseline lamp, jewelry ring, car, bottle, fabric, device, etc.
- Runtime fallback to a concept when a GLB fails; **never present the substitute as an accurate 3D product**.
- Product-wise 3D view, product links, focus/keyboard navigation, adaptive DPR.

## Premium acceptance checklist

Before publishing a commercial site, do not rely on `npm run verify` alone. In a networked environment run `npm ci` (once lockfile exists), `npm run check:premium`, inspect the browser on desktop and mid-range mobile, verify product model accuracy, and run a browser accessibility/performance audit.

## Not automatic

No official product photographs, commercial fonts, paid 3D assets, marketplace-wide 21st.dev components, or browser-perfect brand designs are bundled. One prompt can **direct** AI Studio to implement and improve this source; it cannot guarantee world-class design or material accuracy without assets, human QA and runtime testing.

## One-command fashion chain setup

```bash
npm run site:auto -- --brand "MY FASHION STORE" --brief "fashion clothing shoes accessories" --spec examples/fashion-chain.example.json
```

The generator maps concepts individually (sneaker, fabric sculpture, watch). Replace these with accurately modeled GLB assets for photorealistic products. Do **not** treat dummy inventory or prices as live.
