# AI Studio Integration & Release Gates — v6.1

This is a real-source React 19 / TypeScript / Vite starter. Google AI Studio Build mode can import GitHub projects and use npm dependencies, but it cannot guarantee that every public GitHub or CLI skill becomes a globally installed AI Studio tool. The starter must be imported into each project.

## Exact dependencies

**Runtime** (declared by `package.json`): React 19, ReactDOM 19, Three.js, @react-three/fiber 9, @react-three/drei 10, @react-three/postprocessing 3, postprocessing 6, GSAP 3, @gsap/react 2, Motion 12, Lenis 1, Lucide, Radix UI primitives, clsx, class-variance-authority and tailwind-merge.

**Build tools:** Node 22, npm, Vite 6, TypeScript 5.8, @vitejs/plugin-react 4, Tailwind CSS 4 / @tailwindcss/vite 4, and React / Three / Node type packages.

**Optional network tools (not bundled):** @21st-dev/cli, shadcn CLI, ui-ux-pro-max skill. These are opt-in installers and are not required for the built-in 75-export component catalog. Before using them, review source, license, versions, rate limits and compatibility. A CLI intended for Gemini CLI/VS Code may not install globally into the AI Studio web agent.

## Local or Codespace verification after GitHub upload

```
node --version                 # expect Node 22
npm install                    # requires functioning registry access
npm run check:offline          # 10 Node tests + config/import/combinatorial checks
npm run typecheck              # FULL TypeScript check (requires installed dependencies)
npm run build                  # real Vite production build
npm run dev                    # inspect in desktop and mobile browsers
```

`npm run check:offline` here covers **24 × 210 × 24 = 120,960 STATIC ordered module compositions**, verifies 24 dry-run template generators and validates missing/unsafe product configurations. It is **not** a browser/WebGL test, GPU/FPS measurement or full semantic typecheck. GitHub Actions reruns full checks in a network-enabled environment and uploads `dist` only if all checks pass. After an install succeeds, commit the generated `package-lock.json` for reproducible `npm ci` future runs.

## Google AI Studio Build mode

1. Open Build mode, click the **Add files (+)** control and select **Import from GitHub**, then choose the public repository and branch.
2. Ensure the imported root has `package.json`, `vite.config.ts`, `src`, `scripts`, `AGENTS.md`, `site-templates.json`, `composition-recipes.json`, `experience-presets.json`, and `component-manifest.json`.
3. First use `AI_STUDIO_VALIDATED_START_PROMPT.md`. Demand actual installation, source reuse, screenshot/mobile verification and a truthful final test report.
4. Request a brand, product category and specific UX. Examples: fashion lookbook, furniture material exploration, jewellery macro viewer, premium lighting, automotive configurator.
5. If the tool cannot execute terminal commands or capture actual rendering, its assistant MUST say that instead of claiming a successful build. Use GitHub Actions/Codespaces for an independent proof.

Official docs: https://ai.google.dev/gemini-api/docs/aistudio-build-mode

## Real product 3D assets

The starter ships procedural **concept models**, not authentic branded goods. For true 360-degree product likeness add licensed GLB files to `public/models/`, compressed PBR textures and optimized product photography. Populate real products using `examples/*.json` / `npm run site:auto`. Do not substitute an invented photograph/model and claim an accurate replica.

## Release blockers that remain outside this environment

- npm registry DNS in the ChatGPT container can fail (`EAI_AGAIN`): full install/typecheck/build unverified here.
- No actual WebGL/GPU browser run, accessibility test, mobile screenshots or FPS measurement was possible here.
- Design directions are editable templates/composition recipes, **not 24 individually production-validated bespoke sites**.
- Real checkout, payment integrations, product inventory and backend are out of scope unless implemented for the actual merchant site.
