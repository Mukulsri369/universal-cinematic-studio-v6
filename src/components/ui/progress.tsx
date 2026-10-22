import * as P from '@radix-ui/react-progress';
import {cn} from '@/lib/utils';
import type {ComponentProps} from 'react';
export function Progress({value=0,className,...props}:ComponentProps<typeof P.Root>){const percentage=Math.max(0,Math.min(100,value??0));return <P.Root value={value} className={cn('relative h-2 w-full overflow-hidden rounded-full bg-white/10',className)} {...props}><P.Indicator className='block h-full w-full rounded-full bg-violet-400 transition-transform' style={{transform:`translateX(-${100-percentage}%)`}}/></P.Root>}
