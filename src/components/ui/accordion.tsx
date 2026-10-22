import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
export const Accordion=AccordionPrimitive.Root;
export const AccordionItem=AccordionPrimitive.Item;
export function AccordionTrigger({className,children,...props}:ComponentProps<typeof AccordionPrimitive.Trigger>){return <AccordionPrimitive.Header><AccordionPrimitive.Trigger className={cn('group flex w-full items-center justify-between py-4 text-left font-semibold text-white',className)} {...props}>{children}<ChevronDown size={16} className='transition-transform group-data-[state=open]:rotate-180'/></AccordionPrimitive.Trigger></AccordionPrimitive.Header>}
export function AccordionContent({className,children,...props}:ComponentProps<typeof AccordionPrimitive.Content>){return <AccordionPrimitive.Content className={cn('overflow-hidden text-sm text-white/60 data-[state=open]:animate-in',className)} {...props}><div className='pb-4'>{children}</div></AccordionPrimitive.Content>}
