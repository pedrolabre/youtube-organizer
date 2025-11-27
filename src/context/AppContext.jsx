import React, { createContext, useContext, useState } from 'react';
import useCategories from '../hooks/useCategories';
import useVideos from '../hooks/useVideos';
import useYouTubeAPI from '../hooks/useYouTubeAPI';

/**
 * AppContext - Context principal da aplicação
 * Provê acesso global a categorias, vídeos e API
 */

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Hooks de dados
  const categoriesHook = useCategories();
  const videosHook = useVideos();
  const youtubeAPIHook = useYouTubeAPI();
  
  // Estado de navegação
  // Valores agora podem ser: 'dashboard', 'category', 'favorites', 'watched', 'unwatched'
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  // Funções de navegação existentes
  const navigateToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentCategoryId(null);
  };

  const navigateToCategory = (categoryId) => {
    setCurrentView('category');
    setCurrentCategoryId(categoryId);
  };

  // --- NOVAS NAVEGAÇÕES (Adicionadas agora) ---
  const navigateToFavorites = () => {
    setCurrentView('favorites');
    setCurrentCategoryId(null);
  };

  const navigateToWatched = () => {
    setCurrentView('watched');
    setCurrentCategoryId(null);
  };
  
  const navigateToUnwatched = () => {
    setCurrentView('unwatched');
    setCurrentCategoryId(null);
  };

  const value = {
    // Dados
    ...categoriesHook,
    ...videosHook,
    ...youtubeAPIHook,
    
    // Navegação
    currentView,
    currentCategoryId,
    navigateToDashboard,
    navigateToCategory,
    // Exportando as novas funções para o Header usar
    navigateToFavorites,
    navigateToWatched,
    navigateToUnwatched
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook customizado para usar o contexto
export const useApp = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  
  return context;
};

export default AppContext;