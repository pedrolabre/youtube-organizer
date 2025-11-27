import React from 'react';

/**
 * Container - Container responsivo para conteúdo
 * @param {React.ReactNode} children - Conteúdo
 * @param {string} className - Classes adicionais
 * @param {string} maxWidth - Largura máxima: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
 */
const Container = ({ 
  children, 
  className = '', 
  maxWidth = '7xl' 
}) => {
  const maxWidths = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  const maxWidthClass = maxWidths[maxWidth] || maxWidths['7xl'];

  return (
    <div className={`${maxWidthClass} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;