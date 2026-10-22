import {read,save,siteFile,modeFile,normalizeFlags} from './core.mjs';
import {auditFromDisk} from './audit.mjs';
const f=normalizeFlags(process.argv.slice(2));
const result=auditFromDisk('commercial',Boolean(f['require-3d-all']));console.log(JSON.stringify(result,null,2));
if(result.errors.length){console.error('Commercial launch blocked: correct asset issues before promotion');process.exit(1);}
if(!f.apply){console.log('DRY RUN: use --apply to promote after manual visual and rights review');process.exit(0);}
const quality=read(modeFile);quality.presentationMode='commercial-verified';quality.visualReadiness='TECHNICAL_ASSET_GATE_PASSED_HUMAN_RIGHTS_AND_VISUAL_REVIEW_REQUIRED';quality.assetProvision={imageGenerationEnabled:false,assetsAvailable:true,imageGenerationProvider:'disabled in commercial mode'};save(modeFile,quality);
const site=read(siteFile);site.assetMode='commercial-verified';save(siteFile,site);
console.log('Commercial mode enabled; user retains responsibility to check truth of products, licenses, prices, and shipping.');
