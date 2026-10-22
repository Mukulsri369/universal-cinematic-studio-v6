# UNIVERSAL CINEMATIC STUDIO v6.3 — HYBRID MEDIA SYSTEM

ROLE: Senior full-stack engineer, art director and realistic 3D web engineer.

This project has two explicitly separate workflows. Inspect `docs/HYBRID_ASSET_WORKFLOWS.md`, `scripts/media/*.mjs`, `src/studio/UniversalAssetSite.tsx`, and `visual-assets.manifest.json`. Use actual source code; never pretend a module is installed because its name appears in documentation.

## Phase A: Verify code
Run `npm run media:test`, `npm test`, `npm run audit:imports`, `npm run typecheck`, `npm run build`. Report output, distinguish NOT RUN from PASS. Do not replace current project or overwrite toolkit components.

## Phase B: Fictional photographic demo
- Determine current brand, business category and product list from the current site JSON.
- If a DIFFERENT brief was selected, run `npm run site:auto` then `npm run media:reset -- --apply` before planning assets.
- Run `npm run media:plan`. Explain expected number and kind of images to the user.
- Obtain explicit approval for Gemini API use and its expected expense, and confirm a secure Node/server-side `GEMINI_API_KEY` exists. Never place secrets in frontend or source.
- After approval only, run `npm run media:generate -- --execute --approve-spend --only hero` and inspect the image. Then generate remaining assets.
- Use the resulting real image files, not generic SVG/product illustrations. Product and hero imagery is FICTIONAL and must be labeled; do not portray as merchandise available for purchase.
- Keep image quality high; iterate as needed with art direction, color consistency, product realism and believable anatomy. Do not claim you ran generation if provider access is unavailable.
- Run `npm run media:audit -- --mode demo` and capture screenshots of actual desktop/mobile layouts. Static raster validation does not equal photorealism.

## Phase C: Actual merchant launch
- Require owner/supplier/product photos, authentic SKU-to-photo mappings, signed media usage permissions/attestation and accurate product information.
- Import each file with `npm run media:ingest -- ...` using owner/supplier/stock licenses and record source evidence.
- Import actual GLBs only if they depict the exact matching SKU; otherwise keep products PHOTO-ONLY. Never turn a still photo into a fake interactive 360° model or display conceptual 3D shapes as authentic merchandise.
- Import 3 distinct editorial detail shots. Update product descriptions, brands and prices to verified data.
- Run `npm run media:audit -- --mode commercial`; fix failures; run `npm run media:promote -- --apply` after merchant review, then rerun `npm run typecheck && npm run build`.

## Visual experience
Build original high-end photography-led layouts appropriate to the selected business, not just recolored fashion templates. Non-fashion brands use `UniversalAssetSite` by default. Use premium typography, actual campaign photographs, accurate product photos and restrained Motion/GSAP interactions. Provide optional genuine WebGL product inspection only when verified GLBs exist. Keep scroll smooth and mobile responsive. Avoid abstract gradients, cartoon SVGs, visibly fake product renderings and over-animated generic widgets.

Output: Actual preview screenshots, commands executed, image provenance coverage and remaining blockers. Do not declare production/visual readiness from source tests alone.
