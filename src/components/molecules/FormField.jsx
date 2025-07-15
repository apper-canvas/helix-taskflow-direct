import React from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  required = false,
  className,
  children,
  ...props 
}) => {
  const renderInput = () => {
    if (type === "select") {
      return (
        <Select error={!!error} {...props}>
          {children}
        </Select>
      );
    }
    
    return <Input type={type} error={!!error} {...props} />;
  };
  
  return (
    <div className={cn("space-y-1", className)}>
      <Label required={required}>{label}</Label>
      {renderInput()}
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;