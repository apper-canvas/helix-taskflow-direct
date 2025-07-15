import React from "react";
import { cn } from "@/utils/cn";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search tasks...", 
  className,
  ...props 
}) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 pr-4 py-2 w-full bg-white border-gray-300 rounded-lg focus:ring-primary focus:border-primary shadow-sm"
        {...props}
      />
      {value && (
        <button
          onClick={() => onChange({ target: { value: "" } })}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <ApperIcon name="X" className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;