import React, { forwardRef, ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

import { cn, matches } from "utils/helper";

type H2Props = ComponentPropsWithoutRef<"h2"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
};

const H2 = forwardRef<HTMLElement, H2Props>(({ className, children, tag: Element = "h2", weight = "bold", ...props }, ref) => (
  <Element
    ref={ref}
    className={cn(
      "text-h2",
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

H2.displayName = "H2";

export default H2;
