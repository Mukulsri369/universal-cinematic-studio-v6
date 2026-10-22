import * as C from '@radix-ui/react-checkbox';
import {Check} from 'lucide-react';
import {cn} from '@/lib/utils';
import type {ComponentProps} from 'react';
export function Checkbox({className,...props}:ComponentProps<typeof C.Root>){return <C.Root className={cn('grid size-5 place-items-center rounded border border-white/25 bg-white/5 text-white data-[state=checked]:border-violet-500 data-[state=checked]:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400',className)} {...props}><C.Indicator><Check size={14}/></C.Indicator></C.Root>}
