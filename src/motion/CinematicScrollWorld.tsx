import {Suspense,useEffect,useMemo,useRef,useState} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {useGLTF} from '@react-three/drei';
import {Group,MathUtils,Vector3} from 'three';
import React from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useReducedMotion} from './useMotionPreferences';
gsap.registerPlugin(ScrollTrigger);
export type CameraBeat={progress:number;position:[number,number,number];target:[number,number,number];rotation?:[number,number,number]};
export type CinematicScrollWorldProps={modelPath?:string|null;poster?:string;label:string;beats:CameraBeat[];scrollScreens?:number};
export function validateCameraBeats(beats:CameraBeat[]):boolean{
 return beats.length>=2&&beats[0].progress===0&&beats[beats.length-1].progress===1&&beats.every((x,i)=>x.progress>=0&&x.progress<=1&&x.position.length===3&&x.target.length===3&&[...x.position,...x.target].every(Number.isFinite)&&(i===0||x.progress>beats[i-1].progress));
}
function AnimatedAsset({path,beats,progress}:{path:string;beats:CameraBeat[];progress:React.MutableRefObject<number>}){
 const {scene}=useGLTF(path);const cloned=useMemo(()=>scene.clone(true),[scene]);const group=useRef<Group>(null);
 const desiredPosition=useRef(new Vector3());const desiredTarget=useRef(new Vector3());const smoothTarget=useRef(new Vector3(...beats[0].target));
 const start=useRef(new Vector3());const finish=useRef(new Vector3());
 useFrame(({camera},delta)=>{
  const p=progress.current;
  let right=1;while(right<beats.length-1&&beats[right].progress<p)right++;
  const before=beats[right-1];const after=beats[right];const t=MathUtils.smoothstep(p,before.progress,after.progress);
  start.current.set(...before.position);finish.current.set(...after.position);desiredPosition.current.copy(start.current).lerp(finish.current,t);
  start.current.set(...before.target);finish.current.set(...after.target);desiredTarget.current.copy(start.current).lerp(finish.current,t);
  const damping=1-Math.exp(-5*Math.min(delta,.05));
  camera.position.lerp(desiredPosition.current,damping);smoothTarget.current.lerp(desiredTarget.current,damping);camera.lookAt(smoothTarget.current);
  if(group.current&&before.rotation&&after.rotation){const r=group.current.rotation;
   r.set(MathUtils.lerp(before.rotation[0],after.rotation[0],t),MathUtils.lerp(before.rotation[1],after.rotation[1],t),MathUtils.lerp(before.rotation[2],after.rotation[2],t));}
 });
 return <group ref={group}><primitive object={cloned} /></group>;
}
class MotionSceneErrorBoundary extends React.Component<{fallback:React.ReactNode;children:React.ReactNode},{failed:boolean}>{
 state={failed:false};static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?this.props.fallback:this.props.children;}
}
/** Production GLB only; no procedural merchandise impersonation. */
export function CinematicScrollWorld({modelPath,poster,label,beats,scrollScreens=4}:CinematicScrollWorldProps){
 const container=useRef<HTMLElement>(null);const progress=useRef(0);const reduced=useReducedMotion();const [onscreen,setOnscreen]=useState(false);
 useEffect(()=>{if(!container.current)return;const observer=new IntersectionObserver(entries=>setOnscreen(Boolean(entries[0]?.isIntersecting)),{rootMargin:'200px'});observer.observe(container.current);return()=>observer.disconnect();},[]);
 useEffect(()=>{if(!container.current||reduced||!modelPath||!validateCameraBeats(beats))return;
 const trigger=ScrollTrigger.create({trigger:container.current,start:'top top',end:()=>`+=${Math.max(1,scrollScreens)*window.innerHeight}`,pin:true,scrub:true,invalidateOnRefresh:true,onUpdate:self=>{progress.current=self.progress;}});
 return()=>trigger.kill();},[modelPath,beats,scrollScreens,reduced]);
 const ready=!!modelPath&&validateCameraBeats(beats)&&!reduced;
 return <section className="cm-world" ref={container} aria-label={label}>
  {ready&&onscreen?<MotionSceneErrorBoundary fallback={poster?<img className="cm-world-poster" src={poster} alt={label}/>:<div className="cm-asset-unavailable">Could not load verified 3D model</div>}><Suspense fallback={poster?<img className="cm-world-poster" src={poster} alt={label}/>:<div className="cm-asset-unavailable">Loading 3D scene</div>}>
  <Canvas dpr={[1,1.5]} frameloop={onscreen?'always':'never'} camera={{position:beats[0].position,fov:36,near:.1,far:250}} gl={{antialias:true,alpha:true}}>
   <ambientLight intensity={1.1}/><directionalLight position={[3,5,4]} intensity={2.2}/>
   <AnimatedAsset path={modelPath!} beats={beats} progress={progress}/>
  </Canvas></Suspense></MotionSceneErrorBoundary>:poster?<img className="cm-world-poster" src={poster} alt={label}/>:<div className="cm-asset-unavailable">Verified 3D model and photographic poster required</div>}
 </section>;
}
