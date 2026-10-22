# Universal Cinematic Studio v6.3 — Hybrid Media Production

**Two distinct modes, a shared site UI.** Do not confuse a credible looking fictional illustration with a photograph of actual sellable merchandise.

## What is available
- **Fictional Demo Mode** (`assetMode: fictional-demo`): generates photographic-looking campaign media and product concepts for the current brand/category, plus three editorial details, by calling Google's image-generation API from a **local or server-side Node process**. Output is still fictional, and must carry a visible disclosure.
- **Commercial Mode** (`assetMode: commercial-verified`): uses merchant-provided photographic files and optionally a genuinely matching product GLB. Each asset has a recorded merchant SKU, source and rights-reference/attestation. Automated validation cannot prove actual product identity or legal rights; sellers must verify manually.
- The 3D viewer is only shown with an actual supplied GLB. Images cannot be magically converted to an authentic 360° 3D model by this pipeline.
- **UniversalAssetSite** is a generic photo-first website for non-fashion categories (`/?view=universal` can preview it even for fashion). MAISON VÉRA retains its existing fashion view by default.

## Demo mode — generate realistic fictional images

Make a new branch or export a snapshot first, since media commands update your site config and manifest.

```bash
# From project root, after importing into a Node environment with dependencies
npm run site:auto -- --brand "BRAND EXAMPLE · DEMO" --brief "premium lighting studio" 
# When switching to a DIFFERENT brief, reset manifest to match new product IDs:
npm run media:reset -- --apply
npm run media:plan
npm run media:generate                   # dry run, NEVER billed
```

**Explicit permission and billing:** put the real `GEMINI_API_KEY` in the server-side environment (or local secure terminal, never frontend code; never commit .env files). Review https://ai.google.dev/gemini-api/docs/image-generation and model pricing. Generated outputs and API permissions differ by account and model.

```bash
# Test one image first (makes a billable API call)
npm run media:generate -- --execute --approve-spend --only hero
# After reviewing first output, produce remaining 9 for a 6-product site:
npm run media:generate -- --execute --approve-spend
# Check output file types, hashes and dimensions
npm run media:audit -- --mode demo
```

Images are written to `public/images/demo/*.png` (or matching actual JPEG/WebP output), and corresponding site fields and `visual-assets.manifest.json` are updated after each successful output. The generated files must be committed/uploaded along with JSON changes. If image generation fails, stop and report the actual API error; do **not** silently fall back to SVG, gradient panels or unrealistic toy shapes.

**Important:** The script cannot guarantee photorealism: human art direction, actual browser screenshots, model output review, and revisions are required. A 2D generated photo is not a factual product photo or a true 3D model. In this shipped ZIP, live generation was not invoked, because no user-funded API key/approval was supplied.

## Commercial Mode — switch to truthful merchant assets

Always clone a demo workspace before replacing media for an actual seller. Obtain the merchant's consent, real source files, accurate SKU mapping and rights documentation. **Do not send supplier assets through an image-generation service without permission.** Put source files anywhere on the authenticated local machine; the CLI copies only local files into the project.

```bash
# Replace with actual merchant campaign image
npm run media:ingest -- --asset hero --file "incoming/hero.jpg" --source owner --rights-ref "campaign-contract-2026" --approved-by "merchant" --acknowledge-rights

# A specific real item and matching SKU
npm run media:ingest -- --asset product --product "product-001" --file "incoming/item-photo.jpg" --sku "SKU-001" --source supplier --rights-ref "supplier-photo-license-001" --approved-by "merchant" --acknowledge-rights

# Optional: an actual merchant-supplied 3D asset for that exact product
npm run media:ingest -- --asset model --product "product-001" --file "incoming/item.glb" --sku "SKU-001" --source owner --rights-ref "3d-scanning-contract" --approved-by "merchant" --acknowledge-rights

# Import distinct material photographs (three named editorial slots)
npm run media:ingest -- --asset material --id material-macro --file "incoming/material.jpg" --source owner --rights-ref "studio-shoot-license" --approved-by "merchant" --acknowledge-rights
```

Repeat for all products and `editorial-detail` / `studio-process` photos. Supply truthful product names, descriptions, prices and authorized HTTPS URLs in `src/studio/generated.site.json`. Remove fictional brand names and unsupported attributes. Seller authorization/proof must be reviewed by a human; the CLI only records attestations.

```bash
npm run media:audit -- --mode commercial
# Choose this extra strictness if every product is ADVERTISED as 360°/interactive 3D:
npm run media:audit -- --mode commercial --require-3d-all
# Promotion dry-run; will refuse missing or generated assets
npm run media:promote
# After merchant approvals and visual review:
npm run media:promote -- --apply
npm run typecheck && npm run build
```

Commercial promotion intentionally fails while demo assets, fake prices/descriptions, missing SKUs, wrong hashes, inadequate photography or absent editorial images remain. It does not certify legal rights or that images show the product accurately. Real merchant product images should not be edited generatively into a misleading representation.

## Security / cost controls

- `npm run build` **never generates images**; all image-generation requests are server-side commands with `--execute --approve-spend`.
- `GEMINI_API_KEY` is an environment variable; `.gitignore` protects `.env*` and build output. Never prefix the secret with `VITE_` or embed in React files.
- All generation assets are separated under `public/images/demo/`, merchant files under `public/images/merchant/`.
- `media:generate` refuses to overwrite merchant records; `media:ingest` requires explicit rights attestation; `media:promote` verifies manifest and file integrity.
- Images do not create real GLB geometry. Use Blender/scanning/modeling and `glTF Transform` for legitimate 3D product models; commercial viewers display only models whose source has been recorded.

## Run locally / in AI Studio

Google AI Studio Build Mode may not expose all terminal, billing, or secret-management capabilities in every workspace. If a command or backend secret is unavailable, export project and run in an authenticated Node server/terminal; do not put a paid API key in browser JavaScript. Import the resulting `public/images` and updated config files back into AI Studio; verify preview screenshots.
