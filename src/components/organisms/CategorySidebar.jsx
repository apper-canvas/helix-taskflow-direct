import React from "react";
import { cn } from "@/utils/cn";
import { NavLink } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const CategorySidebar = ({ 
  categories, 
  taskCounts,
  onAddCategory,
  onDeleteCategory,
  className 
}) => {
  const allTasksCount = Object.values(taskCounts).reduce((sum, count) => sum + count, 0);
  
  return (
    <div className={cn("bg-white shadow-sm border-r border-gray-200 h-full", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <Button
            variant="ghost"
            size="small"
            onClick={onAddCategory}
            className="p-2"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="space-y-2">
          {/* All Tasks */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 group",
                isActive && "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center space-x-3">
                  <ApperIcon 
                    name="List" 
                    className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-500")} 
                  />
                  <span className={cn("font-medium", isActive ? "text-white" : "text-gray-700")}>
                    All Tasks
                  </span>
                </div>
                {allTasksCount > 0 && (
                  <Badge variant={isActive ? "default" : "category"}>
                    {allTasksCount}
                  </Badge>
                )}
              </>
            )}
          </NavLink>
          
          {/* Categories */}
          {categories.map((category) => (
            <NavLink
              key={category.Id}
              to={`/category/${category.Id}`}
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 group",
                  isActive && "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center space-x-3">
                    <ApperIcon 
                      name={category.icon} 
                      className={cn("h-5 w-5", isActive ? "text-white" : category.color)} 
                    />
                    <span className={cn("font-medium", isActive ? "text-white" : "text-gray-700")}>
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {taskCounts[category.Id] > 0 && (
                      <Badge variant={isActive ? "default" : "category"}>
                        {taskCounts[category.Id]}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        onDeleteCategory(category.Id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    >
                      <ApperIcon name="X" className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategorySidebar;