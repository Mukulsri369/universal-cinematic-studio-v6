/** Audit source and declared dependency coverage using built-in Node APIs.
 * Regex is a lightweight import scanner; full resolution is checked by TypeScript build in CI. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.cwd();
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const deps=new Set([...Object.keys(pkg.dependencies||{}),...Object.keys(pkg.devDependencies||{})]);
const source=[];
function crawl(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())crawl(f);else if(/\.(tsx?|jsx?|mjs)$/.test(e.name))source.push(f);}}
crawl('src');source.push('vite.config.ts');
const builtins=new Set(['node:url','node:fs','node:path','node:process','node:assert','node:child_process']);
const bad=[],externals=new Set(),localCount={count:0};
for(const f of source){
 const code=fs.readFileSync(f,'utf8');
 const reg=/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)(['"])([^'"\n]+)\1/g;
 let m;
 while((m=reg.exec(code))){
  const spec=m[2]; if(/\.(css|scss)$/.test(spec))continue;
  if(spec.startsWith('.')||spec.startsWith('@/')){
   const dest=spec.startsWith('@/')?path.join(root,'src',spec.slice(2)):path.resolve(path.dirname(f),spec);
   const opts=[dest,dest+'.ts',dest+'.tsx',dest+'.js',dest+'.jsx',dest+'.json',path.join(dest,'index.ts'),path.join(dest,'index.tsx')];
   if(!opts.some(x=>fs.existsSync(x)&&fs.statSync(x).isFile()))bad.push(`${f}: unresolved ${spec}`);
   else localCount.count++;
  }else if(!builtins.has(spec)&&!spec.startsWith('node:')){
   const pkgName=spec.startsWith('@')?spec.split('/').slice(0,2).join('/'):spec.split('/')[0];
   externals.add(pkgName);
   if(!deps.has(pkgName))bad.push(`${f}: undeclared npm dependency ${pkgName} (${spec})`);
  }
 }
}
if(bad.length){console.error(bad.join('\n'));process.exit(1);}
console.log(JSON.stringify({sourceFiles:source.length,resolvedLocalImports:localCount.count,externalPackages:[...externals].sort(),undeclaredPackages:0,missingLocalModules:0,note:'Static import scan only; does not install packages or run runtime rendering'},null,2));
