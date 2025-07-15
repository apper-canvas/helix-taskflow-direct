import React from "react";
import { cn } from "@/utils/cn";

const Label = React.forwardRef(({ 
  className, 
  children,
  required = false,
  ...props 
}, ref) => {
  const baseStyles = "block text-sm font-medium text-gray-700 mb-1";
  
  return (
    <label
      className={cn(baseStyles, className)}
      ref={ref}
      {...props}
    >
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  );
});

Label.displayName = "Label";

export default Label;