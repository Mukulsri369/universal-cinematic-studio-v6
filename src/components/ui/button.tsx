import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 disabled:pointer-events-none disabled:opacity-50', {
  variants: { variant: {
    default: 'bg-violet-500 px-5 py-3 text-white hover:bg-violet-400',
    outline: 'border border-white/20 bg-white/5 px-5 py-3 text-white hover:bg-white/10',
    ghost: 'px-4 py-3 text-white hover:bg-white/10',
    destructive: 'bg-red-500 px-5 py-3 text-white hover:bg-red-600',
  }, size: { default: 'h-11', sm: 'h-9 text-xs', lg: 'h-13 text-base', icon: 'size-10 px-0' } },
  defaultVariants: { variant: 'default', size: 'default' },
});
type Props = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean };
export function Button({ asChild=false, variant, size, className, ...props }: Props) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({variant,size}),className)} {...props}/>;
}
export { buttonVariants };
