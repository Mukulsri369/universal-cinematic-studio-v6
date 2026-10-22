#!/usr/bin/env node
/** Safe helper for the upstream 21st.dev CLI. Does not install marketplace code by itself. */
import { spawnSync } from 'node:child_process';
const [action,...args]=process.argv.slice(2);
if(!['search','add'].includes(action) || !args.length){console.error('Usage: npm run 21st:search -- "pricing table"  OR  npm run 21st:add -- author/slug');process.exit(2);}
if(action==='add' && (!/^(?:@?[A-Za-z0-9_-]+)\/[A-Za-z0-9_-]+$/.test(args[0]) || args.length!==1)){
 console.error('Use a validated author/slug selected from 21st.dev search.');process.exit(2);
}
const command=process.platform==='win32'?'npx.cmd':'npx';
const result=spawnSync(command,['-y','@21st-dev/cli',action,...args],{stdio:'inherit',shell:false});
if(result.error){console.error(result.error.message);process.exit(1);}process.exit(result.status??1);
