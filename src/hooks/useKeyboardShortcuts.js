import { useEffect } from "react";

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't trigger shortcuts when typing in input fields
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.contentEditable === "true"
      ) {
        return;
      }
      
      const key = event.key.toLowerCase();
      const ctrlKey = event.ctrlKey || event.metaKey;
      const shiftKey = event.shiftKey;
      
      shortcuts.forEach((shortcut) => {
        const shortcutKey = shortcut.key.toLowerCase();
        const shortcutCtrl = shortcut.ctrl || false;
        const shortcutShift = shortcut.shift || false;
        
        if (
          key === shortcutKey &&
          ctrlKey === shortcutCtrl &&
          shiftKey === shortcutShift
        ) {
          event.preventDefault();
          shortcut.action();
        }
      });
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]);
};