import { useMemo } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';

/** Original local geometry — no external brand, model CDN or license dependence. */
export function StudioHeadphones() {
  const outerBand = useMemo(() => new CatmullRomCurve3([
    new Vector3(-1.31, -0.37, 0), new Vector3(-1.34, 0.22, 0),
    new Vector3(-1.09, 1.07, 0), new Vector3(-0.54, 1.5, 0),
    new Vector3(0, 1.61, 0), new Vector3(0.54, 1.5, 0),
    new Vector3(1.09, 1.07, 0), new Vector3(1.34, 0.22, 0),
    new Vector3(1.31, -0.37, 0),
  ]), []);
  const innerBand = useMemo(() => new CatmullRomCurve3([
    new Vector3(-1.28, 0.35, 0), new Vector3(-1.0, 1.12, 0),
    new Vector3(-0.5, 1.36, 0), new Vector3(0, 1.43, 0),
    new Vector3(0.5, 1.36, 0), new Vector3(1.0, 1.12, 0),
    new Vector3(1.28, 0.35, 0),
  ]), []);
  return (
    <group rotation={[0.09, -0.38, -0.08]}>
      <mesh castShadow>
        <tubeGeometry args={[outerBand, 112, 0.15, 12, false]} />
        <meshPhysicalMaterial color="#3a302e" metalness={0.7} roughness={0.27} clearcoat={1} clearcoatRoughness={0.18} />
      </mesh>
      <mesh>
        <tubeGeometry args={[innerBand, 84, 0.073, 10, false]} />
        <meshStandardMaterial color="#bdad9b" metalness={0.1} roughness={0.7} />
      </mesh>
      {[-1, 1].map(side => (
        <group key={side} position={[side * 1.29, -0.4, 0]} rotation={[0, side * 0.045, 0]}>
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.62, 0.61, 0.35, 80, 1]} />
            <meshPhysicalMaterial color="#242328" metalness={0.74} roughness={0.17} clearcoat={1} clearcoatRoughness={0.12} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[side * 0.187, 0, 0]}>
            <cylinderGeometry args={[0.545, 0.54, 0.026, 80]} />
            <meshStandardMaterial color="#ac967d" metalness={0.9} roughness={0.24} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[side * 0.206, 0, 0]}>
            <cylinderGeometry args={[0.48, 0.48, 0.03, 80]} />
            <meshPhysicalMaterial color="#242229" metalness={0.52} roughness={0.21} clearcoat={1} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]} position={[-side * 0.21, 0, 0]}>
            <torusGeometry args={[0.43, 0.13, 18, 80]} />
            <meshStandardMaterial color="#171619" roughness={0.95} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]} position={[side * 0.225, 0, 0]}>
            <torusGeometry args={[0.485, 0.023, 12, 80]} />
            <meshStandardMaterial color="#e2c39e" metalness={0.88} roughness={0.21} />
          </mesh>
          <mesh position={[side * 0.243, -0.43, 0]}>
            <sphereGeometry args={[0.024, 12, 12]} />
            <meshBasicMaterial color="#f2d7b0" toneMapped={false} />
          </mesh>
        </group>
      ))}
      <group position={[0, -1.38, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[2.45, 72]} />
          <meshBasicMaterial color="#1b171a" transparent opacity={0.06} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}
