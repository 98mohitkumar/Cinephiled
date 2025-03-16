import React, { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import { cn, matches } from "utils/helper";

type PProps = ComponentPropsWithRef<"p"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  size?:
    | "large"
    | "default"
    | "small"
    | "tiny"
    | "micro"
    | "p-to-large"
    | "small-to-p"
    | "tiny-to-p"
    | "micro-to-p"
    | "tiny-to-small"
    | "micro-to-small"
    | "micro-to-tiny";
};

const P = ({ className, children, tag: Element = "p", size = "default", weight = "normal", ref, ...props }: PProps) => (
  <Element
    ref={ref}
    className={cn(
      {
        "font-light": matches(weight, "light"),
        "font-normal": matches(weight, "normal"),
        "font-medium": matches(weight, "medium"),
        "font-semibold": matches(weight, "semibold"),
        "font-bold": matches(weight, "bold")
      },
      {
        "text-h6": matches(size, "large"),
        "text-p": matches(size, "default"),
        "text-small": matches(size, "small"),
        "text-tiny": matches(size, "tiny"),
        "text-micro": matches(size, "micro"),
        "text-p sm:text-h6": matches(size, "p-to-large"),
        "text-small-to-p": matches(size, "small-to-p"),
        "text-tiny-to-p": matches(size, "tiny-to-p"),
        "text-micro-to-p": matches(size, "micro-to-p"),
        "text-tiny-to-small": matches(size, "tiny-to-small"),
        "text-micro-to-small": matches(size, "micro-to-small"),
        "text-micro-to-tiny": matches(size, "micro-to-tiny")
      },
      className
    )}
    {...props}>
    {children}
  </Element>
);

export default P;
