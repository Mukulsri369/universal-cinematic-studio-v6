import type {ComponentProps} from 'react';import {cn} from '@/lib/utils';
export function Kbd({className='',...props}:ComponentProps<'kbd'>){return <kbd {...props} className={cn('rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-xs',className)}/>}
