import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const cfg=JSON.parse(fs.readFileSync(path.join(root,'src/studio/generated.site.json'),'utf8'));
const policy=JSON.parse(fs.readFileSync(path.join(root,'asset-budgets.json'),'utf8'));
const issues=[],warnings=[],report=[];
function check(pathname,kind,product){
  if(!pathname)return;
  if(typeof pathname!=='string'||!/^\/(models|images)\/[a-zA-Z0-9/_ .-]+$/.test(pathname)||pathname.includes('..')){issues.push(`${product}: unsafe ${kind} path`);return;}
  const file=path.join(root,'public',pathname.slice(1));
  if(!fs.existsSync(file)){issues.push(`${product}: missing ${pathname}`);return;}
  const bytes=fs.statSync(file).size;
  const budget=(kind==='model'?policy.glbPreferredMaxMiB:policy.imagePreferredMaxMiB)*1048576;
  if(bytes>budget)warnings.push(`${product}: ${kind} ${(bytes/1048576).toFixed(2)} MiB exceeds ${budget/1048576} MiB preferred budget`);
  let meshCount=null,vertices=null,textureCount=null;
  if(kind==='model'){
    const fd=fs.openSync(file,'r');try{
      const hdr=Buffer.alloc(20);fs.readSync(fd,hdr,0,20,0);
      if(hdr.toString('utf8',0,4)!=='glTF'||hdr.readUInt32LE(4)!==2||hdr.readUInt32LE(8)!==bytes){issues.push(`${product}: invalid GLB 2.0 header`);return;}
      const length=hdr.readUInt32LE(12), chunk=hdr.toString('utf8',16,20);
      if(chunk!=='JSON'||length>bytes-20||length>50*1048576){issues.push(`${product}: invalid GLB JSON chunk`);return;}
      const json=Buffer.alloc(length);fs.readSync(fd,json,0,length,20);const gltf=JSON.parse(json.toString('utf8'));
      meshCount=gltf.meshes?.length||0;textureCount=gltf.textures?.length||0;
      vertices=(gltf.meshes||[]).flatMap(m=>m.primitives||[]).reduce((n,p)=>n+(gltf.accessors?.[p.attributes?.POSITION]?.count||0),0);
      if(vertices>policy.preferredMaxVertices)warnings.push(`${product}: ${vertices} vertices exceeds ${policy.preferredMaxVertices} preferred mobile budget`);
      if(textureCount>policy.preferredMaxTextures)warnings.push(`${product}: ${textureCount} textures exceeds preferred budget`);
    }catch(e){issues.push(`${product}: GLB parse failed (${e.message})`);}finally{fs.closeSync(fd);}
  }
  report.push({product,kind,path:pathname,bytes,meshCount,vertices,textureCount});
}
for(const product of cfg.products){check(product.modelPath,'model',product.id);check(product.imagePath,'image',product.id);}
console.log(JSON.stringify({products:cfg.products.length,assets:report,errors:issues,warnings,policy},null,2));
if(issues.length)process.exitCode=1;
