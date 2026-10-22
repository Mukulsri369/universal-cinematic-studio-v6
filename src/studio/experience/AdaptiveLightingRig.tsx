import { Environment, Lightformer } from '@react-three/drei';
import type { LightingMood } from './experience.types';
const setups = {
  gallery: {key:'#fff7ec',fill:'#dbe9ff',rim:'#f5c29b',strength:1},
  'warm-gallery': {key:'#ffe3b7',fill:'#c5dfff',rim:'#ffc674',strength:1.15},
  jewelry: {key:'#fffaf5',fill:'#d0e8ff',rim:'#ffe0a0',strength:1.2},
  automotive: {key:'#e8f3ff',fill:'#7baad3',rim:'#ffffff',strength:1.05},
  fashion: {key:'#fff2e9',fill:'#e3bad9',rim:'#f8edeb',strength:.8},
  cosmic: {key:'#cdd7ff',fill:'#8185ff',rim:'#c2a1ff',strength:.9},
  tech: {key:'#d8f9ff',fill:'#67b9ff',rim:'#c2faff',strength:1},
  architectural: {key:'#fff4dc',fill:'#c9deee',rim:'#f7d8a1',strength:.9},
  daylight: {key:'#f5f9ef',fill:'#cce9db',rim:'#faf2dd',strength:.75},
} as const;
export function AdaptiveLightingRig({mood='gallery',accent='#dcc3a0',quality='high'}:{mood?:LightingMood;accent?:string;quality?:'high'|'low'}){
  const p=setups[mood]??setups.gallery;
  const s=p.strength;
  return <>
    <ambientLight intensity={.48*s} color={p.fill}/>
    <spotLight position={[4,5,5]} color={p.key} intensity={80*s} angle={.56} penumbra={.85} />
    <spotLight position={[-3,1.9,3]} color={p.fill} intensity={26*s} penumbra={.9} angle={.7}/>
    <spotLight position={[-2.5,3,-4]} color={p.rim} intensity={55*s} penumbra={.75} angle={.55}/>
    {mood==='warm-gallery'&&<pointLight position={[0,1.8,1]} intensity={5} color={accent} distance={7}/>}
    <Environment resolution={quality==='high'?128:32}>
      <Lightformer form="rect" intensity={2.2} color={p.key} scale={[5,8,1]} position={[3,3,4]}/>
      <Lightformer form="rect" intensity={2} color={p.fill} scale={[3,7,1]} position={[-4,1,-2]} rotation={[0,.45,0]}/>
      {quality==='high'&&<Lightformer form="ring" intensity={1.1} color={p.rim} scale={[4,4,1]} position={[0,4,-4]}/>}
    </Environment>
  </>;
}
