import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, DoubleSide, ShaderMaterial } from 'three';
const vertex = `varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fragment = `precision highp float; varying vec2 vUv; uniform float uTime; uniform vec3 uAccent;
void main(){ vec2 uv=vUv-.5; float r=length(uv*vec2(1.0,1.4));
float waves=sin(uv.x*13.+uv.y*8.+uTime*.18)*.5+.5;
float halo=smoothstep(.62,.08,r)*(.12+.055*waves);
vec3 col=mix(vec3(.02,.025,.048),uAccent,halo);
float a=smoothstep(.78,.12,r)*.32;
gl_FragColor=vec4(col,a); }`;
export function CinematicAtmosphere({accent='#b2a1ff',animated=true}:{accent?:string;animated?:boolean}){
  const material=useMemo(()=>new ShaderMaterial({uniforms:{uTime:{value:0},uAccent:{value:new Color(accent)}},vertexShader:vertex,fragmentShader:fragment,transparent:true,depthWrite:false,side:DoubleSide}),[accent]);
  const matRef=useRef(material);
  matRef.current=material;
  useEffect(()=>()=>material.dispose(),[material]);
  useFrame((state)=>{if(animated)matRef.current.uniforms.uTime.value=state.clock.elapsedTime;});
  // Dispose only when unmounting: material is reused for the lifetime of this mesh.
  return <mesh position={[0,0,-4.8]} renderOrder={-1} frustumCulled={false}>
    <planeGeometry args={[16,11,1,1]}/><primitive object={material} attach="material"/>
  </mesh>;
}
