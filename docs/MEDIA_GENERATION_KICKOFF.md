# MAISON VÉRA — Photographic Media Kickoff (v6.4)

Status: **PLANNED — DRY RUN VERIFIED; NO PAID GENERATION PERFORMED**

Repository: `Mukulsri369/universal-cinematic-studio-v6`
Working branch: `feature/realistic-media`
Base: `main`

## Confirmed code
- `package.json` version `6.4.0`, with `media:plan`, `media:generate`, `media:audit` scripts.
- `src/studio/generated.site.json`: `MAISON VÉRA · DEMO` (fashion).
- `visual-assets.manifest.json`: all media records are pending. `heroImagePath` and all 6 `imagePath` / `modelPath` values remain `null`.
- `scripts/media/generate.mjs` defaults to `gemini-3.1-flash-image` unless `GEMINI_IMAGE_MODEL` is set.
- The generator is terminal/server-side and intentionally requires both `--execute` and `--approve-spend` plus `GEMINI_API_KEY` before an API request.

## Dry-run results (using an extracted copy of the v6.4 release)
`npm run media:plan` — success. **10 requested images.**
`npm run media:generate` — `DRY_RUN_NO_API_CALL`, count **10**.
`npm run media:generate -- --only hero` — `DRY_RUN_NO_API_CALL`, count **1**.
No charges or API requests were made.

## Production shot list

| ID | Asset | Ratio | Expected output |
| --- | --- | --- | --- |
| hero | Original editorial campaign with subject on right, negative space on left | 16:9 | `/images/demo/hero.png` |
| mv-footwear-01 | Fictional luxury sneaker, craftsmanship-focused product photograph | 4:5 | `/images/demo/mv-footwear-01.png` |
| mv-clothing-02 | Fictional cashmere trench, believable textile draping | 4:5 | `/images/demo/mv-clothing-02.png` |
| mv-watch-03 | Fictional precision luxury watch, macro details | 4:5 | `/images/demo/mv-watch-03.png` |
| mv-accessory-04 | Fictional titanium sunglasses, premium studio optics | 4:5 | `/images/demo/mv-accessory-04.png` |
| mv-accessory-05 | Fictional vermeil ring stack, controlled jewelry light | 4:5 | `/images/demo/mv-accessory-05.png` |
| mv-accessory-06 | Fictional leather/canvas weekender pack | 4:5 | `/images/demo/mv-accessory-06.png` |
| material-macro | Close-up fashion material texture | 4:5 | `/images/demo/material-macro.png` |
| editorial-detail | Authentic-looking couture detail photograph | 4:5 | `/images/demo/editorial-detail.png` |
| studio-process | Fashion studio process and material detail | 4:5 | `/images/demo/studio-process.png` |

## Next action requiring account owner
1. In **Codex Cloud**, connect this GitHub repository and select branch `feature/realistic-media`. An external Codex Cloud environment was **not** created by this report.
2. Review Gemini API image generation model availability and price: https://ai.google.dev/gemini-api/docs/image-generation .
3. Put `GEMINI_API_KEY` in a suitable secure environment secret store (not repository files, not browser code). Enable network access for `generativelanguage.googleapis.com` only as needed.
4. After explicit cost authorization, generate **the hero only** in a runtime permitted to contact the API:
   ```bash
   npm run media:generate -- --execute --approve-spend --only hero
   ```
5. Inspect the actual output for photographic quality and brand suitability before generating further images.
6. Run `npm run media:audit -- --mode demo`; run typecheck/build and verify browser screenshots after integration.
7. Commit only generated asset files and manifest changes to this feature branch, then open a PR. Never commit API keys.

### Important constraints
- These are **fictional demo** media. No images of real sellable items have been verified.
- No video-generation script or licensed product GLB model is guaranteed by the current media workflow.
- Dry runs validate configuration and safety gating, not image-generation API access or visual quality.
