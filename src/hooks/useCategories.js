import { useState, useEffect } from "react";
import { categoryService } from "@/services/api/categoryService";
import { toast } from "react-toastify";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const categoriesData = await categoryService.getAll();
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };
  
  const addCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      toast.success("Category added successfully!");
      return newCategory;
    } catch (err) {
      toast.error("Failed to add category");
      throw err;
    }
  };
  
  const updateCategory = async (id, categoryData) => {
    try {
      const updatedCategory = await categoryService.update(id, categoryData);
      setCategories(prev => prev.map(category => 
        category.Id === id ? updatedCategory : category
      ));
      toast.success("Category updated successfully!");
      return updatedCategory;
    } catch (err) {
      toast.error("Failed to update category");
      throw err;
    }
  };
  
  const deleteCategory = async (id) => {
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(category => category.Id !== id));
      toast.success("Category deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete category");
      throw err;
    }
  };
  
  useEffect(() => {
    loadCategories();
  }, []);
  
  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    refetch: loadCategories
  };
};