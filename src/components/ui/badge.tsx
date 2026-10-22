import * as React from 'react';
import { cn } from '@/lib/utils';
export function Badge({className,...props}:React.ComponentProps<'span'>){return <span className={cn('inline-flex items-center gap-1 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-violet-200',className)} {...props}/>}
