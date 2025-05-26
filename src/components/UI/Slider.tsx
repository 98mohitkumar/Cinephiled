import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "utils/helper";

const SliderRoot = ({ className, ref, children, ...props }: React.ComponentPropsWithRef<typeof SliderPrimitive.Root>) => (
  <SliderPrimitive.Root ref={ref} className={cn("relative flex h-12 w-full touch-none select-none items-center", className)} {...props}>
    {children}
  </SliderPrimitive.Root>
);

const SliderTrack = ({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof SliderPrimitive.Track> & {}) => (
  <SliderPrimitive.Track ref={ref} className={cn("relative h-1.5 w-full grow overflow-hidden rounded-full", "bg-neutral-700", className)} {...props}>
    {children}
  </SliderPrimitive.Track>
);

const SliderRange = ({ className, ref, ...props }: React.ComponentPropsWithRef<typeof SliderPrimitive.Range> & {}) => (
  <SliderPrimitive.Range ref={ref} className={cn("absolute h-full overflow-hidden rounded-full", "bg-neutral-300", className)} {...props} />
);

const SliderThumb = ({ className, ref, ...props }: React.ComponentPropsWithRef<typeof SliderPrimitive.Thumb>) => (
  <SliderPrimitive.Thumb
    ref={ref}
    className={cn(
      "focus-visible:ring-ring block h-4 w-4 cursor-pointer rounded-full border-2 border-neutral-300 bg-neutral-900 shadow-lg focus:ring-neutral-300 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
);

export { SliderRoot, SliderTrack, SliderRange, SliderThumb };
