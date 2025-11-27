import React, { createContext, useContext } from 'react';
import useToast from '../hooks/useToast';
import Toast from '../components/UI/Toast';

/**
 * ToastContext - Context para gerenciar notificações toast
 */

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const toastHook = useToast();
  const { toast, hideToast } = toastHook;

  return (
    <ToastContext.Provider value={toastHook}>
      {children}
      
      {/* Renderiza Toast se existir */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useToastContext = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToastContext deve ser usado dentro de ToastProvider');
  }
  
  return context;
};

export default ToastContext;