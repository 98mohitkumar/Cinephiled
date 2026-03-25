import React, { ComponentPropsWithRef, ElementType } from "react";

import { cn } from "utils/helper";

type LayoutContainerProps = ComponentPropsWithRef<"div"> & {
  tag?: ElementType;
};

const LayoutContainer = ({ children, className, ref, tag: Tag = "div", ...props }: LayoutContainerProps) => {
  const Element = Tag as React.ElementType;

  return (
    <Element ref={ref} className={cn("mx-auto w-full px-1664", className)} {...props}>
      {children}
    </Element>
  );
};

export default LayoutContainer;
