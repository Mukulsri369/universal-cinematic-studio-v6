import * as T from '@radix-ui/react-tooltip';
import {cn} from '@/lib/utils';
import type {ComponentProps} from 'react';
export const TooltipProvider=T.Provider;
export const Tooltip=T.Root;
export const TooltipTrigger=T.Trigger;
export function TooltipContent({className,...props}:ComponentProps<typeof T.Content>){return <T.Portal><T.Content sideOffset={6} className={cn('z-50 rounded-lg bg-violet-100 px-3 py-2 text-xs text-[#141124] shadow-lg',className)} {...props}/></T.Portal>}
