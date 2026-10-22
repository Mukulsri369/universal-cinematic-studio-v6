# v6.3 Hybrid Media Release — Source QA

## Scope
- Fictional photo-demo creation: prompt planning for hero, every product, and three material details; optional Google Gemini image generation via Node-only paid REST call with explicit approval; brand/palette/style reference image consistency; PNG/JPEG/WebP outputs recorded in `visual-assets.manifest.json` with SHA-256, dimensions and model/prompt provenance.
- Commercial product truth: local merchant photo/GLB ingestion with SKU matching and attested rights/source reference; audit and explicit manual promotion. Prevents generated demo assets from being accepted as real commercial inventory.
- Photo-first universal storefront: non-fashion categories use the generic `UniversalAssetSite`, fashion demo preserves existing MAISON VÉRA unless `?view=universal` is requested.
- Existing photo-first UI material gallery now accepts its own editorial photography; header labels the demo mode.
- Model loader no longer falls back to cartoon/conceptual shapes when a supplied commercial GLB fails.
- Removed six obsolete SVG product illustrations from the COMPLETE source release. On an existing GitHub repo, delete old `public/images/maison-*.svg` manually after confirming nothing else needs them.
- Removed Vite `allowedHosts: true` development-server wildcard; introduced `.gitignore` for keys/build outputs and `.env.example` with no real credentials.

## Measured validation
- `npm run check:offline` **PASS** (18/18 unit tests and bundled static audits).
- `npm run media:test` **PASS** (8/8 new media tests; also included in main suite).
- All 24 template configuration checks and 120,960 static combination permutations covered by inherited checks.
- `npm run audit:imports` **PASS**.
- TypeScript/TSX parse syntax **PASS** (90 source files; 0 parse errors).
- `npm run site:doctor` **PASS** (no site data issues).
- `npm run media:generate` without `--execute` **PASS dry-run**; no network or charges.
- `npm run media:promote -- --apply` **EXPECTED BLOCK** on current fictional demo with missing genuine merchant assets.
- `npm run media:audit -- --mode demo` **EXPECTED BLOCK** until real generated raster images exist.
- `npm install` **TIMEOUT in this environment** (no dependency installation verified).
- `tsc` **NOT VERIFIED** (local dependency type definitions missing).
- Production Vite build **NOT VERIFIED**, visual browser testing **NOT VERIFIED**, live Gemini paid image generation **NOT RUN**.

## Known constraints
- Each generative image request has real API costs, limits and potential rate/content failures; supported endpoint/model access must be tested with the user's Google credentials in a secure environment.
- Pure image generation does not supply accurate brand merchandise or authentic 360° 3D geometry.
- Raster-file headers, hashes and dimensions alone do not measure photographic realism, aesthetics or legal rights; final human visual and merchant checks are required.
- Old documentation is preserved for migration history; treat `docs/HYBRID_ASSET_WORKFLOWS.md` and `AI_STUDIO_HYBRID_MASTER_PROMPT.md` as authoritative for v6.3 media workflows.
