import { cva, VariantProps } from "class-variance-authority";
import { MotionProps, motion } from "motion/react";
import { ComponentPropsWithRef } from "react";

import { cn } from "utils/helper";

const buttonClasses = cva("grid min-w-max place-items-center overflow-clip leading-4 transition-colors ease-in-out", {
  variants: {
    variant: {
      primary: "bg-neutral-200 text-black",
      secondary: "border border-neutral-600 bg-neutral-700 text-white",
      outline: "border border-neutral-600 bg-black text-white",
      danger: "border border-red-800 bg-red-950 text-white"
    },
    size: {
      small: "h-9 px-12 text-small leading-3",
      medium: "h-10 px-16 text-p",
      large: "h-11 px-24 text-p"
    },
    shape: {
      rounded: "",
      circle: "rounded-full aspect-square px-0",
      pill: "rounded-3xl"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    },
    fullWidth: {
      true: "w-full"
    },
    disabled: {
      true: "disabled:bg-neutral-700 disabled:text-neutral-400 border-none cursor-not-allowed"
    }
  },
  compoundVariants: [
    {
      size: "small",
      shape: "rounded",
      className: "rounded-md"
    },
    {
      size: ["medium", "large"],
      shape: "rounded",
      className: "rounded-lg"
    },
    {
      size: ["small", "medium", "large"],
      shape: "pill",
      className: "rounded-3xl px-16"
    }
  ],
  defaultVariants: {
    variant: "primary",
    size: "medium",
    weight: "medium",
    shape: "rounded",
    fullWidth: false,
    disabled: false
  }
});

type ButtonProps = ComponentPropsWithRef<"button"> & Omit<MotionProps, "variants"> & VariantProps<typeof buttonClasses>;

const Button = ({ children, className, variant, size, weight, ref, type = "button", fullWidth = false, shape, disabled, ...props }: ButtonProps) => (
  <motion.button
    ref={ref}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className={cn(buttonClasses({ variant, size, weight, fullWidth, shape, disabled }), className)}
    type={type}
    disabled={disabled}
    {...props}>
    {children}
  </motion.button>
);

export default Button;
