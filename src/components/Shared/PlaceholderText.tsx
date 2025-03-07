import { ReactNode } from "react";

import { cn, matches } from "utils/helper";

import H4 from "../UI/Typography/H4";

type PlaceholderTextProps = {
  className?: string;
  height?: "small" | "large";
  children: ReactNode;
};

const PlaceholderText = ({ className, height = "small", children }: PlaceholderTextProps) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-screen-sm select-none place-items-center text-pretty",
        {
          "min-h-[20vh]": matches(height, "small"),
          "min-h-[45vh]": matches(height, "large")
        },
        className
      )}>
      <H4 className='text-center text-neutral-500'>{children}</H4>
    </div>
  );
};

export default PlaceholderText;
