import { MotionProps, motion } from "framer-motion";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn, matches } from "utils/helper";

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  Omit<MotionProps, "variants"> & {
    variant?: "primary" | "secondary";
    size?: "small" | "default" | "large";
    weight?: "normal" | "medium" | "semiBold" | "bold";
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", size = "default", weight = "medium", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          {
            "bg-neutral-200 text-black": matches(variant, "primary"),
            "bg-neutral-700 text-white": matches(variant, "secondary")
          },
          {
            "rounded-md px-12 py-6 text-small": matches(size, "small"),
            "rounded-lg px-16 py-8 text-p": matches(size, "default"),
            "rounded-xl px-20 py-10 text-h6": matches(size, "large")
          },
          {
            "font-normal": matches(weight, "normal"),
            "font-medium": matches(weight, "medium"),
            "font-semiBold": matches(weight, "semiBold"),
            "font-bold": matches(weight, "bold")
          },
          className
        )}
        {...props}>
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
