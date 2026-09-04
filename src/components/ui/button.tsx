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
            "bg-[#e6005c] text-white hover:bg-[#cc0052] shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/35 border border-[#e6005c]":
              variant === "primary",
            "bg-slate-900 text-white hover:bg-slate-800 shadow-sm":
              variant === "secondary",
            "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 hover:border-gray-300 hover:text-[#e6005c] shadow-xs":
              variant === "outline",
            "text-gray-700 hover:text-[#e6005c] hover:bg-pink-50/50":
              variant === "ghost",
            "bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-500/20":
              variant === "gold",
          },
          {
            "px-4 py-2 text-xs": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-7 py-3 text-sm font-semibold": size === "lg",
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
