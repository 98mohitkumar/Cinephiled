import { forwardRef, ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn, matches } from "utils/helper";

type PProps = ComponentPropsWithoutRef<"p"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "regular" | "medium" | "semibold" | "bold";
  size?:
    | "large"
    | "default"
    | "small"
    | "tiny"
    | "micro"
    | "small-to-p"
    | "tiny-to-p"
    | "micro-to-p"
    | "tiny-to-small"
    | "micro-to-small"
    | "micro-to-tiny";
};

const P = forwardRef<HTMLElement, PProps>(({ className, children, tag: Element = "p", size = "default", weight = "regular", ...props }, ref) => (
  <Element
    ref={ref}
    className={cn(
      {
        "font-light": matches(weight, "light"),
        "font-regular": matches(weight, "regular"),
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
));

P.displayName = "P";

export default P;
