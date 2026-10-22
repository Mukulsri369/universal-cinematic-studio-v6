/** Original procedural silhouettes for preview only. Not representations of real merchandise. */
export function EyewearConcept({accent}:{accent:string}){
 return <group rotation={[.1,-.25,.04]}>
   {[-.76,.76].map(x=><group key={x} position={[x,0,0]}>
     <mesh><torusGeometry args={[.58,.065,12,96]}/><meshStandardMaterial color={accent} metalness={.75} roughness={.17}/></mesh>
     <mesh position={[0,0,-.02]}><circleGeometry args={[.53,64]}/><meshPhysicalMaterial color="#6b8c97" transparent opacity={.23} roughness={.09} metalness={.3}/></mesh>
   </group>)}
   <mesh position={[0,.18,0]}><boxGeometry args={[.52,.06,.08]}/><meshStandardMaterial color={accent} metalness={.8} roughness={.18}/></mesh>
   {[-1,1].map(sign=><mesh key={sign} position={[sign*1.55,.06,-.42]} rotation={[0,sign*.31,0]}><boxGeometry args={[.83,.07,.08]}/><meshStandardMaterial color={accent} metalness={.7} roughness={.25}/></mesh>)}
 </group>;
}
export function SpeakerConcept({accent}:{accent:string}){
 return <group rotation={[0,-.35,0]}>
   <mesh><boxGeometry args={[1.85,2.55,.8]}/><meshStandardMaterial color="#26272c" metalness={.45} roughness={.3}/></mesh>
   <mesh position={[0,0,.42]}><boxGeometry args={[1.69,2.36,.04]}/><meshStandardMaterial color={accent} roughness={.75} metalness={.15}/></mesh>
   {[[-.08,.55,.35],[0,-.48,.62]].map(([x,y,r],i)=><group key={i} position={[x,y,.47]}>
     <mesh><torusGeometry args={[r,.06,16,72]}/><meshStandardMaterial color="#141619" metalness={.2} roughness={.72}/></mesh>
     <mesh position={[0,0,.025]}><circleGeometry args={[r-.05,56]}/><meshStandardMaterial color="#222c31" roughness={.85}/></mesh>
     <mesh position={[0,0,.04]}><sphereGeometry args={[r*.3,24,16]}/><meshStandardMaterial color="#5a6970" roughness={.8}/></mesh>
   </group>)}
 </group>;
}
export function GearConcept({accent}:{accent:string}){
 return <group rotation={[0,-.25,0]}>
  <mesh><boxGeometry args={[1.65,2.0,.72]}/><meshStandardMaterial color={accent} roughness={.85}/></mesh>
  <mesh position={[0,-.53,.4]}><boxGeometry args={[1.38,.7,.22]}/><meshStandardMaterial color="#263d38" roughness={.77}/></mesh>
  <mesh position={[0,1.04,0]}><torusGeometry args={[.29,.09,12,32,Math.PI]}/><meshStandardMaterial color="#222a27" roughness={.79}/></mesh>
  {[-.63,.63].map(x=><mesh key={x} position={[x,0,-.44]}><cylinderGeometry args={[.11,.11,2.1,24]}/><meshStandardMaterial color="#25322b" roughness={.85}/></mesh>)}
 </group>;
}
export function CupConcept({accent}:{accent:string}){
 return <group>
  <mesh position={[0,-.2,0]}><cylinderGeometry args={[.7,.51,1.5,64,1,true]}/><meshPhysicalMaterial color={accent} metalness={.05} roughness={.27} side={2}/></mesh>
  <mesh position={[0,.54,0]}><torusGeometry args={[.69,.055,12,64]}/><meshStandardMaterial color={accent} metalness={.12} roughness={.22}/></mesh>
  <mesh position={[.78,-.05,0]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[.4,.09,12,60]}/><meshStandardMaterial color={accent} roughness={.28}/></mesh>
  <mesh position={[0,-.94,0]}><cylinderGeometry args={[.49,.49,.075,64]}/><meshStandardMaterial color={accent} roughness={.34}/></mesh>
  <mesh position={[0,.53,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.62,64]}/><meshStandardMaterial color="#68442f" roughness={.52}/></mesh>
 </group>;
}
export function BallConcept({accent}:{accent:string}){
 return <group rotation={[.3,.25,0]}>
  <mesh><sphereGeometry args={[1.05,64,48]}/><meshStandardMaterial color={accent} roughness={.67} metalness={.02}/></mesh>
  {[0,Math.PI/3,2*Math.PI/3].map(a=><mesh key={a} rotation={[a,a*.5,0]}><torusGeometry args={[1.052,.015,8,96]}/><meshStandardMaterial color="#20373c" roughness={.64}/></mesh>)}
 </group>;
}
export function ControllerConcept({accent}:{accent:string}){
 return <group rotation={[-.23,-.25,.04]}>
  <mesh><boxGeometry args={[2.6,.77,.93]}/><meshStandardMaterial color="#1c2030" metalness={.38} roughness={.37}/></mesh>
  {[-1.15,1.15].map(x=><mesh key={x} position={[x,-.47,.08]} rotation={[0,0,-Math.sign(x)*.3]}><capsuleGeometry args={[.36,.7,8,16]}/><meshStandardMaterial color="#272b39" metalness={.32} roughness={.42}/></mesh>)}
  {[-.65,.65].map(x=><mesh key={x} position={[x,.41,.29]}><cylinderGeometry args={[.21,.21,.18,40]}/><meshStandardMaterial color={accent} metalness={.12} roughness={.38}/></mesh>)}
  {[[-.9,.1],[.95,.18]].map(([x,y],i)=><mesh key={i} position={[x,y,.49]}><torusGeometry args={[.17,.035,10,40]}/><meshStandardMaterial color={accent} roughness={.35}/></mesh>)}
 </group>;
}
