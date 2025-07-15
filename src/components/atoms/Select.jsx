import React from "react";
import { cn } from "@/utils/cn";

const Select = React.forwardRef(({ 
  className, 
  children,
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 border rounded-lg font-medium bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "border-gray-300 focus:border-primary focus:ring-primary",
    error: "border-error focus:border-error focus:ring-error"
  };
  
  return (
    <select
      className={cn(
        baseStyles,
        error ? variants.error : variants.default,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

export default Select;