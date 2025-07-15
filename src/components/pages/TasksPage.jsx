import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/organisms/TaskForm";
import QuickAddTask from "@/components/molecules/QuickAddTask";
import SearchBar from "@/components/molecules/SearchBar";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const TasksPage = () => {
  const { categoryId } = useParams();
  const { tasks, loading, error, addTask, updateTask, deleteTask, toggleTask, refetch } = useTasks(categoryId);
  const { categories } = useCategories();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  // Get current category
  const currentCategory = categoryId ? categories.find(c => c.Id === parseInt(categoryId)) : null;
  
  // Filter tasks based on search and filters
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
      const matchesStatus = statusFilter === "all" || 
        (statusFilter === "completed" && task.completed) ||
        (statusFilter === "pending" && !task.completed);
      
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, searchQuery, priorityFilter, statusFilter]);
  
  // Handle quick add task
  const handleQuickAdd = async (title) => {
    const defaultCategoryId = categoryId || (categories[0]?.Id || 1);
    
    await addTask({
      title,
      priority: "medium",
      categoryId: parseInt(defaultCategoryId),
      dueDate: null
    });
  };
  
  // Handle task form submission
  const handleTaskFormSubmit = async (taskData) => {
    if (editingTask) {
      await updateTask(editingTask.Id, taskData);
      setEditingTask(null);
    } else {
      await addTask(taskData);
    }
    setShowTaskForm(false);
  };
  
  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    setDeleteConfirm(taskId);
  };
  
  const confirmDelete = async () => {
    if (deleteConfirm) {
      await deleteTask(deleteConfirm);
      setDeleteConfirm(null);
    }
  };
  
  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: "n",
      ctrl: true,
      action: () => setShowTaskForm(true)
    },
    {
      key: "f",
      ctrl: true,
      action: () => document.querySelector('input[type="text"]')?.focus()
    }
  ]);
  
  if (loading) {
    return <Loading />;
  }
  
  if (error) {
    return <Error message={error} onRetry={refetch} />;
  }
  
  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
            />
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full sm:w-auto"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </Select>
            
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Select>
            
            <Button
              variant="primary"
              onClick={() => setShowTaskForm(true)}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              <span>Add Task</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Task list */}
      <TaskList
        tasks={filteredTasks}
        category={currentCategory}
        onToggleTask={toggleTask}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={updateTask}
      />
      
      {/* Quick add floating button */}
      <QuickAddTask onAdd={handleQuickAdd} />
      
      {/* Task form modal */}
      <Modal
        isOpen={showTaskForm}
        onClose={() => {
          setShowTaskForm(false);
          setEditingTask(null);
        }}
        title={editingTask ? "Edit Task" : "Add New Task"}
      >
        <TaskForm
          task={editingTask}
          categories={categories}
          onSubmit={handleTaskFormSubmit}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      </Modal>
      
      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default TasksPage;