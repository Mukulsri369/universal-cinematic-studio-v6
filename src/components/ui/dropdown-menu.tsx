import * as D from '@radix-ui/react-dropdown-menu';
import {cn} from '@/lib/utils';
import type {ComponentProps} from 'react';
export const DropdownMenu=D.Root;
export const DropdownMenuTrigger=D.Trigger;
export const DropdownMenuLabel=D.Label;
export const DropdownMenuSeparator=D.Separator;
export function DropdownMenuContent({className,...props}:ComponentProps<typeof D.Content>){return <D.Portal><D.Content sideOffset={5} className={cn('z-50 min-w-40 rounded-xl border border-white/15 bg-[#19182b] p-1 text-white shadow-xl',className)} {...props}/></D.Portal>}
export function DropdownMenuItem({className,...props}:ComponentProps<typeof D.Item>){return <D.Item className={cn('cursor-pointer rounded-lg px-3 py-2 text-sm outline-none data-[highlighted]:bg-violet-500/25',className)} {...props}/>}
