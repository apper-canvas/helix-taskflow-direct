import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "medium", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary hover:scale-105 focus:ring-primary shadow-lg hover:shadow-xl",
    secondary: "bg-white text-primary border border-primary hover:bg-primary hover:text-white hover:scale-105 focus:ring-primary shadow-sm hover:shadow-md",
    ghost: "text-gray-600 hover:text-primary hover:bg-gray-100 focus:ring-gray-300 hover:scale-105",
    success: "bg-gradient-to-r from-success to-emerald-600 text-white hover:from-emerald-600 hover:to-success hover:scale-105 focus:ring-success shadow-lg hover:shadow-xl",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:from-red-600 hover:to-error hover:scale-105 focus:ring-error shadow-lg hover:shadow-xl"
  };
  
  const sizes = {
    small: "px-3 py-1.5 text-sm rounded-md",
    medium: "px-4 py-2 text-sm rounded-lg",
    large: "px-6 py-3 text-base rounded-lg"
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
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

export default Button;