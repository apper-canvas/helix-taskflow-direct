import React, { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { useTasks } from "@/hooks/useTasks";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import CategoryForm from "@/components/organisms/CategoryForm";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Layout = () => {
  const { categories, loading, error, addCategory, deleteCategory, refetch } = useCategories();
  const { tasks } = useTasks();
  
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Calculate task counts per category
  const taskCounts = useMemo(() => {
    const counts = {};
    categories.forEach(category => {
      counts[category.Id] = tasks.filter(task => task.categoryId === category.Id).length;
    });
    return counts;
  }, [categories, tasks]);
  
  // Handle category form submission
  const handleCategoryFormSubmit = async (categoryData) => {
    if (editingCategory) {
      // Update functionality would go here
      setEditingCategory(null);
    } else {
      await addCategory(categoryData);
    }
    setShowCategoryForm(false);
  };
  
  // Handle category deletion
  const handleDeleteCategory = async (categoryId) => {
    setDeleteConfirm(categoryId);
  };
  
  const confirmDelete = async () => {
    if (deleteConfirm) {
      await deleteCategory(deleteConfirm);
      setDeleteConfirm(null);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Error message={error} onRetry={refetch} />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <Button
            variant="ghost"
            size="small"
            onClick={() => setSidebarOpen(true)}
            className="p-2"
          >
            <ApperIcon name="Menu" className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="h-screen sticky top-0">
            <CategorySidebar
              categories={categories}
              taskCounts={taskCounts}
              onAddCategory={() => setShowCategoryForm(true)}
              onDeleteCategory={handleDeleteCategory}
            />
          </div>
        </div>
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => setSidebarOpen(false)}
                  className="p-2"
                >
                  <ApperIcon name="X" className="h-4 w-4" />
                </Button>
              </div>
              <CategorySidebar
                categories={categories}
                taskCounts={taskCounts}
                onAddCategory={() => {
                  setShowCategoryForm(true);
                  setSidebarOpen(false);
                }}
                onDeleteCategory={handleDeleteCategory}
              />
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
      
      {/* Category form modal */}
      <Modal
        isOpen={showCategoryForm}
        onClose={() => {
          setShowCategoryForm(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? "Edit Category" : "Add New Category"}
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={handleCategoryFormSubmit}
          onCancel={() => {
            setShowCategoryForm(false);
            setEditingCategory(null);
          }}
        />
      </Modal>
      
      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? All tasks in this category will also be deleted."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};

export default Layout;