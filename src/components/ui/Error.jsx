import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="bg-gradient-to-r from-error to-red-600 rounded-full p-4 mb-6">
        <ApperIcon name="AlertTriangle" className="h-8 w-8 text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}. Please try again or contact support if the problem persists.
      </p>
      
      <div className="flex space-x-3">
        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
        )}
        
        <Button
          variant="secondary"
          onClick={() => window.location.reload()}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Home" className="h-4 w-4" />
          <span>Go Home</span>
        </Button>
      </div>
    </div>
  );
};

export default Error;