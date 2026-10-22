#!/usr/bin/env node
// Network-enabled Node 22 environment only. Optional command for installing and validating all declared runtime packages.
import {spawnSync} from 'node:child_process';
const npm=process.platform==='win32'?'npm.cmd':'npm';
for(const args of [['install','--no-audit','--no-fund'],['run','verify'],['run','typecheck'],['run','build']]){
console.log(`> npm ${args.join(' ')}`);const result=spawnSync(npm,args,{stdio:'inherit',shell:false});if(result.error){console.error(result.error);process.exit(1)}if(result.status!==0)process.exit(result.status??1)
}
console.log('Runtime packages installed; source verification, TypeScript and production build passed in THIS environment.');
