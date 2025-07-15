import React from "react";
import { cn } from "@/utils/cn";
import TaskItem from "@/components/organisms/TaskItem";
import TaskCounter from "@/components/molecules/TaskCounter";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ui/ApperIcon";
const TaskList = ({ 
  tasks, 
  category,
  onToggleTask, 
  onDeleteTask, 
  onUpdateTask,
  className 
}) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  
  if (totalTasks === 0) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {category ? category.name : "All Tasks"}
            </h2>
            <p className="text-gray-600 mt-1">
              {category ? category.name : "All your tasks in one place"}
            </p>
          </div>
        </div>
        <Empty />
      </div>
    );
  }
  
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasksList = tasks.filter(task => task.completed);
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            {category && (
              <ApperIcon name={category.icon} className="h-6 w-6 text-primary" />
            )}
            <span>{category ? category.name : "All Tasks"}</span>
          </h2>
          <p className="text-gray-600 mt-1">
            {category ? category.name : "All your tasks in one place"}
          </p>
        </div>
        
        <TaskCounter total={totalTasks} completed={completedTasks} />
      </div>
      
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <ApperIcon name="Clock" className="h-5 w-5 text-warning" />
            <span>Pending ({pendingTasks.length})</span>
          </h3>
          <div className="space-y-2">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.Id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                onUpdate={onUpdateTask}
                className="group"
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Completed Tasks */}
      {completedTasksList.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <ApperIcon name="CheckCircle" className="h-5 w-5 text-success" />
            <span>Completed ({completedTasksList.length})</span>
          </h3>
          <div className="space-y-2">
            {completedTasksList.map((task) => (
              <TaskItem
                key={task.Id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                onUpdate={onUpdateTask}
                className="group"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;