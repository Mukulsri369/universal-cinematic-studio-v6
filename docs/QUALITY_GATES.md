# Production quality gates

- Build: `npm install && npm run check` must pass online. No lockfile is provided: commit one after the first verified install.
- Runtime preview: open root cinematic store and `?view=toolkit`; confirm hero, product canvas, scrolling choreography, keyboard focus and CTA.
- Visual reviews: screenshots at ~360, 768, 1440 px; test scroll on actual touch devices.
- 3D: use glTF for product-specific realism; inspect PBR materials, correct reflections, model orientation, 60fps goal for typical desktop, aim for 30fps+ on mid-tier mobile; these are goals, not verified measurements.
- Accessibility: skip link, prefers-reduced-motion, keyboard nav, readable text, no obstructive transitions, static fallback if WebGL unavailable.
- Safety: never hardcode API keys, do not invent checkout URLs, use licensed assets, inspect 21st.dev components before importing.
- Engineering: do not claim 'Apple quality', build/production readiness or guaranteed performance until real devices and browser tests confirm it.
- Source checks alone are not sufficient to claim a working npm build.
