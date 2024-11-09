import React, { forwardRef, ElementType, ReactNode, ComponentPropsWithoutRef } from "react";
import { cn, matches } from "utils/helper";

type H6Props = ComponentPropsWithoutRef<"h6"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "regular" | "medium" | "semiBold" | "bold";
};

const H6 = forwardRef<HTMLElement, H6Props>(({ className, children, tag: Element = "h6", weight = "bold", ...props }, ref) => (
  <Element
    ref={ref}
    className={cn(
      "text-h6",
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

H6.displayName = "H6";

export default H6;
