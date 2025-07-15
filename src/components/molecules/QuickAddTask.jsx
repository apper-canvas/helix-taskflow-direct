import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const QuickAddTask = ({ 
  onAdd, 
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
      setIsExpanded(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
      setTitle("");
    }
  };
  
  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        className={cn("fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl z-50", className)}
        variant="primary"
      >
        <ApperIcon name="Plus" className="h-6 w-6" />
      </Button>
    );
  }
  
  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl p-4 min-w-[300px]">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
            autoFocus
          />
          <Button
            type="submit"
            size="small"
            variant="primary"
            disabled={!title.trim()}
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="small"
            variant="ghost"
            onClick={() => {
              setIsExpanded(false);
              setTitle("");
            }}
          >
            <ApperIcon name="X" className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Press <span className="keyboard-hint">Enter</span> to add or <span className="keyboard-hint">Esc</span> to cancel
        </div>
      </form>
    </div>
  );
};

export default QuickAddTask;