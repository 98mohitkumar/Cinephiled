import React, { forwardRef, ElementType, ReactNode, ComponentPropsWithoutRef } from "react";
import { cn, matches } from "utils/helper";

type H4Props = ComponentPropsWithoutRef<"h4"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "regular" | "medium" | "semiBold" | "bold";
};

const H4 = forwardRef<HTMLElement, H4Props>(({ className, children, tag: Element = "h4", weight = "bold", ...props }, ref) => (
  <Element
    ref={ref}
    className={cn(
      "text-h4",
      {
        "font-light": matches(weight, "light"),
        "font-normal": matches(weight, "regular"),
        "font-medium": matches(weight, "medium"),
        "font-semibold": matches(weight, "semiBold"),
        "font-bold": matches(weight, "bold")
      },
      className
    )}
    {...props}>
    {children}
  </Element>
));

H4.displayName = "H4";

export default H4;
