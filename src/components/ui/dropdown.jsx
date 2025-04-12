import * as React from "react";
import { cn } from "../../lib/utils";

const Dropdown = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative inline-block text-left",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
Dropdown.displayName = "Dropdown";

const DropdownTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-neutral-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
DropdownTrigger.displayName = "DropdownTrigger";

const DropdownContent = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-neutral-900 shadow-lg ring-1 ring-neutral-800 ring-opacity-5 focus:outline-none",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownContent.displayName = "DropdownContent";

const DropdownItem = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "block w-full px-4 py-2 text-left text-sm text-neutral-200 hover:bg-neutral-800",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});
DropdownItem.displayName = "DropdownItem";

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem }; 