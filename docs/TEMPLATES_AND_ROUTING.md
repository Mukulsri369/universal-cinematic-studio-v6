# Template router / production design brief

Use a distinct visual composition and motion language for each template; do not clone competitors.
Each template below has its own palette, layout, typographic treatment and 3D concept fallback.
`site-templates.json` is the authoritative template registry; each selection generates `src/studio/generated.site.json`.

| Customer prompt / niche | Template ID | Design intent |
| --- | --- | --- |
| Luxury single product, premium lifestyle, cosmetics | `luxury-product` | Sculptural product reveal, restrained material focus |
| Architectural lamps, light fixtures, interior lighting | `lighting-studio` | Studio lighting, warm edge light, spatial gallery |
| Jewelry, watch, fine accessories | `jewelry-atelier` | Macro impression, gems and metallic stage |
| Cars, bikes, performance hardware | `automotive-motion` | Wide-screen reveal, technical choreography |
| Fashion brand, streetwear, apparel | `fashion-runway` | Bold editorial runway motion |
| Astronomy, planetarium, science educational | `cosmic-experience` | Celestial motion, starfield/spatial storytelling |
| Influencer-curated affiliate / product finds | `creator-commerce` | Conversion-first but immersive product discovery |
| Hardware tech, headphones, mobile accessories | `tech-launch` | Futuristic stage, tactile interactions |
| Architecture firms, furniture, interiors | `architecture-gallery` | Calm material gallery and geometry |
| Wellness, cosmetics, spa, organic | `wellness-organic` | Soft natural palette, controlled animation |
| Creative SaaS, agencies, startups | `saas-interactive` | Kinetic product explainers, clear hierarchy |
| Artists, museums, immersive exhibits | `art-exhibition` | Experimental spatial editorial direction |

### AI route selection
1. Infer store category and audience from the user request.
2. Inspect `site-templates.json` and choose ONE strong starting composition.
3. Run `npm run site:new -- --template [id] --brand "[brand]"` or update generated JSON, preserving schema and product fields.
4. Make meaningful creative modifications while keeping 3D viewer, accessible DOM text, and responsive tests.
5. Avoid reusing the same dark gradient, copy, or animations across every template.
6. Preserve existing modules under `src/components`, `src/cinematic`, `src/templates`; reuse by import, don't erase.

### Inspirations studied (patterns, not source copied)
Awwwards and Three.js award-winning web practices favor purposeful storytelling, controlled WebGL, GSAP camera/scroll choreography, strong typographic hierarchy and mobile optimization. Borrow principles only; do not copy proprietary artwork, layouts, logos, fonts, or assets.

### What the package DOES NOT DO
It does not automatically install itself into all future AI Studio projects. Import this source for each project (or fork/duplicate the configured project). It does not scrape arbitrary sites for models and cannot guarantee photorealistic copies of real products without owned/licensed models.
