import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import PrioritySelector from "@/components/molecules/PrioritySelector";
import ApperIcon from "@/components/ApperIcon";

const TaskForm = ({ 
  task = null, 
  categories = [],
  onSubmit, 
  onCancel,
  className 
}) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    priority: task?.priority || "medium",
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "",
    categoryId: task?.categoryId || (categories[0]?.Id || "")
  });
  
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const taskData = {
      ...formData,
      title: formData.title.trim(),
      dueDate: formData.dueDate || null
    };
    
    onSubmit(taskData);
  };
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <FormField
        label="Task Title"
        type="text"
        value={formData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        placeholder="Enter task title..."
        error={errors.title}
        required
      />
      
      <FormField
        label="Category"
        type="select"
        value={formData.categoryId}
        onChange={(e) => handleInputChange("categoryId", e.target.value)}
        error={errors.categoryId}
        required
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.Id} value={category.Id}>
            {category.name}
          </option>
        ))}
      </FormField>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <PrioritySelector
          value={formData.priority}
          onChange={(priority) => handleInputChange("priority", priority)}
        />
      </div>
      
      <FormField
        label="Due Date"
        type="date"
        value={formData.dueDate}
        onChange={(e) => handleInputChange("dueDate", e.target.value)}
        error={errors.dueDate}
      />
      
      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex items-center space-x-2"
        >
          <ApperIcon name={task ? "Save" : "Plus"} className="h-4 w-4" />
          <span>{task ? "Update Task" : "Add Task"}</span>
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;