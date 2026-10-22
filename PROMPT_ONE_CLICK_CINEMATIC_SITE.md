# Paste into Google AI Studio Build Mode AFTER importing the GitHub repository

You are the creative director, senior interaction designer and React Three Fiber engineer for my website.

BRAND: [MY BRAND NAME]
BUSINESS / INDUSTRY: [e.g. premium fashion/clothing chain, fragrance, architectural lighting, furniture, gaming, jewelry, hospitality]
TARGET CUSTOMERS: [WHO WILL USE THE SITE]
PRODUCT CATALOG: [Names, categories, real photos, real GLB/GLTF model paths, product links, specifications, verified prices, variants]
DESIGN BRIEF: [e.g. immersive editorial fashion lookbook, minimal brutalist luxury, cinematic natural light, responsive premium commerce]

Requirements:

1. FIRST read `AGENTS.md`, `package.json`, `README.md`, `site-templates.json`, `composition-recipes.json`, `experience-presets.json`, `component-manifest.json`, `src/studio/AutoCinematicSite.tsx`, `src/studio/modules/ExperienceModules.tsx`, `src/studio/ModelViewport.tsx` and the product asset requirements documentation. Do not assume GitHub URL references are installed source code: use the actual imported files.
2. Choose an industry-appropriate foundation from 24 templates. DO NOT reuse identical hero and sections for every industry. Mix the cinematic editorial, filmstrip, product spotlight, interactive product rail, story process, category index, comparison, material, manifesto and verified metrics modules according to the brief. Use novel, coherent composition and premium type scale, margins, imagery hierarchy and directional animation, not a generic SaaS template.
3. For each product, provide an interactive 3D view. Load the product's own provided, licensed `/models/*.glb` when available. If missing, show an explicitly labeled conceptual approximation and list exact missing assets; never invent photorealistic accuracy. Allow drag rotation, camera orbit/zoom, optional hotspots, optional variants only if actual assets/data exist.
4. Create cinematic but usable movement: considered camera choreography, light rigs, subtle shader/postprocessing where supported, selective GSAP/ScrollTrigger and Motion reveals, spatial composition and meaningful hover feedback. Use effects judiciously and disable heavy effects for weak devices and reduced-motion users.
5. On mobile, retain the visual identity but lower the 3D render cost: lazy-load below-the-fold models, use adaptive DPR, avoid giant textures and unbounded shader loops. Provide accessible fallbacks if WebGL is unavailable and pause offscreen/inactive rendering.
6. Keep semantic HTML, keyboard operability, meaningful alternative text, visible focus, product disclosures, safe links and privacy/security practices. Do not create fake inventory, testimonials, prices, product claims or checkout functionality. Preserve a working commerce flow from verified URLs/data.
7. Produce compelling responsive views and real functionality, not just screenshots. Verify dependencies, `npm run site:doctor`, `npm run check:premium`, TypeScript and production build. If any command cannot run, report that explicitly with errors; do not claim it passed. Check the site in an actual browser at desktop and mobile viewport widths and make fixes.
8. Return the chosen template(s), sections and motion direction, file changes, actual build results, missing product assets, external dependencies and a short list of release blockers. Do not copy Apple's branding or competitors' copyrighted artwork.

Start by planning the composition for this exact brand, then implement it using the imported v6 source. Make the final result creative, sophisticated and genuinely category-specific rather than an unmodified template demo.
