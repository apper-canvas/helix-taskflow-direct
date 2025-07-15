import React from "react";
import { cn } from "@/utils/cn";

const TaskCounter = ({ 
  total, 
  completed, 
  className 
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="text-sm text-gray-600">
        <span className="font-medium text-primary">{completed}</span> of{" "}
        <span className="font-medium">{total}</span> tasks completed
      </div>
      <div className="w-16 bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-success to-emerald-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-success">{percentage}%</span>
    </div>
  );
};

export default TaskCounter;