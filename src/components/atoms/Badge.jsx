import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default", 
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    high: "bg-gradient-to-r from-error to-red-600 text-white",
    medium: "bg-gradient-to-r from-warning to-yellow-600 text-white",
    low: "bg-gradient-to-r from-info to-blue-600 text-white",
    success: "bg-gradient-to-r from-success to-emerald-600 text-white",
    category: "bg-gradient-to-r from-primary to-secondary text-white"
  };
  
  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;