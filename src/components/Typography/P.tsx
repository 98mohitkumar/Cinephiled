import { forwardRef, ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn, matches } from "utils/helper";

type PProps = ComponentPropsWithoutRef<"p"> & {
  className?: string;
  children: ReactNode;
  tag?: ElementType;
  weight?: "light" | "regular" | "medium" | "semiBold" | "bold";
  size?: "large" | "default" | "small" | "tiny" | "micro";
};

const P = forwardRef<HTMLElement, PProps>(({ className, children, tag: Element = "p", size = "default", weight = "regular", ...props }, ref) => (
  <Element
    ref={ref}
    className={cn(
      {
        "font-light": matches(weight, "light"),
        "font-regular": matches(weight, "regular"),
        "font-medium": matches(weight, "medium"),
        "font-semibold": matches(weight, "semiBold"),
        "font-bold": matches(weight, "bold")
      },
      {
        "text-h6": matches(size, "large"),
        "text-p": matches(size, "default"),
        "text-small": matches(size, "small"),
        "text-tiny": matches(size, "tiny"),
        "text-micro": matches(size, "micro")
      },
      className
    )}
    {...props}>
    {children}
  </Element>
));

P.displayName = "P";

export default P;
