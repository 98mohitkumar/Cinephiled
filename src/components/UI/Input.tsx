import { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "utils/helper";

import FlexBox from "./FlexBox";

type InputProps = ComponentPropsWithRef<"input"> & {
  fullWidth?: boolean;
  suffix?: ReactNode;
};

const Input = ({ className, type, ref, suffix, fullWidth = false, ...props }: InputProps) => {
  return (
    <FlexBox className={cn("relative", { "w-full": fullWidth })}>
      <input
        type={type}
        className={cn(
          "text-p",
          "h-10 rounded-lg px-12 py-8 ",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "bg-neutral-600 text-neutral-100 placeholder:text-neutral-400",
          "border border-neutral-500 ring-offset-black focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus-visible:outline-none",
          { "w-full": fullWidth },
          { "pr-40": suffix },
          className
        )}
        ref={ref}
        {...props}
      />

      {suffix && <div className='absolute right-0 top-0 flex h-full items-center px-12'>{suffix}</div>}
    </FlexBox>
  );
};

export default Input;

type InputLabelProps = ComponentPropsWithRef<"label"> & {
  required?: boolean;
};

export const InputLabel = ({ children, className, required = false, ...props }: InputLabelProps) => {
  return (
    <label className={cn("mb-6 inline-block text-p font-medium text-neutral-200", className)} {...props}>
      {children}
      {required && <span className='text-red-500'>*</span>}
    </label>
  );
};
