import tasksData from "@/services/mockData/tasks.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage for tasks
const STORAGE_KEY = "taskflow_tasks";

// Initialize tasks in localStorage if not exists
const initializeTasks = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksData));
  }
};

// Get tasks from localStorage
const getStoredTasks = () => {
  initializeTasks();
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Save tasks to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const taskService = {
  async getAll() {
    await delay(200);
    return getStoredTasks().sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  async getById(id) {
    await delay(200);
    const tasks = getStoredTasks();
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error(`Task with Id ${id} not found`);
    }
    return { ...task };
  },

  async getByCategory(categoryId) {
    await delay(200);
    const tasks = getStoredTasks();
    return tasks
      .filter(t => t.categoryId === parseInt(categoryId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async create(taskData) {
    await delay(300);
    const tasks = getStoredTasks();
    
    // Find the highest existing Id and add 1
    const maxId = tasks.reduce((max, task) => 
      task.Id > max ? task.Id : max, 0
    );
    
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    tasks.push(newTask);
    saveTasks(tasks);
    
    return { ...newTask };
  },

  async update(id, taskData) {
    await delay(300);
    const tasks = getStoredTasks();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error(`Task with Id ${id} not found`);
    }
    
    const updatedTask = { ...tasks[index], ...taskData };
    
    // Update completedAt timestamp if completion status changes
    if (taskData.completed !== undefined) {
      updatedTask.completedAt = taskData.completed ? new Date().toISOString() : null;
    }
    
    tasks[index] = updatedTask;
    saveTasks(tasks);
    
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(300);
    const tasks = getStoredTasks();
    const filteredTasks = tasks.filter(t => t.Id !== parseInt(id));
    
    if (filteredTasks.length === tasks.length) {
      throw new Error(`Task with Id ${id} not found`);
    }
    
    saveTasks(filteredTasks);
    return true;
  },

  async toggleComplete(id) {
    await delay(300);
    const tasks = getStoredTasks();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error(`Task with Id ${id} not found`);
    }
    
    const task = tasks[index];
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;
    
    saveTasks(tasks);
    
    return { ...task };
  }
};