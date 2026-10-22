# Realistic 3D product assets — production pipeline

**Every product has independent `modelPath`, `imagePath`, title, price and URL fields.**
By default modelPath is null and the stage renders a clearly labeled abstract *concept*, NOT the real product.

1. Source a licensed/owned product model, preferably Blender -> GLB/glTF 2.0 with physically based materials.
2. Produce a low/medium poly optimized mobile variant when possible. Apply/pack textures and check normal maps, UVs and material metallic/roughness values.
3. Compress meshes/textures after validation (gltf-transform, meshopt and KTX2 are options, but require appropriate loader/config; the starter does not automatically decode KTX2).
4. Put the asset at `public/models/your-product.glb`; optional real product image under `public/images/your-product.webp`.
5. Create `store-products.json` by editing `examples/real-products.example.json`, with an entry PER product and matching `modelPath`.
6. Run `npm run site:new -- --template [id] --spec store-products.json`; then `npm run studio:audit` to ensure referenced files exist.
7. Preview all products: drag/zoom, focus, lighting, clipping, texture fidelity. Examine mobile GPU heat and performance.
8. Replace placeholder claims/price, configure **verified** real checkout/affiliate URLs, disclose affiliate relationships.

## Performance budget (targets, not automatic guarantees)
- Prefer compressed models where practical: <2–5 MB each for standard mobile product views; bigger hero models only if tested.
- Aim for textures <=2K on mobile unless high detail is essential; consider KTX2/Basis after verifying decoder path.
- Load per-product WebGL viewport only in modal, not as twelve canvases on the grid.
- Use device DPR caps, performance monitor, Bloom only for capable GPUs, and reduced-motion.
- Provide meaningful non-3D text and imagery on unsupported devices.

## Rights and truth
Respect brand/trademark rights, licensing, and photograph rights. Procedural concept demo meshes are generic visuals, not 3D replicas of actual consumer products.
