import type { ReactNode } from 'react';
export function AuroraBackground({children,className=''}:{children?:ReactNode;className?:string}){
return <div className={`relative isolate overflow-hidden bg-[#070a19] ${className}`}><div aria-hidden="true" className="pointer-events-none absolute -inset-40 opacity-60 blur-[90px]" style={{background:'radial-gradient(ellipse at 20% 40%,#6d28d9aa,transparent 42%),radial-gradient(ellipse at 85% 25%,#06b6d4aa,transparent 45%),radial-gradient(ellipse at 50% 90%,#db2777aa,transparent 35%)',animation:'auroraDrift 18s ease-in-out infinite alternate'}}/><div className="relative z-10">{children}</div></div>;
}
