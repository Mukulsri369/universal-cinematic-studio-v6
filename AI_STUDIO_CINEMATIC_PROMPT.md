# Universal Cinematic Studio v5 — use in Google AI Studio Build Mode

**Import:** Upload the extracted contents of the COMPLETE ZIP to your GitHub repository root, then AI Studio Build Mode → (+) Add files → Import from GitHub. Import is per project, **not a global permanent plugin**.

**Starter prompt** (paste after import):

> Create an original, world-class cinematic 3D site for my brand **[BRAND]** in the **[INDUSTRY]** category. Study `AGENTS.md`, `site-templates.json`, `experience-presets.json`, `docs/PREMIUM_EXPERIENCE_PLAYBOOK.md` and actual local source. Choose a suitable experience preset, then creatively compose new sections from installed source rather than copying a competitor. Use the existing React 19 / React Three Fiber 9 / Drei / GSAP / Motion components. Include cinematic camera paths, studio lighting, original shader atmosphere, stunning product storytelling, accessible motion, fast mobile fallbacks, and a 3D viewer for every product. If I supply licensed GLB models under `/public/models`, use them; otherwise label conceptual placeholders and tell me the missing assets. Never fabricate my product pricing, inventory, URL, awards or claims. Install npm dependencies, run `npm run check:premium`, repair errors, and show the rendered desktop and mobile preview.

**Optional deterministic local commands** (Node.js 22 + network):

```bash
npm install
npm run site:brief -- --brief "premium fashion brand with modern ethnic clothing"
npm run site:new -- --template fashion-runway --brand "YOUR BRAND" --category fashion
npm run assets:audit
npm run check:premium
npm run dev
```

**Reality check:** A prompt is not a guarantee of professional design. 3D accuracy needs real models and human review. The ZIP's source was checked without an actual npm install and browser build in this environment.
