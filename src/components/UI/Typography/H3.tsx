import React, { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import { cn, matches } from "utils/helper";

type H3Props = ComponentPropsWithRef<"h3"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
};

const H3 = ({ className, children, tag: Element = "h3", weight = "bold", ref, ...props }: H3Props) => (
  <Element
    ref={ref}
    className={cn(
      "text-h3",
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

export default H3;
