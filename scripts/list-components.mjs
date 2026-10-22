import {readFileSync} from 'node:fs';
const manifest=JSON.parse(readFileSync(new URL('../component-manifest.json',import.meta.url),'utf8'));
for(const x of manifest.components)console.log(`${x.category.padEnd(12)} ${x.name.padEnd(28)} ${x.source}`)
console.log(`\nTotal source components: ${manifest.components.length}`);
