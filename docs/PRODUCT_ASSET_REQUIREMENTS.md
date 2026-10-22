# Product 3D & image assets

## Input contract

For each product in `src/studio/generated.site.json` specify a stable `id`, `name`, `modelPath` like `/models/watch.glb`, optional `imagePath` like `/images/watch.avif`, `price`, `currency`, real `purchaseUrl` and optional `hotspots` (id/label/description/3D position). The paths must resolve to owned or appropriately licensed files under `public/models` or `public/images`. The ZIP bundles **no actual products or photoreal models**.

Example product (not an actual listing):
```json
{
 "id":"watch-001", "name":"Your watch model", "concept":"watch", "modelPath":null,
 "imagePath":null, "price":null, "currency":"INR", "purchaseUrl":null,
 "hotspots":[{"id":"dial","label":"Dial","description":"Replace with a verified claim","position":[0,0.4,0.5]}]
}
```

Replace the null model path only with a valid real GLB. A conceptual scene is not a photoreal replica of a listed item. When exact likeness matters, commission product photography/3D scanning/modelling.

## Pipeline

1. Obtain a rights-cleared source `.blend`, CAD or scan; validate copyright and trademark approvals.
2. Normalize transforms, scale, orientation and metallic/roughness workflow in Blender.
3. Export GLB 2.0 with sensible mesh/object names and physically based materials.
4. Simplify geometry, bake details/textures, convert textures to web-friendly sizes. Optionally compress geometry (Draco or Meshopt) and textures (KTX2) with supported decoders installed and tested; compression is not automatic.
5. Provide a photo or AVIF/WebP poster fallback. Asset audit flags size and geometry budget warnings.
6. Test camera, OrbitControls, mobile FPS, colors, reduced motion and materials on real devices.

Use `npm run assets:audit` to check referenced local files and inspect GLB header/metadata. This checks structure only, not visual similarity or license.
