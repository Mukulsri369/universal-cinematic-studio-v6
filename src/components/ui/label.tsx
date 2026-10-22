import type {ComponentProps} from 'react';import {cn} from '@/lib/utils';
export function Label({className='',...props}:ComponentProps<'label'>){return <label {...props} className={cn('block text-sm font-medium text-white/80',className)}/>}
