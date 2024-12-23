import React, { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import { cn, matches } from "utils/helper";

type H2Props = ComponentPropsWithRef<"h2"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
};

const H2 = ({ className, children, tag: Element = "h2", weight = "bold", ref, ...props }: H2Props) => (
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
);

export default H2;
