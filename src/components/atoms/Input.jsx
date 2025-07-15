import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text", 
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 border rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "border-gray-300 focus:border-primary focus:ring-primary",
    error: "border-error focus:border-error focus:ring-error"
  };
  
  return (
    <input
      type={type}
      className={cn(
        baseStyles,
        error ? variants.error : variants.default,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;