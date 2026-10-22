import {existsSync,readFileSync} from 'node:fs';import {join,dirname,resolve} from 'node:path';
const base=process.cwd();const manifest=JSON.parse(readFileSync(join(base,'component-manifest.json'),'utf8'));const registry=JSON.parse(readFileSync(join(base,'component-registry.json'),'utf8'));const pkg=JSON.parse(readFileSync(join(base,'package.json'),'utf8'));
const errors=[];const required=['src/App.tsx','src/components/ComponentShowcase.tsx','src/styles.css','components.json','AGENTS.md','AI_STUDIO_STARTER_PROMPT.md','docs/AI_STUDIO_BUILD_MODE.md','.github/workflows/ci.yml','scripts/21st.mjs'];
for(const f of required)if(!existsSync(join(base,f)))errors.push(`Missing mandatory file: ${f}`);
for(const c of manifest.components){const full=join(base,c.source);if(!existsSync(full))errors.push(`Missing component: ${c.source}`);if(!c.source.startsWith('src/components/')&&!c.source.startsWith('src/studio/')&&!c.source.startsWith('src/motion/'))errors.push(`Unexpected component path: ${c.source}`)}
for(const x of registry.entries??[])if(x.example&&!existsSync(join(base,x.example)))errors.push(`Missing example for ${x.name}: ${x.example}`);
for(const pkgName of ['react','react-dom','motion','gsap','three','@react-three/fiber','@react-three/drei','lucide-react','lenis'])if(!pkg.dependencies?.[pkgName])errors.push(`Missing npm declaration: ${pkgName}`);
// Check @/ imports to ensure every internal path exists (without npm installation).
const scan=[join(base,'src/App.tsx'),join(base,'src/components/ComponentShowcase.tsx'),...manifest.components.map(x=>join(base,x.source))];
for(const file of scan){if(!existsSync(file))continue;const body=readFileSync(file,'utf8');for(const m of body.matchAll(/(?:from\s+|import\s*\(|import\s*)['"](@\/[^'"]+)['"]/g)){const rel=m[1].slice(2);const f=resolve(base,'src',rel);if(![f,f+'.ts',f+'.tsx',join(f,'index.ts'),join(f,'index.tsx')].some(existsSync))errors.push(`Unresolved internal import in ${file.replace(base+'/','')}: ${m[1]}`)}}
console.log(`${manifest.components.length} component export entries, ${registry.entries?.length??0} upstream entries, npm installed: ${existsSync(join(base,'node_modules'))?'yes':'no'}.`);
if(errors.length){for(const e of errors)console.error('ERROR',e);process.exit(1)}console.log('Source path verification passed. This does not substitute for npm install + typecheck + build.');
