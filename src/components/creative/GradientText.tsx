import type { ReactNode } from 'react';
export function GradientText({children}:{children:ReactNode}){return <span className='bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent'>{children}</span>}
