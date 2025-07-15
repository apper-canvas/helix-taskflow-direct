import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const PrioritySelector = ({ 
  value, 
  onChange, 
  className 
}) => {
  const priorities = [
    { value: "high", label: "High", color: "text-error", icon: "AlertTriangle" },
    { value: "medium", label: "Medium", color: "text-warning", icon: "AlertCircle" },
    { value: "low", label: "Low", color: "text-info", icon: "Minus" }
  ];
  
  return (
    <div className={cn("flex space-x-2", className)}>
      {priorities.map((priority) => (
        <Button
          key={priority.value}
          variant={value === priority.value ? "primary" : "ghost"}
          size="small"
          onClick={() => onChange(priority.value)}
          className="flex items-center space-x-1"
        >
          <ApperIcon name={priority.icon} className={cn("h-4 w-4", priority.color)} />
          <span>{priority.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default PrioritySelector;