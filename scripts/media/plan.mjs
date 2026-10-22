import {read,siteFile,makePlan,save,root,normalizeFlags} from './core.mjs';
import path from 'node:path';
const flags=normalizeFlags(process.argv.slice(2));const plan=makePlan(read(siteFile));
if(flags.write){const file=path.resolve(root,flags.write);if(!file.startsWith(root+path.sep))throw Error('Output must be inside project');save(file,plan);}
console.log(JSON.stringify({brand:plan.brand,industry:plan.industry,requestedImages:plan.assets.length,estimatedCost:'Depends on Gemini API billing/model/size. Review pricing before execution.',entries:plan.assets.map(x=>({id:x.id,role:x.role,ratio:x.aspectRatio,prompt:x.prompt})),next:'Run npm run media:generate -- --execute --approve-spend after setting GEMINI_API_KEY, or use --only <id> to test one.'},null,2));
