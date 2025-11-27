import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Modal - Componente de modal reutilizável
 * @param {boolean} isOpen - Se o modal está aberto
 * @param {Function} onClose - Callback ao fechar
 * @param {string} title - Título do modal
 * @param {React.ReactNode} children - Conteúdo do modal
 * @param {string} size - Tamanho: 'sm' | 'md' | 'lg' | 'xl'
 * @param {boolean} showCloseButton - Se mostra botão de fechar
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true
}) => {
  useEffect(() => {
    if (isOpen) {
      // Previne scroll do body quando modal está aberto
      document.body.style.overflow = 'hidden';
      
      // Fecha com ESC
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full ${sizeClass} max-h-[90vh] overflow-y-auto animate-scale-in`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ml-auto"
                aria-label="Fechar"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;