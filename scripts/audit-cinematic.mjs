import fs from 'node:fs';
const required = [
 'src/cinematic/CinematicStorefront.tsx','src/cinematic/CinematicStage.tsx',
 'src/cinematic/StudioHeadphones.tsx','src/cinematic/storefront.config.ts',
 'src/cinematic/cinematic.css','AI_STUDIO_CINEMATIC_PROMPT.md',
 'docs/MODEL_PIPELINE.md','docs/QUALITY_GATES.md','docs/AI_STUDIO_CINEMATIC_WORKFLOW.md'
];
const missing=required.filter(f=>!fs.existsSync(f));
const p=JSON.parse(fs.readFileSync('package.json','utf8'));
const need=['react','react-dom','three','@react-three/fiber','@react-three/drei','@react-three/postprocessing','postprocessing','gsap','motion','lenis'];
const undelcared=need.filter(n=>!p.dependencies?.[n]);
if(missing.length||undelcared.length){console.error({missing,undelcared});process.exit(1)}
console.log(`Cinematic source audit passed: ${required.length} required files + ${need.length} declared dependencies.`);
console.log('This is a source/manifest audit, NOT a runtime build or visual test.');
