import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {routeBrief} from './brief-router.mjs';
import {directExperience} from './creative-director.mjs';
const argv=process.argv.slice(2),opts={};
for(let i=0;i<argv.length;i++){
 if(!argv[i].startsWith('--')){console.error('Expected --flag value');process.exit(2);}
 const flag=argv[i].slice(2);if(flag==='dry-run')opts[flag]=true;
 else if(['brand','brief','spec','accent'].includes(flag))opts[flag]=argv[++i];
 else {console.error('Unknown flag:',flag);process.exit(2);}
}
if(!opts.brief||!opts.brand){console.error('Usage: npm run site:auto -- --brand "MY BRAND" --brief "premium fashion shoes" [--spec examples/products.json] [--dry-run]');process.exit(2);}
const decision=routeBrief(opts.brief);
const composition=directExperience(opts.brief,decision.templateId);
const script=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'new-site.mjs');
const args=[script,'--template',decision.templateId,'--brand',opts.brand,'--modules',composition.modules.join(',')];
if(opts.spec)args.push('--spec',opts.spec);
if(opts.accent)args.push('--accent',opts.accent);
if(opts['dry-run'])args.push('--dry-run');
console.log('Selected modules:',composition.modules.join(', '));
console.log('Selected experience:',decision.templateId,'(confidence:',decision.confidence+')');
if(decision.confidence==='low')console.warn('Low-confidence industry routing; inspect selected template.');
const result=spawnSync(process.execPath,args,{stdio:'inherit'});
if(result.error)throw result.error;
process.exitCode=result.status??1;
