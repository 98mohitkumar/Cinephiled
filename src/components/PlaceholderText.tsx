import { ReactNode } from "react";
import { NoDataText } from "styles/GlobalComponents";
import { cn, matches } from "utils/helper";

type PlaceholderTextProps = {
  className?: string;
  height?: "small" | "large";
  children: ReactNode;
};

const PlaceholderText = ({ className, height = "small", children }: PlaceholderTextProps) => {
  return (
    <div
      className={cn(
        "grid place-items-center",
        {
          "min-h-[20vh]": matches(height, "small"),
          "min-h-[45vh]": matches(height, "large")
        },
        className
      )}>
      <NoDataText className='text-center font-semibold'>{children}</NoDataText>
    </div>
  );
};

export default PlaceholderText;
