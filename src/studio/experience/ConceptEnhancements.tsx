import { useMemo } from 'react';
import { DoubleSide, Shape, ExtrudeGeometry } from 'three';
export function WatchConcept({accent='#e6c992'}:{accent?:string}){
  return <group rotation={[.12,0,.2]}>
    <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.72,.72,.24,64]}/><meshStandardMaterial color={accent} metalness={.92} roughness={.18}/></mesh>
    <mesh position={[0,0,.13]}><cylinderGeometry args={[.59,.59,.03,64]}/><meshStandardMaterial color="#121a22" roughness={.18} metalness={.4}/></mesh>
    {Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return <mesh key={i} position={[Math.sin(a)*.49,Math.cos(a)*.49,.16]} rotation={[0,0,-a]}>
      <boxGeometry args={[.025,.1,.016]}/><meshBasicMaterial color="#f8e6c6"/>
    </mesh>})}
    <mesh position={[0,.17,.18]} rotation={[0,0,-.7]}><boxGeometry args={[.025,.33,.025]}/><meshBasicMaterial color="#f7eee2"/></mesh>
    <mesh position={[.14,0,.18]} rotation={[0,0,1.3]}><boxGeometry args={[.022,.25,.025]}/><meshBasicMaterial color={accent}/></mesh>
    {[-1,1].map(s=><mesh key={s} position={[0,s*1.08,-.03]}><boxGeometry args={[.82,.87,.12]}/><meshStandardMaterial color="#282e35" metalness={.1} roughness={.8}/></mesh>)}
  </group>;
}
export function SneakerConcept({accent='#e4b4ad'}:{accent?:string}){
  const sole=useMemo(()=>{const s=new Shape();s.moveTo(-1.3,-.38);s.bezierCurveTo(-.6,-.49,.8,-.49,1.4,-.3);s.lineTo(1.3,-.11);s.bezierCurveTo(.55,-.19,-.9,-.19,-1.3,-.16);s.closePath();return new ExtrudeGeometry(s,{depth:.63,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.08,bevelThickness:.04});},[]);
  return <group rotation={[.12,-.35,-.07]} position={[0,-.15,0]}>
    <mesh geometry={sole} position={[0,0,-.3]}><meshStandardMaterial color="#e8e7e2" roughness={.72}/></mesh>
    <mesh position={[-.08,.15,0]} rotation={[0,0,-.09]} scale={[1.3,.45,.44]}><sphereGeometry args={[1,32,24]}/><meshStandardMaterial color={accent} roughness={.8} metalness={.05}/></mesh>
    <mesh position={[-.73,.42,0]} rotation={[0,0,.4]}><boxGeometry args={[.54,.78,.7]}/><meshStandardMaterial color={accent} roughness={.86}/></mesh>
    {[0,1,2,3].map(i=><mesh key={i} position={[-.46+i*.3,.48-i*.052,.31]} rotation={[0,0,-.2]}>
      <boxGeometry args={[.25,.028,.024]}/><meshBasicMaterial color="#f6f3ee"/></mesh>)}
  </group>;
}
export function ChairConcept({accent='#bda58d'}:{accent?:string}){
  return <group position={[0,-.45,0]}>
    <mesh position={[0,.1,0]}><boxGeometry args={[1.55,.17,1.3]}/><meshStandardMaterial color={accent} roughness={.64}/></mesh>
    <mesh position={[0,.92,-.55]} rotation={[-.08,0,0]}><boxGeometry args={[1.55,1.5,.15]}/><meshStandardMaterial color={accent} roughness={.58}/></mesh>
    {[-.61,.61].flatMap(x=>[-.49,.49].map(z=><mesh key={`${x}-${z}`} position={[x,-.66,z]}><cylinderGeometry args={[.055,.075,1.42,12]}/><meshStandardMaterial color="#524b44" metalness={.45} roughness={.46}/></mesh>))}
  </group>;
}
