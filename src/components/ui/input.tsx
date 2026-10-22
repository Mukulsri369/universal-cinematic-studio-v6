import * as React from 'react';
import { cn } from '@/lib/utils';
export const Input=React.forwardRef<HTMLInputElement,React.ComponentProps<'input'>>(function Input({className,...props},ref){return <input ref={ref} className={cn('h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-violet-400',className)} {...props}/>;});
