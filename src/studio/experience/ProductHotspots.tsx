import type { ProductHotspot } from './experience.types';
export function ProductHotspots({points=[]}:{points?:ProductHotspot[]}){
  return <group>{points.map(p=><mesh key={p.id} position={p.position}>
    <sphereGeometry args={[0.045, 16, 16]} />
    <meshBasicMaterial color="#ffffff" />
  </mesh>)}</group>;
}
