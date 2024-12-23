import React, { ComponentPropsWithoutRef, forwardRef, ReactNode, ElementType } from "react";

import { cn } from "utils/helper";

type FlexBoxProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  tag: ElementType;
};

const FlexBox = forwardRef<HTMLElement, FlexBoxProps>(({ children, tag: Tag = "div", className, ...props }, ref) => {
  const Element = Tag as React.ElementType;

  return (
    <Element ref={ref} className={cn("flex", className)} {...props}>
      {children}
    </Element>
  );
});

FlexBox.displayName = "FlexBox";

export default FlexBox;
