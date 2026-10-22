# Universal AI Development Toolkit — Expanded

A reusable, **source-ready** React 19 / TypeScript / Vite / Tailwind 4 website toolkit built around your chosen design/animation/3D integrations. It includes working local UI components, creative components, full-page sections, 3D scene starters, theme presets, a component manifest, GitHub Actions and detailed AI Studio instructions.

**Start here:** `docs/AI_STUDIO_BUILD_MODE.md` + `AI_STUDIO_STARTER_PROMPT.md`.

## What's actually included
- **Local editable source:** all files in `src/components/ui/`, `creative/`, `sections/`, `scenes/`; see `component-manifest.json` for exact paths and counts.
- **Dependencies declared:** Motion, GSAP, Three.js, React Three Fiber, Drei, Lenis, Lucide React, Radix/shadcn-compatible tools, Tailwind.
- **Page templates:** affiliate storefront, cosmic learning landing page, and SaaS marketing page (`src/templates/`).
 - **Design:** five self-authored design system preset JSONs, AGENTS.md, accessible/reduced-motion-minded examples.
- **Automation:** source-path verifier, component lister, optional install helper, GitHub Actions workflow.
- **21st.dev:** official marketplace search/add commands and workflow, **not the entire community marketplace source**.
- **UI UX Pro Max:** official CLI installation workflow for supported agents, **not the full upstream skill/data bundled locally**.

## Run / validate (requires network-accessible Node 22)
```bash
npm install
npm run verify
npm run typecheck
npm run build
npm run dev
```
You may use `npm run catalog` to list source component paths. The included GitHub Actions CI will run checks on push when workflows are enabled.

## AI Studio integration
Google AI Studio Build Mode **supports importing existing code from GitHub**: use the **+ Add files → Import from GitHub** menu, select this repository, then paste `AI_STUDIO_STARTER_PROMPT.md` in Build Mode chat. Confirm actual imported code in the Code tab; a plain GitHub URL in a prompt is not sufficient. Official documentation: https://ai.google.dev/gemini-api/docs/aistudio-build-mode

## GitHub upload instructions
Extract this ZIP. **Upload the CONTENTS of the top-level `universal-ai-development-toolkit/` folder to the root** of the repository. `package.json`, `src/`, `docs/`, `scripts/`, `design-system/`, `component-manifest.json`, `.github/` should all be at root. If using GitHub's web uploader, drag folders onto the upload area (the standard file picker may skip directories/dotfolders). `docs/GITHUB_UPLOAD.md` has safer command-line and browser options.

## Important limitations and licensing
The source files are prepared, but the creation environment cannot contact npmjs.org (`EAI_AGAIN`), so runtime installation and build **cannot be claimed as passed** here. `npm run verify` only checks local paths. **Do not assume copied third-party marketplace assets are included**. Only generated original starter components are bundled, external packages are resolved via npm, and any future upstream component code remains under its own license. No secrets or credentials are needed for the included project.

Upstream references and their links are documented in `docs/INTEGRATIONS.md`.
