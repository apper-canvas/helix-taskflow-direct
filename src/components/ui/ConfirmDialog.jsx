import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import Modal from "@/components/ui/Modal";
import ApperIcon from "@/components/ApperIcon";

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
  className 
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  
  const getIcon = () => {
    switch (variant) {
      case "danger":
        return "AlertTriangle";
      case "warning":
        return "AlertCircle";
      case "info":
        return "Info";
      default:
        return "AlertTriangle";
    }
  };
  
  const getIconColor = () => {
    switch (variant) {
      case "danger":
        return "text-error";
      case "warning":
        return "text-warning";
      case "info":
        return "text-info";
      default:
        return "text-error";
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
      className={className}
    >
      <div className="text-center">
        <div className={cn("mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4", 
          variant === "danger" ? "bg-red-100" : 
          variant === "warning" ? "bg-yellow-100" : 
          "bg-blue-100"
        )}>
          <ApperIcon name={getIcon()} className={cn("h-6 w-6", getIconColor())} />
        </div>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        <div className="flex justify-center space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;