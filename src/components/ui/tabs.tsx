import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
export const Tabs=TabsPrimitive.Root;
export function TabsList({className,...props}:ComponentProps<typeof TabsPrimitive.List>){return <TabsPrimitive.List className={cn('inline-flex rounded-xl bg-white/[0.07] p-1',className)} {...props}/>;}
export function TabsTrigger({className,...props}:ComponentProps<typeof TabsPrimitive.Trigger>){return <TabsPrimitive.Trigger className={cn('rounded-lg px-4 py-2 text-sm text-white/65 transition data-[state=active]:bg-violet-500 data-[state=active]:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400',className)} {...props}/>;}
export const TabsContent=TabsPrimitive.Content;
