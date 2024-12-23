import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "utils/helper";

type InputProps = ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "text-p",
        "h-10 rounded-lg px-12 py-8",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "bg-neutral-600 text-neutral-100 placeholder:text-neutral-400",
        "border border-neutral-500 ring-offset-black focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus-visible:outline-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
