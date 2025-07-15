import categoriesData from "@/services/mockData/categories.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage for categories
const STORAGE_KEY = "taskflow_categories";

// Initialize categories in localStorage if not exists
const initializeCategories = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categoriesData));
  }
};

// Get categories from localStorage
const getStoredCategories = () => {
  initializeCategories();
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Save categories to localStorage
const saveCategories = (categories) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

export const categoryService = {
  async getAll() {
    await delay(200);
    return getStoredCategories().sort((a, b) => a.position - b.position);
  },

  async getById(id) {
    await delay(200);
    const categories = getStoredCategories();
    const category = categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error(`Category with Id ${id} not found`);
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    const categories = getStoredCategories();
    
    // Find the highest existing Id and add 1
    const maxId = categories.reduce((max, category) => 
      category.Id > max ? category.Id : max, 0
    );
    
    const newCategory = {
      Id: maxId + 1,
      ...categoryData,
      position: categories.length + 1
    };
    
    categories.push(newCategory);
    saveCategories(categories);
    
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(300);
    const categories = getStoredCategories();
    const index = categories.findIndex(c => c.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error(`Category with Id ${id} not found`);
    }
    
    categories[index] = { ...categories[index], ...categoryData };
    saveCategories(categories);
    
    return { ...categories[index] };
  },

  async delete(id) {
    await delay(300);
    const categories = getStoredCategories();
    const filteredCategories = categories.filter(c => c.Id !== parseInt(id));
    
    if (filteredCategories.length === categories.length) {
      throw new Error(`Category with Id ${id} not found`);
    }
    
    saveCategories(filteredCategories);
    return true;
  }
};