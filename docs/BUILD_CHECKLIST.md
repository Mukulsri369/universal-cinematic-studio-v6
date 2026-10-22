# Release / AI Studio quality gates

1. Verify all source assets and template registry: `npm run verify && npm run cinematic:audit && npm run studio:audit`.
2. `npm install` in a network-enabled Node 22 environment.
3. `npm run typecheck` and `npm run build`. Repair errors before claiming readiness.
4. Open default storefront in browser, including `/?view=toolkit` and `/?view=classic`.
5. Test at 360, 768, 1440px. Verify text/CTA contrast, no layout overflow, no trapped scroll.
6. Open and close every product dialog with keyboard, rotate/zoom in WebGL, verify GLB lighting/scale and browser console.
7. Set reduced-motion and verify CSS, hero and 3D fallback; test WebGL-disabled browser if possible.
8. Check model/image loading, mobile thermal and frame consistency, actual prices and external checkout links.
9. Run Lighthouse/Web Vitals on production build; measure, do not assume targets.
10. Check design originality, accessibility, and component licenses.

> A source audit or successful ZIP extraction is NOT proof the full app builds or renders correctly.
