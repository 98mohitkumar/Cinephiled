import React, { ComponentPropsWithRef, ReactNode, ElementType } from "react";

import { cn } from "utils/helper";

type FlexBoxProps = ComponentPropsWithRef<"div"> & {
  children: ReactNode;
  tag?: ElementType;
};

const FlexBox = ({ children, tag: Tag = "div", className, ref, ...props }: FlexBoxProps) => {
  const Element = Tag as React.ElementType;

  return (
    <Element ref={ref} className={cn("flex", className)} {...props}>
      {children}
    </Element>
  );
};

export default FlexBox;
