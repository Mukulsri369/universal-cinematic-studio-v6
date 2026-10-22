import { Suspense, useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Lightformer, PresentationControls, useGLTF } from '@react-three/drei';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { MathUtils, Vector3 } from 'three';
import type { Group, Mesh } from 'three';
import { StudioHeadphones } from './StudioHeadphones';
import { SpectralAtmosphere } from './SpectralAtmosphere';

function LicensedGLB({ path }: { path: string }) {
  const gltf = useGLTF(path);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  return <primitive object={scene} />;
}

function StudioLighting() {
  return <>
    <ambientLight intensity={0.8} color="#c7c4ce" />
    <spotLight position={[4.5, 6, 5]} angle={0.48} penumbra={0.9} intensity={210} color="#fff0df" castShadow />
    <spotLight position={[-4, 1, -2]} intensity={145} angle={0.75} penumbra={1} color="#718aff" />
    <pointLight position={[1, -2, 4]} intensity={35} color="#cfa681" />
    <Environment resolution={128}>
      <Lightformer form="rect" intensity={4} color="#fff2e9" scale={[5, 8, 1]} position={[3, 4, 3]} rotation={[0, -0.8, 0]} />
      <Lightformer form="rect" intensity={3} color="#6175b7" scale={[2, 7, 1]} position={[-4, 1, 1]} rotation={[0, 0.9, 0]} />
      <Lightformer form="ring" intensity={2} color="#e4c5a4" scale={3} position={[0, 2, -4]} />
    </Environment>
  </>;
}

function AnimationRig({ progressRef, modelPath, reducedMotion }: {
  progressRef: MutableRefObject<number>; modelPath: string | null; reducedMotion: boolean
}) {
  const group = useRef<Group>(null);
  const { camera, pointer } = useThree();
  const lookAt = useMemo(() => new Vector3(0, 0, 0), []);
  useFrame(({ clock }, delta) => {
    const p = progressRef.current;
    const t = reducedMotion ? 0 : clock.elapsedTime;
    const ease = 1 - Math.exp(-Math.min(delta, 0.1) * 2.8);
    if (group.current) {
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, (p * 2.15) + (reducedMotion ? 0 : pointer.x * 0.13), ease);
      group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, -p * 0.23 + (reducedMotion ? 0 : pointer.y * -0.05), ease);
      group.current.position.y = reducedMotion ? 0 : Math.sin(t * 0.6) * 0.055;
    }
    camera.position.x = MathUtils.lerp(camera.position.x, 0.7 + p * 1.25, ease);
    camera.position.y = MathUtils.lerp(camera.position.y, 0.15 + p * 0.28, ease);
    camera.position.z = MathUtils.lerp(camera.position.z, 7 - p * 0.65, ease);
    camera.lookAt(lookAt);
  });
  return <group ref={group}>
    <Float speed={reducedMotion ? 0 : 0.7} rotationIntensity={0} floatIntensity={reducedMotion ? 0 : 0.12}>
      {modelPath ? <Suspense fallback={<StudioHeadphones />}><LicensedGLB path={modelPath} /></Suspense> : <StudioHeadphones />}
    </Float>
  </group>;
}

function Backdrop() {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (mesh.current) mesh.current.rotation.z = Math.sin(clock.elapsedTime * 0.04) * 0.06;
  });
  return <mesh ref={mesh} position={[0, -0.05, -3.3]}>
    <torusGeometry args={[3.65, 0.012, 6, 144]} />
    <meshBasicMaterial color="#74615b" transparent opacity={0.48} depthWrite={false} />
  </mesh>;
}

function Scene({progressRef, modelPath, reducedMotion, quality}: {
  progressRef: MutableRefObject<number>; modelPath: string | null; reducedMotion: boolean; quality: 'high' | 'low'
}) {
  return <>
    <color attach="background" args={['#101015']} />
    <fog attach="fog" args={['#101015', 8, 16]} />
    <StudioLighting />
    <SpectralAtmosphere active={!reducedMotion} />
    <Backdrop />
    <PresentationControls global polar={[-0.27, 0.27]} azimuth={[-0.52, 0.52]} speed={1.1} snap={false}>
      <AnimationRig progressRef={progressRef} modelPath={modelPath} reducedMotion={reducedMotion} />
    </PresentationControls>
    {quality === 'high' && !reducedMotion && <EffectComposer multisampling={0}>
      <Bloom intensity={0.27} luminanceThreshold={1} luminanceSmoothing={0.35} mipmapBlur />
      <Noise opacity={0.025} />
      <Vignette eskil={false} offset={0.24} darkness={0.42} />
    </EffectComposer>}
  </>;
}

/** Safe for slow devices and screen readers: the surrounding DOM is the full product page. */
export function CinematicStage({ progressRef, modelPath, reducedMotion }: {
  progressRef: MutableRefObject<number>; modelPath: string | null; reducedMotion: boolean
}) {
  const quality: 'high' | 'low' = typeof window !== 'undefined' && window.innerWidth < 760 ? 'low' : 'high';
  useEffect(() => { if (modelPath) useGLTF.preload(modelPath); }, [modelPath]);
  return <Canvas
    aria-label="Interactive three-dimensional studio product visualization"
    dpr={quality === 'low' ? [1, 1.35] : [1, 1.8]}
    camera={{ position: [0.7, 0.15, 7], fov: 34, near: 0.1, far: 50 }}
    gl={{ antialias: quality === 'low', alpha: false, powerPreference: 'high-performance' }}
    shadows={quality === 'high'}
    onCreated={({ gl }) => { gl.setClearColor('#101015'); }}
  >
    <Suspense fallback={null}>
      <Scene progressRef={progressRef} modelPath={modelPath} reducedMotion={reducedMotion} quality={quality}/>
    </Suspense>

  </Canvas>;
}
