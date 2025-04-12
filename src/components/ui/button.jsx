import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(({ className, variant = "default", size = "default", children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-neutral-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-800": variant === "default",
          "bg-neutral-800 text-neutral-50 hover:bg-neutral-700": variant === "secondary",
          "border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 hover:text-neutral-50": variant === "outline",
          "bg-red-500 text-neutral-50 hover:bg-red-500/90": variant === "destructive",
          "hover:bg-neutral-800 hover:text-neutral-50": variant === "ghost",
          "bg-neutral-900 text-neutral-50 hover:bg-neutral-800": variant === "link",
        },
        {
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
          "h-9 w-9": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

export { Button }; 