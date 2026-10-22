import plans from '../../motion-blueprints.json';
import {KineticHeadline} from './KineticHeadline';
import {MaskedImageReveal} from './MaskedImageReveal';
import {PinnedHorizontalGallery} from './PinnedHorizontalGallery';
import {CursorPreviewList} from './CursorPreviewList';
import {StickyChapterStory} from './StickyChapterStory';
import {ScrollVideoJourney} from './ScrollVideoJourney';
import {ScrollFrameSequence} from './ScrollFrameSequence';
import {CinematicScrollWorld,type CameraBeat} from './CinematicScrollWorld';
import './motion.css';

export type MotionMedia={id:string;src:string;alt:string;title:string;description?:string;href?:string};
export type MotionSiteProps={brand:string;headline:string;summary:string;template:string;photos:MotionMedia[];modelPath?:string;modelPoster?:string;cameraBeats?:CameraBeat[];videoPath?:string;videoPoster?:string;frames?:string[]};
/** A usable composer for imported AI Studio projects: it MUST have photos before presenting a public landing page. */
export function AutoMotionExperience({brand,headline,summary,template,photos,modelPath,modelPoster,cameraBeats,videoPath,videoPoster,frames}:MotionSiteProps){
 const plan=plans.templates.find(x=>x.template===template);
 const legitimate=photos.filter(x=>x.src.trim()&&x.alt.trim());
 if(!plan||!legitimate.length){
  return <main className="cm-auto-missing" role="status"><h1>Visual assets are required</h1>
   <p>{!plan?`Unknown industry template: ${template}`:`${brand} needs at least one approved photograph with descriptive alt text. The toolkit will not substitute cartoons or gradients for real merchandise.`}</p>
   <p>Generate explicitly fictional demo campaign media with consent, or import supplier-approved commercial images before continuing.</p>
  </main>;
 }
 const hero=legitimate[0];const other=legitimate.slice(1);
 const contains=(id:string)=>plan.components.includes(id);
 const can3D=!!modelPath&&!!modelPoster&&!!cameraBeats&&cameraBeats.length>=2;
 return <main className="cm-auto-site" data-cinematic-template={template}>
  <header className="cm-auto-nav"><a href="#cm-auto-home">{brand}</a><a href="#cm-auto-collection">Explore collection ↗</a></header>
  <section className="cm-auto-hero" id="cm-auto-home">
   <div className="cm-auto-hero-copy"><span>{plan.category} / CAMPAIGN</span><KineticHeadline as="h1" text={headline}/><p>{summary}</p><a href="#cm-auto-collection">Discover the story ↘</a></div>
   <MaskedImageReveal src={hero.src} alt={hero.alt} ratio="4 / 5" priority/>
  </section>
  {contains('scrollvideojourney')&&videoPath&&<ScrollVideoJourney src={videoPath} poster={videoPoster||hero.src} caption={headline}/>}
  {contains('scrollframesequence')&&frames&&frames.length>1&&<ScrollFrameSequence frames={frames} alt={`${brand} cinematic sequence`}/>}
  {contains('cinematicscrollworld')&&can3D&&<CinematicScrollWorld modelPath={modelPath} poster={modelPoster} beats={cameraBeats!} label={`${brand} interactive 3D product`}/>}
  {contains('stickychapterstory')&&other.length>=2&&<StickyChapterStory chapters={other.map((x,i)=>({id:x.id,eyebrow:`CHAPTER ${i+1}`,title:x.title,body:x.description||summary,image:x.src,alt:x.alt}))}/>}
  {contains('pinnedhorizontalgallery')&&other.length>=2&&<PinnedHorizontalGallery title="The collection" items={other.map(x=>({id:x.id,image:x.src,alt:x.alt,title:x.title,href:x.href}))}/>}
  {contains('cursorpreviewlist')&&other.length>=1&&<section className="cm-auto-projects"><h2>Explore the edit.</h2><CursorPreviewList items={other.map(x=>({id:x.id,image:x.src,name:x.title,category:plan.category,href:x.href||'#cm-auto-collection'}))}/></section>}
  <section className="cm-auto-collection" id="cm-auto-collection"><span>SELECTED OBJECTS</span><h2>Look closer.</h2><div className="cm-auto-grid">{legitimate.map(x=><article key={x.id}><a href={x.href||'#cm-auto-home'}><img loading="lazy" src={x.src} alt={x.alt}/><span>{x.title} ↗</span></a></article>)}</div></section>
  <footer className="cm-auto-footer"><strong>{brand}</strong><span>Original cinematic experience / Photography-led</span></footer>
 </main>;
}
