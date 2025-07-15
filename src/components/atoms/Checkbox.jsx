import React from "react";
import { cn } from "@/utils/cn";

const Checkbox = React.forwardRef(({ 
  className, 
  checked = false,
  ...props 
}, ref) => {
  const baseStyles = "w-5 h-5 rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary cursor-pointer";
  
  const variants = {
    checked: "bg-gradient-to-r from-success to-emerald-600 border-success text-white",
    unchecked: "border-gray-300 hover:border-primary bg-white"
  };
  
  return (
    <input
      type="checkbox"
      className={cn(
        baseStyles,
        checked ? variants.checked : variants.unchecked,
        "checkbox-animation",
        className
      )}
      checked={checked}
      ref={ref}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;