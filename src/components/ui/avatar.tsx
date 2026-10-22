import * as A from '@radix-ui/react-avatar';
import {cn} from '@/lib/utils';
import type {ComponentProps} from 'react';
export function Avatar({className,...props}:ComponentProps<typeof A.Root>){return <A.Root className={cn('inline-flex size-10 shrink-0 overflow-hidden rounded-full',className)} {...props}/>}
export function AvatarImage({className,...props}:ComponentProps<typeof A.Image>){return <A.Image className={cn('size-full object-cover',className)} {...props}/>}
export function AvatarFallback({className,...props}:ComponentProps<typeof A.Fallback>){return <A.Fallback className={cn('grid size-full place-items-center bg-violet-500/30 text-sm font-medium text-violet-200',className)} {...props}/>}
