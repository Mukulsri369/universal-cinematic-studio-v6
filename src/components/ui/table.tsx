import type {ComponentProps} from 'react';
import {cn} from '@/lib/utils';
export function Table({className,...props}:ComponentProps<'table'>){return <div className='w-full overflow-x-auto'><table className={cn('w-full caption-bottom text-sm',className)} {...props}/></div>}
export function TableHeader(props:ComponentProps<'thead'>){return <thead {...props}/>}
export function TableBody(props:ComponentProps<'tbody'>){return <tbody {...props}/>}
export function TableRow({className,...props}:ComponentProps<'tr'>){return <tr className={cn('border-b border-white/10 transition hover:bg-white/5',className)} {...props}/>}
export function TableHead({className,...props}:ComponentProps<'th'>){return <th className={cn('px-3 py-3 text-left font-semibold text-white/60',className)} {...props}/>}
export function TableCell({className,...props}:ComponentProps<'td'>){return <td className={cn('px-3 py-3 text-white/85',className)} {...props}/>}
