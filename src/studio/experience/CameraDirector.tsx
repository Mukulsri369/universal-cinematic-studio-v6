import { useFrame } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import { useRef } from 'react';
import type { CameraStyle } from './experience.types';
const paths: Record<CameraStyle, [[number,number,number],[number,number,number]]> = {
  reveal: [[0,.4,5.8],[.8,.15,4.7]],
  architectural: [[2.5,1.9,6.5],[-1.3,1,5.4]],
  macro: [[1.1,.55,4.7],[-.6,.15,3.8]],
  sweep: [[3.4,1.1,7],[-2,.45,5.5]],
  runway: [[-.8,.4,6.7],[.9,.3,4.8]],
  orbit: [[1.6,1.1,6],[-1.8,.6,5.5]]
};
export function CameraDirector({style='reveal',progress=0,disabled=false}:{style?:CameraStyle;progress?:number;disabled?:boolean}){
  const target=useRef(new Vector3());
  useFrame(({camera},dt)=>{
    if(disabled)return;
    const p=paths[style]||paths.reveal;
    const t=MathUtils.clamp(progress,0,1);
    target.current.set(
      MathUtils.lerp(p[0][0],p[1][0],t),
      MathUtils.lerp(p[0][1],p[1][1],t),
      MathUtils.lerp(p[0][2],p[1][2],t)
    );
    camera.position.lerp(target.current,1-Math.exp(-Math.min(dt,.07)*2.8));
    camera.lookAt(0,0,0);
  });
  return null;
}
