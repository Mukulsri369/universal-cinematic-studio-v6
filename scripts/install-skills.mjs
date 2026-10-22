#!/usr/bin/env node
/** Intentional manual opt-in: installs third-party agent skill(s) when an environment has network access. */
import {spawnSync} from 'node:child_process';
const choice=process.argv[2];if(!['gemini','universal','21st'].includes(choice)){console.log('Usage: node scripts/install-skills.mjs gemini|universal|21st');process.exit(2)}
const command=process.platform==='win32'?'npx.cmd':'npx';const args=choice==='21st'?['-y','@21st-dev/cli','skills','install']:['-y','ui-ux-pro-max-cli','init','--ai',choice];
console.log(`Running npx ${args.join(' ')}. Requires network and may prompt for confirmation.`);
const result=spawnSync(command,args,{stdio:'inherit',shell:false});process.exit(result.status??1);
