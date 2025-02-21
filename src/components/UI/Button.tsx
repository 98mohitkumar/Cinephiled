import { MotionProps, motion } from "motion/react";
import { ComponentPropsWithRef } from "react";

import { cn, matches } from "utils/helper";

type ButtonProps = ComponentPropsWithRef<"button"> &
  Omit<MotionProps, "variants"> & {
    variant?: "primary" | "secondary" | "outline" | "danger";
    size?: "small" | "default" | "large";
    weight?: "normal" | "medium" | "semibold" | "bold";
    fullWidth?: boolean;
    shape?: "rounded" | "circle";
  };

const Button = ({
  children,
  className,
  variant = "primary",
  size = "default",
  weight = "medium",
  ref,
  type = "button",
  fullWidth = false,
  shape = "rounded",
  ...props
}: ButtonProps) => (
  <motion.button
    ref={ref}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className={cn(
      "grid min-w-max place-items-center overflow-clip leading-4",
      "disabled:pointer-events-none disabled:bg-neutral-700 disabled:text-neutral-400",
      "transition-colors ease-in-out",
      {
        "bg-neutral-200 text-black": matches(variant, "primary"),
        "border border-neutral-600 bg-neutral-700 text-white": matches(variant, "secondary"),
        "border border-neutral-600 bg-black text-white disabled:border-neutral-600 disabled:bg-black disabled:text-neutral-400": matches(
          variant,
          "outline"
        ),
        "border border-red-800 bg-red-950 text-white": matches(variant, "danger")
      },
      {
        "h-9 rounded-md px-12 text-small leading-3": matches(size, "small"),
        "h-10 rounded-lg px-16 text-p": matches(size, "default"),
        "h-11 rounded-lg px-24 text-p": matches(size, "large")
      },
      {
        "font-normal": matches(weight, "normal"),
        "font-medium": matches(weight, "medium"),
        "font-semibold": matches(weight, "semibold"),
        "font-bold": matches(weight, "bold")
      },
      {
        "w-full": matches(fullWidth, true)
      },
      {
        "aspect-square rounded-full px-0": matches(shape, "circle")
      },
      className
    )}
    type={type}
    {...props}>
    {children}
  </motion.button>
);

export default Button;
