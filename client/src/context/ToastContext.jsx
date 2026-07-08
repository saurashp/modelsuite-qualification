import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => {
          let bg = 'bg-bg-card border-border text-text-primary';
          let icon = 'ℹ️';
          if (toast.type === 'success') {
            bg = 'bg-success/15 border-success/35 text-success';
            icon = '✓';
          } else if (toast.type === 'error') {
            bg = 'bg-danger/15 border-danger/35 text-danger';
            icon = '✕';
          } else if (toast.type === 'warning') {
            bg = 'bg-warning/15 border-warning/35 text-warning';
            icon = '⚠️';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-300 ${bg}`}
              style={{
                animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold shrink-0 border border-current">
                {icon}
              </span>
              <div className="flex-1 text-sm font-medium leading-tight whitespace-pre-line">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-text-muted hover:text-text-primary bg-transparent border-none cursor-pointer text-xs shrink-0 self-center"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
