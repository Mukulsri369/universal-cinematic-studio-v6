import * as S from '@radix-ui/react-select';
import {Check,ChevronDown} from 'lucide-react';
import {cn} from '@/lib/utils';
import type {ComponentProps} from 'react';
export const Select=S.Root;
export const SelectValue=S.Value;
export function SelectTrigger({className,children,...props}:ComponentProps<typeof S.Trigger>){return <S.Trigger className={cn('flex h-11 w-full items-center justify-between rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-400',className)} {...props}>{children}<S.Icon><ChevronDown size={16}/></S.Icon></S.Trigger>}
export function SelectContent({className,...props}:ComponentProps<typeof S.Content>){return <S.Portal><S.Content position='popper' sideOffset={5} className={cn('z-50 min-w-[var(--radix-select-trigger-width)] rounded-xl border border-white/15 bg-[#19182b] text-white shadow-xl',className)} {...props}><S.Viewport className='p-1'/></S.Content></S.Portal>}
export function SelectItem({className,children,...props}:ComponentProps<typeof S.Item>){return <S.Item className={cn('relative cursor-pointer rounded-lg py-2 pl-8 pr-3 text-sm outline-none data-[highlighted]:bg-violet-500/25',className)} {...props}><span className='absolute left-2 top-2'><S.ItemIndicator><Check size={14}/></S.ItemIndicator></span><S.ItemText>{children}</S.ItemText></S.Item>}
