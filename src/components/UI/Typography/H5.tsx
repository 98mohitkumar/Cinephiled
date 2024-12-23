import React, { forwardRef, ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

import { cn, matches } from "utils/helper";

type H5Props = ComponentPropsWithoutRef<"h5"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
};

const H5 = forwardRef<HTMLElement, H5Props>(({ className, children, tag: Element = "h5", weight = "bold", ...props }, ref) => (
  <Element
    ref={ref}
    className={cn(
      "text-h5",
      {
        "font-light": matches(weight, "light"),
        "font-normal": matches(weight, "normal"),
        "font-medium": matches(weight, "medium"),
        "font-semibold": matches(weight, "semibold"),
        "font-bold": matches(weight, "bold")
      },
      className
    )}
    {...props}>
    {children}
  </Element>
));

H5.displayName = "H5";

export default H5;
