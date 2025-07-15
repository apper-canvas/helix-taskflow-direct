import { useState, useEffect } from "react";
import { taskService } from "@/services/api/taskService";
import { toast } from "react-toastify";

export const useTasks = (categoryId = null) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let tasksData;
      if (categoryId) {
        tasksData = await taskService.getByCategory(categoryId);
      } else {
        tasksData = await taskService.getAll();
      }
      
      setTasks(tasksData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };
  
  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success("Task added successfully!");
      return newTask;
    } catch (err) {
      toast.error("Failed to add task");
      throw err;
    }
  };
  
  const updateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.update(id, taskData);
      setTasks(prev => prev.map(task => 
        task.Id === id ? updatedTask : task
      ));
      toast.success("Task updated successfully!");
      return updatedTask;
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  };
  
  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== id));
      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task");
      throw err;
    }
  };
  
  const toggleTask = async (id) => {
    try {
      const updatedTask = await taskService.toggleComplete(id);
      setTasks(prev => prev.map(task => 
        task.Id === id ? updatedTask : task
      ));
      
      if (updatedTask.completed) {
        toast.success("Task completed! 🎉");
      } else {
        toast.info("Task marked as incomplete");
      }
      
      return updatedTask;
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  };
  
  useEffect(() => {
    loadTasks();
  }, [categoryId]);
  
  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    refetch: loadTasks
  };
};