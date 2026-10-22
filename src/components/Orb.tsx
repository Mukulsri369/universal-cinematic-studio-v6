import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Sphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_state, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.25; });
  return <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
    <mesh ref={ref}><icosahedronGeometry args={[1.35, 16]} />
      <MeshDistortMaterial color="#8674ff" roughness={0.25} metalness={0.55} distort={0.22} speed={1.3} />
    </mesh>
  </Float>;
}
export default function Orb() {
  return <div className="orb" aria-label="Animated three-dimensional orb">
    <Canvas camera={{ position: [0, 0, 4.4], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={1.1}/><directionalLight position={[3, 4, 5]} intensity={3}/>
      <Sphere />
    </Canvas>
  </div>;
}
