import { KineticHeadline } from './KineticHeadline';
import { PinnedHorizontalGallery } from './PinnedHorizontalGallery';
import { StickyChapterStory } from './StickyChapterStory';
import { CursorPreviewList } from './CursorPreviewList';
import { MaskedImageReveal } from './MaskedImageReveal';
import { LenisScrollBridge } from './LenisScrollBridge';
import './motion.css';
/** Test route for motion mechanics. The editorial media here MUST be supplied by the site owner. */
const media = ['', '', '', '']; // Explicitly empty until real, licensed assets are supplied.
export default function MotionShowcase(){
 const items=[{id:'a',title:'The silhouette',alt:'Product photograph',image:media[1]},{id:'b',title:'A study in form',alt:'Product detail photograph',image:media[2]},{id:'c',title:'Made to move',alt:'Campaign photograph',image:media[3]}];
 const chapters=items.map((x,i)=>({id:x.id,title:x.title,eyebrow:`STORY / 0${i+1}`,body:'The camera, imagery and typography advance together. Replace the demonstration sources with approved photographic media.',image:x.image,alt:x.alt}));
 return <LenisScrollBridge><main id="cm-demo-top" className="cm-motion-demo">
  <div className="cm-demo-hero"><div className="cm-demo-head"><p>UNIVERSAL CINEMATIC STUDIO / MOTION LAB</p><a href="/">Back to storefront ↗</a></div>
    <KineticHeadline as="h1" text="Images move. Stories unfold."/><p>Interactive patterns designed for real photography, licensed 3D assets and frame-accurate motion. Motion effects cannot manufacture photorealistic media.</p>
  </div>
  <div className="cm-demo-note"><strong>Asset-gated developer preview.</strong> Add campaign-hero.webp and product-01.webp through product-03.webp under public/images before evaluating visual quality. No fake SVG illustration is inserted.</div>
  <PinnedHorizontalGallery title="Objects in motion" items={items}/>
  <StickyChapterStory chapters={chapters}/>
  <div style={{padding:'5vw'}}><KineticHeadline text="A closer perspective."/><MaskedImageReveal src={media[0]} alt="Photographic campaign image" ratio="16 / 9" caption="01 / Campaign still"/></div>
  <CursorPreviewList items={items.map(x=>({id:x.id,name:x.title,image:x.image,href:'#cm-demo-top',category:'Editorial study'}))}/>
 </main></LenisScrollBridge>;
}
