import type {ReactNode} from 'react';
export function TextShimmer({children,className=''}:{children:ReactNode;className?:string}){return <span className={`inline-block bg-[linear-gradient(110deg,#a78bfa_30%,#fff_45%,#67e8f9_55%,#a78bfa_70%)] bg-[length:250%_100%] bg-clip-text text-transparent motion-safe:animate-[shimmer_4s_linear_infinite] ${className}`}>{children}</span>}
