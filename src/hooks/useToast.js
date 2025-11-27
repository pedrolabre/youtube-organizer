import { useState, useCallback } from 'react';

/**
 * useToast - Hook para gerenciar notificações toast
 * @returns {Object} - Estado e métodos do toast
 */
const useToast = () => {
  const [toast, setToast] = useState(null);

  // Mostrar toast
  const showToast = useCallback((message, type = 'info') => {
    setToast({
      message,
      type, // 'success' | 'error' | 'warning' | 'info'
      id: Date.now()
    });
  }, []);

  // Esconder toast
  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Atalhos para tipos específicos
  const success = useCallback((message) => {
    showToast(message, 'success');
  }, [showToast]);

  const error = useCallback((message) => {
    showToast(message, 'error');
  }, [showToast]);

  const warning = useCallback((message) => {
    showToast(message, 'warning');
  }, [showToast]);

  const info = useCallback((message) => {
    showToast(message, 'info');
  }, [showToast]);

  return {
    toast,
    showToast,
    hideToast,
    success,
    error,
    warning,
    info
  };
};

export default useToast;