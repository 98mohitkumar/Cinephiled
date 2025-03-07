import React, { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import { cn, matches } from "utils/helper";

type H6Props = ComponentPropsWithRef<"h6"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
};

const H6 = ({ className, children, tag: Element = "h6", weight = "bold", ref, ...props }: H6Props) => (
  <Element
    ref={ref}
    className={cn(
      "text-h6",
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
);

export default H6;
