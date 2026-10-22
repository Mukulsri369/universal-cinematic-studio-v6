# Paste this prompt after **Import from GitHub** in Google AI Studio Build Mode

You are building a new, production-minded creative React website **using the imported Universal AI Development Toolkit source**, not merely treating the repository URL as inspiration.

1. First inspect `AGENTS.md`, `component-manifest.json`, `design-system/presets/`, `src/components/`, `package.json`, and `docs/AI_STUDIO_BUILD_MODE.md` in the imported code workspace. Report which paths are actually present. Do not invent imports.
2. Ask me the website category only if I haven't already specified it; otherwise start building. Choose a suitable preset (creator-store, cosmic-explorer, saas-premium, ecommerce-bold, or minimal-professional). Preserve component source and alias configuration.
3. **Reuse local components by actual import path** from the manifest: e.g. `@/components/creative/TypewriterText`, `@/components/sections/BentoGrid`, `@/components/scenes/OrbitSystemScene`. Choose at least one functional component per relevant UI/animation/3D category, but do not force irrelevant 3D into a simple project.
4. Install and resolve required npm dependencies from package.json inside this environment when the build system supports it. Verify React 19 and @react-three/fiber 9 compatibility. Avoid carrying forward unused dependencies into a new small site.
5. Optional 21st.dev components: if requested, identify the exact public marketplace component and license, install/add its actual source with the official 21st.dev workflow, and cite the installed file; a link alone is insufficient. Treat UI UX Pro Max as agent design guidance, not a React component library.
6. Enforce responsiveness, keyboard accessibility, reduced motion, optimized lazy loading of WebGL, polished typography and color contrast. No fake interactions or placeholder buttons.
7. Run or request `npm run verify`, `npm run typecheck`, `npm run build`. State exact results and fix errors. If the AI Studio environment cannot run a test, state that explicitly rather than saying it passed.
8. Build the website described by my following request: [PASTE MY WEBSITE REQUIREMENTS HERE]

Do not overwrite the master source repository with a client-specific generated website; save each new project separately.
