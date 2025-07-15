import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const CategoryForm = ({ 
  category = null, 
  onSubmit, 
  onCancel,
  className 
}) => {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    color: category?.color || "text-primary",
    icon: category?.icon || "Folder"
  });
  
  const [errors, setErrors] = useState({});
  
  const availableIcons = [
    "Folder", "Briefcase", "Home", "User", "Heart", "Star", 
    "Calendar", "Clock", "Target", "Zap", "Coffee", "Book"
  ];
  
  const availableColors = [
    { value: "text-primary", name: "Purple", class: "text-primary" },
    { value: "text-blue-600", name: "Blue", class: "text-blue-600" },
    { value: "text-green-600", name: "Green", class: "text-green-600" },
    { value: "text-red-600", name: "Red", class: "text-red-600" },
    { value: "text-yellow-600", name: "Yellow", class: "text-yellow-600" },
    { value: "text-pink-600", name: "Pink", class: "text-pink-600" },
    { value: "text-indigo-600", name: "Indigo", class: "text-indigo-600" },
    { value: "text-orange-600", name: "Orange", class: "text-orange-600" }
  ];
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const categoryData = {
      ...formData,
      name: formData.name.trim()
    };
    
    onSubmit(categoryData);
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
        label="Category Name"
        type="text"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        placeholder="Enter category name..."
        error={errors.name}
        required
      />
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Icon
        </label>
        <div className="grid grid-cols-6 gap-2">
          {availableIcons.map((iconName) => (
            <button
              key={iconName}
              type="button"
              onClick={() => handleInputChange("icon", iconName)}
              className={cn(
                "p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105",
                formData.icon === iconName
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <ApperIcon name={iconName} className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Color
        </label>
        <div className="grid grid-cols-4 gap-2">
          {availableColors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleInputChange("color", color.value)}
              className={cn(
                "p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2",
                formData.color === color.value
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <ApperIcon name={formData.icon} className={cn("h-5 w-5", color.class)} />
              <span className="text-sm">{color.name}</span>
            </button>
          ))}
        </div>
      </div>
      
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
          <ApperIcon name={category ? "Save" : "Plus"} className="h-4 w-4" />
          <span>{category ? "Update Category" : "Add Category"}</span>
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;