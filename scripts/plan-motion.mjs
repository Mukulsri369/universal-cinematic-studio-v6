import fs from 'node:fs';
const all=JSON.parse(fs.readFileSync('motion-blueprints.json','utf8')).templates;
const idx=process.argv.indexOf('--template');const template=idx>=0?process.argv[idx+1]:null;
if(!template){console.log(all.map(x=>x.template).join('\n'));process.exit(0);}
const plan=all.find(x=>x.template===template);
if(!plan){console.error('Unknown template: '+template);process.exit(1);}
console.log(JSON.stringify({requested:template,plan,requirements:['Provide rights-cleared photo assets before visual QA','Only enable real 3D after .glb supplied','Test on mobile + reduced-motion mode','Do not imply technical verification equals photorealistic visuals']},null,2));
