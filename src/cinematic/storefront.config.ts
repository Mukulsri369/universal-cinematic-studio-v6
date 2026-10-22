/** Change this file for your store. Provide a licensed GLB for truly detailed product realism. */
export type CinematicStoreConfig = {
  brand: string;
  product: string;
  edition: string;
  eyebrow: string;
  description: string;
  priceLabel: string;
  accent: string;
  productModelPath: string | null;
  checkoutUrl: string | null;
  features: Array<{ number: string; title: string; body: string }>;
};

export const storefront: CinematicStoreConfig = {
  brand: 'AURORA',
  product: 'Sound, sculpted.',
  edition: 'THE STUDIO ONE',
  eyebrow: 'DESIGNED FOR THE SENSES',
  description: 'An immersive, premium product launch experience. This demonstration uses a custom procedural 3D headphone; replace it with your own licensed, optimized GLB for photorealism.',
  priceLabel: 'From ₹14,999 · Demo pricing',
  accent: '#d9c5aa',
  productModelPath: null, // e.g. '/models/your-product.glb'; see docs/MODEL_PIPELINE.md
  checkoutUrl: null, // Must be your actual store URL; null disables purchase CTA
  features: [
    { number: '01', title: 'Made to feel different', body: 'A carefully lit interactive product with physically based materials and cinematic movement.' },
    { number: '02', title: 'Every angle matters', body: 'Scroll to explore subtle depth, glints and rotation. Drag the product to study the details.' },
    { number: '03', title: 'Crafted for performance', body: 'Lazy-loaded 3D, adaptive pixel ratio, graceful fallback, reduced-motion support.' },
  ],
};
