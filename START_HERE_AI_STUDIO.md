# Start Here: Universal Cinematic Studio v6

**Your goal:** Ask Google AI Studio for a cinematic fashion brand, luxury product, technology launch or any other compatible premium website, then get an original, modular React + interactive 3D foundation from actual code.

## Prepare your GitHub repository

Extract `Universal_Cinematic_Studio_v6_COMPLETE.zip`. Upload its **contents**, not the `.zip` file and not an extra enclosing folder, to your repository root. Commit the changes yourself. This artifact has **not** been uploaded by ChatGPT.

The root should contain `package.json`, `src/`, `scripts/`, `docs/`, `site-templates.json`, `composition-recipes.json`, `experience-presets.json`, `component-manifest.json`, `AGENTS.md` and `PROMPT_ONE_CLICK_CINEMATIC_SITE.md`.

## Import into Google AI Studio

Build Mode → Add files (+) → Import from GitHub → select your repo. Confirm the Code tab contains `src/studio`, `src/studio/modules`, templates and `package.json`. Then paste the prompt in `PROMPT_ONE_CLICK_CINEMATIC_SITE.md`, specifying the brand, industry, products and design direction.

## Exact CLI commands when available

```bash
npm install
npm run site:list
npm run site:director -- --brief "luxury streetwear clothing chain with a cinematic editorial lookbook and 3D product detail"
npm run site:auto -- --brand "MY BRAND" --brief "luxury streetwear clothing chain with a cinematic editorial lookbook and 3D product detail" --dry-run
npm run site:auto -- --brand "MY BRAND" --brief "luxury streetwear clothing chain with a cinematic editorial lookbook and 3D product detail"
npm run dev
npm run check:premium
```

Different products may require separate GLB models for correct 360-degree presentation. Until supplied, placeholder concept geometry is explicitly marked and must not be marketed as accurate product imagery. Deliver performance, accessibility and commerce behavior, not visuals alone.

**Quality gate:** A successful source audit alone is insufficient. Treat npm install, TS build, browser rendering, desktop/mobile FPS, keyboard navigation, reduced-motion, color contrast, metadata/SEO and payment/affiliate link verification as release blockers until tested.
