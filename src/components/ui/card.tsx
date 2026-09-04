import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-emerald-100/80 bg-white/90 p-6 md:p-8 shadow-sm shadow-emerald-900/5 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-emerald-900/10 hover:-translate-y-1",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };
