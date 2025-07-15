import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className }) => {
  return (
    <div className={cn("animate-pulse space-y-4", className)}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64"></div>
        </div>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-32"></div>
      </div>
      
      {/* Task list skeleton */}
      <div className="space-y-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded border-2"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-12"></div>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;