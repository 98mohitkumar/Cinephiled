import React, { ComponentPropsWithRef } from "react";

import { cn } from "utils/helper";

const LayoutContainer = ({ children, className, ref, ...props }: ComponentPropsWithRef<"div">) => {
  return (
    <div ref={ref} className={cn("mx-auto w-full px-1664", className)} {...props}>
      {children}
    </div>
  );
};

export default LayoutContainer;
