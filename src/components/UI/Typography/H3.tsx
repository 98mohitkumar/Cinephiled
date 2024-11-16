import React, { forwardRef, ElementType, ReactNode, ComponentPropsWithoutRef } from "react";
import { cn, matches } from "utils/helper";

type H3Props = ComponentPropsWithoutRef<"h3"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "regular" | "medium" | "semibold" | "bold";
};

const H3 = forwardRef<HTMLElement, H3Props>(({ className, children, tag: Element = "h3", weight = "bold", ...props }, ref) => (
  <Element
    ref={ref}
    className={cn(
      "text-h3",
      {
        "font-light": matches(weight, "light"),
        "font-normal": matches(weight, "regular"),
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

H3.displayName = "H3";

export default H3;
