import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ShaderMaterial } from 'three';

const vertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const fragment = /* glsl */ `
precision mediump float;
uniform float uTime;
varying vec2 vUv;
float softGlow(vec2 p, vec2 center, float stretch) {
  vec2 d = (p - center) * vec2(stretch, 1.0);
  return exp(-dot(d,d)*6.0);
}
void main() {
  vec2 uv = vUv;
  float t = uTime * 0.08;
  float amber = softGlow(uv, vec2(0.61 + sin(t)*0.03,0.50), 1.0);
  float blue = softGlow(uv, vec2(0.22,0.69 + cos(t)*0.04),1.25);
  vec3 color = vec3(0.20, 0.12, 0.11) * amber + vec3(0.055, 0.075, 0.22) * blue;
  gl_FragColor = vec4(color, min(0.48, amber*.22 + blue*.19));
}
`;
/** Low-cost atmosphere plane: no external textures or shaders from the internet. */
export function SpectralAtmosphere({ active = true }: { active?: boolean }) {
  const material = useRef<ShaderMaterial>(null);
  useFrame((_, delta) => { if (material.current && active) material.current.uniforms.uTime.value += Math.min(delta, 0.1); });
  return <mesh position={[0,0,-5.7]} renderOrder={-1}>
    <planeGeometry args={[21,13,1,1]} />
    <shaderMaterial ref={material} transparent depthWrite={false}
      uniforms={{uTime: {value: 0}}} vertexShader={vertex} fragmentShader={fragment} />
  </mesh>;
}
