import { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/common/Toast';

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }, [removeToast]);

  // Helpers for common types
  const toast = {
    success: (msg, duration) => addToast(msg, 'success', duration),
    error:   (msg, duration) => addToast(msg, 'error', duration),
    info:    (msg, duration) => addToast(msg, 'info', duration),
    warning: (msg, duration) => addToast(msg, 'warning', duration),
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toast }}>
      {children}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Safe fallback if used outside provider
    return { addToast: () => {}, removeToast: () => {}, toast: { success: () => {}, error: () => {}, info: () => {}, warning: () => {} } };
  }
  return ctx;
}
