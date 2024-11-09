import React, { forwardRef, ElementType, ReactNode, ComponentPropsWithoutRef } from "react";
import { cn, matches } from "utils/helper";

type H1Props = ComponentPropsWithoutRef<"h1"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "regular" | "medium" | "semiBold" | "bold";
};

const H1 = forwardRef<HTMLElement, H1Props>(({ className, children, tag: Element = "h1", weight = "bold", ...props }, ref) => (
  <Element
    ref={ref}
    className={cn(
      "text-h1",
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

H1.displayName = "H1";

export default H1;
