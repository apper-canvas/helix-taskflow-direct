import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const TaskItem = ({ 
  task, 
  onToggle, 
  onDelete, 
  onUpdate,
  className 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isCompleting, setIsCompleting] = useState(false);
  
  const handleToggle = async () => {
    setIsCompleting(true);
    await onToggle(task.Id);
    
    if (!task.completed) {
      // Add completion animation delay
      setTimeout(() => {
        setIsCompleting(false);
      }, 300);
    } else {
      setIsCompleting(false);
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };
  
  const handleSave = () => {
    if (editTitle.trim() && editTitle.trim() !== task.title) {
      onUpdate(task.Id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };
  
  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "text-error";
      case "medium":
        return "text-warning";
      case "low":
        return "text-info";
      default:
        return "text-gray-400";
    }
  };
  
  const getPriorityIcon = () => {
    switch (task.priority) {
      case "high":
        return "AlertTriangle";
      case "medium":
        return "AlertCircle";
      case "low":
        return "Minus";
      default:
        return "Minus";
    }
  };
  
  const formatDueDate = (date) => {
    if (!date) return null;
    
    const dueDate = new Date(date);
    
    if (isToday(dueDate)) {
      return "Today";
    } else if (isTomorrow(dueDate)) {
      return "Tomorrow";
    } else {
      return format(dueDate, "MMM d");
    }
  };
  
  const getDueDateColor = () => {
    if (!task.dueDate) return "text-gray-500";
    
    const dueDate = new Date(task.dueDate);
    
    if (isPast(dueDate) && !isToday(dueDate)) {
      return "text-error";
    } else if (isToday(dueDate)) {
      return "text-warning";
    } else if (isTomorrow(dueDate)) {
      return "text-info";
    }
    
    return "text-gray-500";
  };
  
  return (
    <div
      className={cn(
        "bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200",
        task.completed && "opacity-75 bg-gray-50",
        isCompleting && "animate-slide-out",
        className
      )}
    >
      <div className="flex items-center space-x-3">
        <Checkbox
          checked={task.completed}
          onChange={handleToggle}
          className="flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="w-full"
              autoFocus
            />
          ) : (
            <div className="flex items-center space-x-2">
              <h3
                className={cn(
                  "text-sm font-medium text-gray-900 truncate cursor-pointer hover:text-primary transition-colors",
                  task.completed && "line-through text-gray-500"
                )}
                onClick={handleEdit}
              >
                {task.title}
              </h3>
              <ApperIcon 
                name={getPriorityIcon()} 
                className={cn("h-4 w-4 flex-shrink-0", getPriorityColor())} 
              />
            </div>
          )}
          
          <div className="flex items-center space-x-2 mt-1">
            {task.dueDate && (
              <div className={cn("flex items-center space-x-1 text-xs", getDueDateColor())}>
                <ApperIcon name="Calendar" className="h-3 w-3" />
                <span>{formatDueDate(task.dueDate)}</span>
              </div>
            )}
            
            <Badge variant={task.priority}>
              {task.priority}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="small"
            onClick={handleEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ApperIcon name="Edit2" className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="small"
            onClick={() => onDelete(task.Id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;