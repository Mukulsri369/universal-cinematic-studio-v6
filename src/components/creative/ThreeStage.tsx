import { Canvas,useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, OrbitControls, Stars } from '@react-three/drei';
import { Suspense,useRef } from 'react';
import * as THREE from 'three';
function Sculpture(){const ref=useRef<THREE.Mesh>(null);useFrame((_,dt)=>{if(ref.current){ref.current.rotation.y+=dt*.12;ref.current.rotation.x+=dt*.07;}});
 return <Float speed={2} rotationIntensity={.22} floatIntensity={.4}><mesh ref={ref}><torusKnotGeometry args={[1.1,.32,160,20]}/><MeshTransmissionMaterial color='#a991ff' roughness={.08} transmission={.92} thickness={.55} chromaticAberration={.03}/></mesh></Float>;
}
export function ThreeStage(){return <div className='h-[360px] w-full' aria-label='Interactive 3D sculpture'>
 <Canvas dpr={[1,1.5]} camera={{position:[0,0,5],fov:47}} gl={{antialias:true}}>
 <color attach='background' args={['#0c0b1c']}/><ambientLight intensity={1.6}/><pointLight position={[3,4,3]} intensity={18} color='#9277ff'/><pointLight position={[-3,-2,2]} intensity={12} color='#54e5ff'/>
 <Suspense fallback={null}><Sculpture/><Stars radius={80} depth={40} count={350} factor={2} fade speed={.4}/></Suspense><OrbitControls enablePan={false} enableZoom={false}/>
 </Canvas></div>}
