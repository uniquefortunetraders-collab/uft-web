import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          {
            "bg-[#0b1e13] text-white hover:bg-emerald-900 shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 border border-emerald-900":
              variant === "primary",
            "bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm":
              variant === "secondary",
            "border border-emerald-200 bg-white/90 text-gray-800 hover:bg-emerald-50/80 hover:border-emerald-300 hover:text-pink-600 shadow-sm shadow-pink-500/10 backdrop-blur-sm":
              variant === "outline",
            "text-gray-700 hover:text-pink-600 hover:bg-emerald-100/50":
              variant === "ghost",
            "bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-500/20":
              variant === "gold",
          },
          {
            "px-4 py-2 text-xs": size === "sm",
            "px-6 py-2.5 text-sm": size === "md",
            "px-8 py-3.5 text-base font-semibold": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
