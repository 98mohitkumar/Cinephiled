import React, { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import { cn, matches } from "utils/helper";

type H5Props = ComponentPropsWithRef<"h5"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
};

const H5 = ({ className, children, tag: Element = "h5", weight = "bold", ref, ...props }: H5Props) => (
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
);

export default H5;
