import * as S from '@radix-ui/react-switch';
import {cn} from '@/lib/utils';
import type {ComponentProps} from 'react';
export function Switch({className,...props}:ComponentProps<typeof S.Root>){return <S.Root className={cn('relative inline-flex h-6 w-11 items-center rounded-full border border-white/15 bg-white/15 transition-colors data-[state=checked]:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400',className)} {...props}><S.Thumb className='block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]'/></S.Root>}
