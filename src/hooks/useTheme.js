import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const THEME_STORAGE_KEY = 'yt_organizer_theme';

/**
 * useTheme - Hook para gerenciar tema claro/escuro
 * @returns {Object} - Estado e métodos do tema
 */
const useTheme = () => {
  const [theme, setTheme] = useLocalStorage(THEME_STORAGE_KEY, 'light');

  // Aplicar tema ao DOM
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove classes anteriores
    root.classList.remove('light', 'dark');
    
    // Adiciona classe do tema atual
    root.classList.add(theme);
  }, [theme]);

  // Alternar tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };
};

export default useTheme;