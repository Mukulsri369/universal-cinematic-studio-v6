import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerformanceMonitor, useGLTF } from '@react-three/drei';
import { AdaptiveLightingRig, CameraDirector, CinematicAtmosphere, ProductHotspots, WatchConcept, SneakerConcept, ChairConcept } from './experience';
import type { ExperiencePreset, ProductHotspot } from './experience';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Box3, Group, Vector3 } from 'three';
import { EyewearConcept, SpeakerConcept, GearConcept, CupConcept, BallConcept, ControllerConcept } from './experience/SectorConcepts';

export type ConceptKind = 'sculpture'|'lamp'|'rings'|'vehicle'|'fabric'|'planet'|'device'|'architecture'|'bottle'|'watch'|'sneaker'|'chair'|'eyewear'|'speaker'|'gear'|'cup'|'ball'|'controller'|string;
type Props = { modelPath?:string|null; concept?:ConceptKind; accent?:string; interactive?:boolean; reducedMotion?:boolean; label?:string; stage?:'hero'|'detail'; experience?:Partial<ExperiencePreset>; hotspots?:ProductHotspot[] };

function LoadedModel({ path }: {path:string}) {
  const gltf = useGLTF(path);
  const model = React.useMemo(() => {
    const scene = gltf.scene.clone(true);
    const box = new Box3().setFromObject(scene);
    const size = new Vector3(); const center = new Vector3();
    box.getSize(size); box.getCenter(center);
    const longest = Math.max(size.x,size.y,size.z,0.0001);
    const scale = 2.8 / longest;
    scene.position.set(-center.x,-center.y,-center.z);
    const wrapper = new Group();wrapper.add(scene);wrapper.scale.setScalar(scale);
    return wrapper;
  },[gltf.scene]);
  return <primitive object={model} />;
}
const metal = (color:string, metalness=.65, roughness=.22) =>
  <meshStandardMaterial color={color} metalness={metalness} roughness={roughness}/>;

