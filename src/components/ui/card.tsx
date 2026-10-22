import * as React from 'react';
import { cn } from '@/lib/utils';
export function Card({className,...props}:React.ComponentProps<'div'>) {return <div className={cn('rounded-2xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/10',className)} {...props}/>;}
export function CardHeader({className,...props}:React.ComponentProps<'div'>) {return <div className={cn('px-6 pt-6 pb-2',className)} {...props}/>;}
export function CardTitle({className,...props}:React.ComponentProps<'h3'>) {return <h3 className={cn('font-bold text-lg text-white',className)} {...props}/>;}
export function CardDescription({className,...props}:React.ComponentProps<'p'>) {return <p className={cn('text-sm leading-relaxed text-white/60',className)} {...props}/>;}
export function CardContent({className,...props}:React.ComponentProps<'div'>) {return <div className={cn('px-6 pb-6',className)} {...props}/>;}
