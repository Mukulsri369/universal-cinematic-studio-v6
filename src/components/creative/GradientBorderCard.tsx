import type {ReactNode} from 'react';
export function GradientBorderCard({children,className=''}:{children:ReactNode;className?:string}){return <div className={`relative rounded-2xl bg-gradient-to-br from-violet-500/80 via-cyan-400/40 to-fuchsia-500/70 p-px ${className}`}><div className="h-full rounded-[15px] bg-[#0b1021] p-6">{children}</div></div>}
