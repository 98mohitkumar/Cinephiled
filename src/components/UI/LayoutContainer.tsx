import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "utils/helper";

const LayoutContainer = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("mx-auto w-full px-1664", className)} {...props}>
      {children}
    </div>
  );
});

LayoutContainer.displayName = "LayoutContainer";

export default LayoutContainer;
