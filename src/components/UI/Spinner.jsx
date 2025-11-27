import React from 'react';
import { Loader } from 'lucide-react';

/**
 * Spinner - Indicador de loading
 * @param {string} size - Tamanho: 'sm' | 'md' | 'lg' | 'xl'
 * @param {string} message - Mensagem a exibir
 * @param {boolean} fullScreen - Se ocupa tela inteira
 */
const Spinner = ({ size = 'md', message, fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const sizeClass = sizes[size] || sizes.md;

  const spinnerElement = (
    <div className="flex flex-col items-center gap-3">
      <Loader className={`${sizeClass} text-blue-500 animate-spin`} />
      {message && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 z-50">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};

/**
 * SpinnerOverlay - Spinner com overlay (para uso em containers)
 */
export const SpinnerOverlay = ({ message }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-40 rounded-lg">
      <Spinner size="lg" message={message} />
    </div>
  );
};

export default Spinner;