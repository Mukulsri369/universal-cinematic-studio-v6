import * as S from '@radix-ui/react-separator';
import {cn} from '@/lib/utils';
import type {ComponentProps} from 'react';
export function Separator({className,orientation='horizontal',...props}:ComponentProps<typeof S.Root>){return <S.Root orientation={orientation} className={cn('shrink-0 bg-white/10',orientation==='horizontal'?'h-px w-full':'h-full w-px',className)} {...props}/>}
