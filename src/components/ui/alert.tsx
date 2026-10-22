import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
export function Alert({className,...props}:ComponentProps<'div'>){return <div role='alert' className={cn('rounded-xl border border-violet-400/20 bg-violet-400/10 p-4 text-sm text-violet-100',className)} {...props}/>;}
export function AlertTitle({className,...props}:ComponentProps<'h3'>){return <h3 className={cn('mb-1 font-semibold',className)} {...props}/>;}
export function AlertDescription({className,...props}:ComponentProps<'div'>){return <div className={cn('leading-6 text-white/65',className)} {...props}/>;}
