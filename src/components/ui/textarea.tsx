import type {ComponentProps} from 'react';import {cn} from '@/lib/utils';
export function Textarea({className='',...props}:ComponentProps<'textarea'>){return <textarea {...props} className={cn('min-h-28 w-full resize-y rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus-visible:outline-2 focus-visible:outline-violet-400',className)}/>}
