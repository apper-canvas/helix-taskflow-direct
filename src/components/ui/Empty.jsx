import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Add your first task to get started with your productivity journey!", 
  actionText = "Add Task",
  onAction,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-6 mb-6">
        <ApperIcon name="CheckSquare" className="h-12 w-12 text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {description}
      </p>
      
      <Button
        variant="primary"
        size="large"
        onClick={onAction}
        className="flex items-center space-x-2"
      >
        <ApperIcon name="Plus" className="h-5 w-5" />
        <span>{actionText}</span>
      </Button>
      
      <div className="mt-8 text-sm text-gray-500">
        <p className="mb-2">Pro tip: Use keyboard shortcuts to work faster</p>
        <div className="flex items-center justify-center space-x-4">
          <span><span className="keyboard-hint">Ctrl + N</span> Add task</span>
          <span><span className="keyboard-hint">Enter</span> Complete task</span>
          <span><span className="keyboard-hint">Del</span> Delete task</span>
        </div>
      </div>
    </div>
  );
};

export default Empty;