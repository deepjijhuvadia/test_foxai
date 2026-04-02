"use client";

import { HTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ filter: "brightness(1.1)" }}
        whileTap={{ scale: 0.98, y: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={cn(
          "inline-flex items-center justify-center font-bold font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none appearance-none cursor-pointer",
          {
            "bg-primary text-black": variant === "primary",
            "bg-surface-300 text-primary border border-surface-400 hover:bg-surface-400":
              variant === "secondary",
            "bg-transparent text-secondary hover:text-primary hover:bg-surface-200":
              variant === "ghost",
            "bg-error/10 text-error border border-error/50 hover:bg-error/20":
              variant === "danger",
            "bg-success/10 text-success border border-success/50 hover:bg-success/20":
              variant === "success",
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 py-2": size === "md",
            "h-12 px-8 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