function ConceptModel({ kind, accent }: {kind:ConceptKind;accent:string}) {
  switch(kind) {
    case 'eyewear':return <EyewearConcept accent={accent}/>;
    case 'speaker':return <SpeakerConcept accent={accent}/>;
    case 'gear':return <GearConcept accent={accent}/>;
    case 'cup':return <CupConcept accent={accent}/>;
    case 'ball':return <BallConcept accent={accent}/>;
    case 'controller':return <ControllerConcept accent={accent}/>;
    case 'watch': return <WatchConcept accent={accent}/>;
    case 'sneaker': return <SneakerConcept accent={accent}/>;
    case 'chair': return <ChairConcept accent={accent}/>;
    case 'lamp': return <group>
      <mesh position={[0,-1.05,0]}>{/* pedestal */}<cylinderGeometry args={[.55,.65,.12,96]} />{metal('#74716c')}</mesh>
      <mesh position={[0,-.25,0]}><cylinderGeometry args={[.075,.075,1.55,32]}/>{metal('#ccb58f')}</mesh>
      <mesh position={[0,.63,0]}><cylinderGeometry args={[.34,.77,.8,96,1,true]}/><meshStandardMaterial color={accent} side={2} metalness={.22} roughness={.4} emissive={accent} emissiveIntensity={.09}/></mesh>
      <pointLight color={accent} position={[0,.6,0]} intensity={12} distance={2.6}/>
      <mesh position={[0,1.01,0]}><cylinderGeometry args={[.34,.34,.055,72]}/>{metal('#8c8174')}</mesh>
    </group>;
    case 'rings':return <group rotation={[.3,.2,.25]}>
      {[0,1,2].map((v)=><mesh key={v} position={[(v-1)*.3,(v-1)*.25,(v-1)*.1]} rotation={[v*.18,v*.28,v*.25]}>
        <torusGeometry args={[.72,.11,20,128]}/>{metal(v===1?'#fae6bc':accent,.94,.16)}
      </mesh>)}
      <mesh position={[0,.72,.12]}><octahedronGeometry args={[.18,1]}/><meshPhysicalMaterial color="#f9f7ff" roughness={.04} metalness={.08} transmission={.35} thickness={.3}/></mesh>
    </group>;
    case 'planet':return <group>
      <mesh rotation={[.3,0,0]}><sphereGeometry args={[.88,64,48]}/><meshStandardMaterial color={accent} metalness={.27} roughness={.78}/></mesh>
      <mesh rotation={[.5,.1,.65]}><torusGeometry args={[1.35,.04,8,128]}/>{metal('#a8a1cf',.4,.4)}</mesh>
      <mesh rotation={[-.3,.2,-.6]}><torusGeometry args={[1.44,.02,8,128]}/><meshBasicMaterial color="#8f92b5" transparent opacity={.45}/></mesh>
    </group>;
    case 'device':return <group rotation={[.1,-.24,.15]}>
      <mesh><boxGeometry args={[1.65,2.45,.15]}/>{metal('#8692a4')}</mesh>
      <mesh position={[0,0,.09]}><boxGeometry args={[1.48,2.25,.01]}/><meshStandardMaterial color="#132c42" emissive={accent} emissiveIntensity={.18} roughness={.22}/></mesh>
      <mesh position={[0,0,.107]}><torusGeometry args={[.42,.035,12,80]}/><meshBasicMaterial color={accent}/></mesh>
    </group>;
    case 'bottle':return <group>
      <mesh position={[0,-.25,0]}><cylinderGeometry args={[.55,.55,1.75,72]}/><meshPhysicalMaterial color={accent} roughness={.18} metalness={.08} transmission={.1} thickness={.25}/></mesh>
      <mesh position={[0,.8,0]}><cylinderGeometry args={[.32,.32,.38,72]}/>{metal('#d8d6c7')}</mesh>
      <mesh position={[0,.18,.55]}><boxGeometry args={[.64,.56,.02]}/><meshStandardMaterial color="#e8e0cc" roughness={.7}/></mesh>
    </group>;
    case 'vehicle':return <group rotation={[0,-.28,0]}>
      <mesh position={[0,-.18,0]}><boxGeometry args={[2.8,.46,1.12]}/>{metal(accent,.68,.28)}</mesh>
      <mesh position={[-.2,.33,0]}><boxGeometry args={[1.45,.7,1.02]}/><meshStandardMaterial color="#28323b" metalness={.54} roughness={.23}/></mesh>
      {[-.95,.95].flatMap(x=>[-.58,.58].map(z=><mesh key={`${x},${z}`} position={[x,-.45,z]} rotation={[Math.PI/2,0,0]}>
        <cylinderGeometry args={[.33,.33,.16,40]}/>{metal('#17191a',.1,.8)}</mesh>))}
    </group>;
    case 'architecture':return <group position={[0,-.65,0]}>
      <mesh position={[0,-.5,0]}><boxGeometry args={[2.9,.14,1.8]}/>{metal('#82796b',.07,.9)}</mesh>
      <mesh position={[-.52,.4,0]}><boxGeometry args={[1.1,1.65,.9]}/>{metal(accent,.2,.55)}</mesh>
      <mesh position={[.52,.12,-.25]}><boxGeometry args={[1.08,1.1,1.4]}/><meshPhysicalMaterial color="#788b87" roughness={.14} metalness={.28} transparent opacity={.75}/></mesh>
    </group>;
    case 'fabric':return <group rotation={[.2,.3,.3]}>
      <mesh><torusKnotGeometry args={[.8,.25,180,22,2,5]}/><meshStandardMaterial color={accent} roughness={.65} metalness={.04}/></mesh>
    </group>;
    default:return <group>
      <mesh rotation={[.28,.4,-.2]}><icosahedronGeometry args={[1.23,5]}/>{metal(accent,.66,.18)}</mesh>
      <mesh rotation={[.5,.1,.42]}><torusGeometry args={[1.5,.017,6,120]}/><meshBasicMaterial color={accent} transparent opacity={.7}/></mesh>
    </group>;
  }
}
class SceneErrorBoundary extends React.Component<{children:React.ReactNode; fallback:React.ReactNode;onError?:()=>void}, {hasError:boolean}> {
  state={hasError:false};
  static getDerivedStateFromError(){return {hasError:true};}
  componentDidCatch(){this.props.onError?.();}
  render(){return this.state.hasError?this.props.fallback:this.props.children;}
}
function RotationRig({modelPath,concept,accent,reducedMotion,onModelError}:{modelPath:string|null;concept:ConceptKind;accent:string;reducedMotion:boolean;onModelError?:()=>void}) {
  const ref=useRef<Group>(null);
  useFrame(({clock},delta)=>{
    if (ref.current && !reducedMotion) {
      ref.current.rotation.y+=Math.min(delta,.04)*.06;
      ref.current.position.y=Math.sin(clock.elapsedTime*.45)*.035;
    }
  });
  return <group ref={ref}>
    {modelPath?<SceneErrorBoundary key={modelPath} onError={onModelError} fallback={<group/>}>
      <Suspense fallback={null}><LoadedModel path={modelPath}/></Suspense>
    </SceneErrorBoundary>:<ConceptModel kind={concept} accent={accent}/>}
  </group>;
}
function StudioScene({modelPath,concept,accent,interactive,reducedMotion,quality,experience,scrollProgress,hotspots,onModelError}:{
  modelPath:string|null;concept:ConceptKind;accent:string;interactive:boolean;reducedMotion:boolean;quality:'high'|'low';experience?:Partial<ExperiencePreset>;scrollProgress:number;hotspots?:ProductHotspot[];onModelError?:()=>void
}) {
  const [dpr,setDpr]=useState(quality==='high'?1.5:1);
  const {setDpr:applyDpr}=useThree();
  useEffect(()=>{applyDpr(dpr);},[applyDpr,dpr]);
  return <>
    <AdaptiveLightingRig mood={experience?.mood||'gallery'} accent={accent} quality={quality}/>
    {quality==='high' && !reducedMotion && <CinematicAtmosphere accent={accent}/> }
    {!interactive && <CameraDirector style={experience?.camera||'reveal'} progress={scrollProgress} disabled={reducedMotion}/> }
    <RotationRig modelPath={modelPath} concept={concept} accent={accent} reducedMotion={reducedMotion} onModelError={onModelError}/>
    {interactive && hotspots && hotspots.length>0 && <ProductHotspots points={hotspots}/> }
    {interactive && <OrbitControls makeDefault enablePan={false} enableZoom={true} minDistance={3.5} maxDistance={9} minPolarAngle={.4} maxPolarAngle={2.5}/>}
    <PerformanceMonitor onDecline={()=>setDpr(1)} onIncline={()=>setDpr(quality==='high'?1.5:1)}/>
    {quality==='high'&&!reducedMotion&&experience?.effects!=='none'&&<EffectComposer multisampling={0}>
      <Bloom intensity={experience?.effects==='glow'?.28:.12} luminanceThreshold={1.1} luminanceSmoothing={.35} mipmapBlur/>
    </EffectComposer>}
  </>;
}
export default function ModelViewport({modelPath=null,concept='sculpture',accent='#ead0a7',interactive=false,reducedMotion=false,label='Product',stage='hero',experience,hotspots=[]}:Props) {
  const host=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false);
  const [onscreen,setOnscreen]=useState(false);
  const [webgl,setWebgl]=useState(false);
  const [modelFailed,setModelFailed]=useState(false);
  useEffect(()=>setModelFailed(false),[modelPath]);
  const [scrollProgress,setScrollProgress]=useState(0);
  const [tabVisible,setTabVisible]=useState(true);
  useEffect(()=>{const sync=()=>setTabVisible(!document.hidden);sync();document.addEventListener('visibilitychange',sync);return()=>document.removeEventListener('visibilitychange',sync);},[]);
  useEffect(()=>{
    try{const c=document.createElement('canvas');setWebgl(!!(c.getContext('webgl2')||c.getContext('webgl')));}catch{setWebgl(false);}
    const ob=new IntersectionObserver((entries)=>{const yes=Boolean(entries[0]?.isIntersecting);if(yes)setVisible(true);setOnscreen(yes);},{rootMargin:'250px'});
    if(host.current)ob.observe(host.current);return()=>ob.disconnect();
  },[]);
  useEffect(()=>{
    if(interactive||reducedMotion)return;
    let frame=0;const update=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;setScrollProgress(Math.max(0,Math.min(1,window.scrollY/Math.max(1,window.innerHeight))));});};
    window.addEventListener('scroll',update,{passive:true});return()=>{window.removeEventListener('scroll',update);cancelAnimationFrame(frame);};
  },[interactive,reducedMotion]);
  const quality:'high'|'low' = typeof window !== 'undefined' && window.innerWidth >= 800?'high':'low';
  return <div ref={host} className={`cs-model cs-model--${stage}`} role="img" aria-label={`${label}: ${modelPath?'interactive model':'conceptual 3D visualization, not verified product geometry'}`}>
    {visible&&webgl?<Canvas frameloop={onscreen&&tabVisible?(reducedMotion?'demand':'always'):'never'} dpr={quality==='high'?[1,1.7]:[1,1.15]} camera={{position:[0,0.4,5.6],fov:38,near:.1,far:70}}
      gl={{antialias:true,alpha:true,powerPreference:'high-performance'}} style={{touchAction:interactive?'none':'pan-y'}}>
      <Suspense fallback={null}><StudioScene modelPath={modelPath} concept={concept} accent={accent} interactive={interactive} reducedMotion={reducedMotion} quality={quality} experience={experience} scrollProgress={scrollProgress} hotspots={hotspots} onModelError={()=>setModelFailed(true)}/></Suspense>
    </Canvas>:modelPath?<div className="cs-model-unavailable" role="status">Interactive 3D requires WebGL and a supported device. Refer to the actual product photographs.</div>:<div className="cs-model-fallback" aria-hidden="true"><div className="cs-model-orbit"/></div>}
    {modelPath&&modelFailed&&<div className="cs-model-unavailable" role="status">This product’s 3D model could not be loaded. Do not substitute a conceptual shape as the real item.</div>}
    {!modelPath&&<div className="cs-concept-tag">Conceptual 3D • replace with product GLB</div>}
    {interactive&&hotspots&&hotspots.length>0&&<div className="cs-hotspot-list" style={{position:'absolute',right:'16px',bottom:'16px',display:'flex',flexDirection:'column',gap:'8px',zIndex:4,pointerEvents:'none'}}>
      {hotspots.map(p=><div key={p.id} className="cs-hotspot" title={`${p.label}: ${p.description}`}>
        <span className="cs-hotspot-dot" aria-hidden="true"/><span className="cs-hotspot-copy"><strong>{p.label}</strong><small>{p.description}</small></span>
      </div>)}
    </div>}
  </div>;
}
