/** Reinitialize fictional demo metadata for a NEW brand brief; does not delete any media files. */
import {read,save,siteFile,visualFile,modeFile,normalizeFlags} from './core.mjs';
const f=normalizeFlags(process.argv.slice(2));const mode=read(modeFile);
if(mode.presentationMode==='commercial-verified')throw Error('Commercial project cannot be reset to fictional demo in place. Clone workspace first.');
const site=read(siteFile);
if(!f.apply){console.log(JSON.stringify({status:'DRY_RUN',brand:site.brand,products:site.products.map(x=>x.id),notice:'Run npm run media:reset -- --apply to reset demo manifest and clear old demo media references, without deleting any files.'},null,2));process.exit(0);}
site.assetMode='fictional-demo';site.heroImagePath=null;site.materialImages=[];
for(const p of site.products){if(!p.imagePath||p.imagePath.startsWith('/images/demo/')||p.imagePath.endsWith('.svg'))p.imagePath=null;if(p.modelPath&&!p.modelPath.startsWith('/models/merchant/'))p.modelPath=null;}
const manifest={schemaVersion:2,mode:'fictional-demo',siteBrand:site.brand,hero:{path:null,source:'pending',rightsStatus:'pending'},products:site.products.map(p=>({productId:p.id,path:null,source:'pending',rightsStatus:'pending',model3DPath:p.modelPath||null})),editorials:[]};
mode.presentationMode='fictional-demo';mode.visualReadiness='BLOCKED_UNTIL_DEMO_PHOTOS_GENERATED_AND_REVIEWED';mode.assetProvision={imageGenerationEnabled:false,assetsAvailable:false,imageGenerationProvider:'Opt-in Gemini image API CLI'};
save(siteFile,site);save(visualFile,manifest);save(modeFile,mode);
console.log(JSON.stringify({status:'DEMO_MANIFEST_RESET',brand:site.brand,products:site.products.length,deletedFiles:0,next:'npm run media:plan'}));
