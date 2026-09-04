import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "emerald" | "pink" | "gold" | "outline";
}

export function Badge({ className, variant = "emerald", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors",
        {
          "bg-emerald-100 text-emerald-800 border border-emerald-200": variant === "emerald",
          "bg-pink-100 text-pink-700 border border-pink-200": variant === "pink",
          "bg-amber-100 text-amber-800 border border-amber-200": variant === "gold",
          "border border-gray-300 text-gray-700 bg-white": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
