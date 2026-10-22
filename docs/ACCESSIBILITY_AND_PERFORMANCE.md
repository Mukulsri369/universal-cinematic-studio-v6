# Production gates

**Do not publish solely based on source syntax checks.** Benchmark with Chrome Lighthouse, Web Vitals and assistive technology.

- LCP goal: <=2.5 seconds; INP <=200 ms; CLS <=0.1 (thresholds, not measured results).
- Hero 3D should use poster fallback before viewport and on devices without WebGL. For mobile, reduce DPR and disable expensive postprocessing.
- Defer non-critical models, avoid running multiple large WebGL canvases simultaneously, and unload unused textures/materials.
- Respect `prefers-reduced-motion`, visible focus styles, semantic landmarks and product image alt text.
- Keyboard navigation: dialog Esc, arrow previous/next, correct focus restoration and focus trap before production. Existing modal restores body scrolling but **focus trap and focus-return still require manual verification**.
- Real commerce: accurate stock, price, affiliate disclosure, checkout, refund/shipping policy, privacy policy, and support contacts.
- Define performance budgets in `asset-budgets.json`; run `npm run assets:audit` after adding GLB/images.
- Test: mobile Safari/Chrome, Android mid-range, desktop GPU and low-power mode. Do not substitute screenshots for true 3D models.
