import React, { createContext, useContext } from 'react';
import useTheme from '../hooks/useTheme';

/**
 * ThemeContext - Context para gerenciar tema
 */

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const themeHook = useTheme();

  return (
    <ThemeContext.Provider value={themeHook}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useThemeContext deve ser usado dentro de ThemeProvider');
  }
  
  return context;
};

export default ThemeContext;