import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// Layout
import Header from './components/Layout/Header';

// Views
import DashboardView from './components/Dashboard/DashboardView';
import CategoryPage from './components/Category/CategoryPage';
// --- NOVAS VIEWS IMPORTADAS AQUI ---
import FavoritesView from './components/Dashboard/FavoritesView';
import WatchedView from './components/Dashboard/WatchedView';
import UnwatchedView from './components/Dashboard/UnwatchedView';

// Modals
import CategoryForm from './components/Category/CategoryForm';
import VideoForm from './components/Video/VideoForm';
import SettingsModal from './components/Settings/SettingsModal';
import { DeleteCategoryModal } from './components/Modals/DeleteConfirmModal';
import MoveCopyModal from './components/Modals/MoveCopyModal';

// Services
import { exportAll, exportCategory } from './services/exportImport';

/**
 * AppContent - Componente principal da aplicação
 */
const AppContent = () => {
  const {
    // Categorias
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    
    // Vídeos
    videos,
    addVideo,
    getCategoryVideos,
    getVideoCounts,
    removeCategoryFromVideos,
    
    // API
    fetchVideoData,
    apiKey,
    saveApiKey,
    
    // Navegação
    currentView,
    currentCategoryId,
    navigateToDashboard,
    navigateToCategory
  } = useApp();

  const { theme, toggleTheme } = useThemeContext();

  // Estados dos modais
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [videoFormOpen, setVideoFormOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  
  // Handlers de Categoria
  const handleCreateCategory = () => {
    setEditingCategory(null);
    setCategoryFormOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryFormOpen(true);
  };

  const handleDeleteCategory = (category) => {
    setDeleteCategoryModal(category);
  };

  const handleCategoryFormSubmit = async (name) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, name);
    } else {
      addCategory(name);
    }
    setCategoryFormOpen(false);
    setEditingCategory(null);
  };

  const handleConfirmDeleteCategory = async (keepVideos) => {
    if (deleteCategoryModal) {
      if (!keepVideos) {
        removeCategoryFromVideos(deleteCategoryModal.id);
      }
      deleteCategory(deleteCategoryModal.id);
      setDeleteCategoryModal(null);
      
      if (currentCategoryId === deleteCategoryModal.id) {
        navigateToDashboard();
      }
    }
  };

  // Handlers de Vídeo
  const handleAddVideo = () => {
    setVideoFormOpen(true);
  };

  const handleVideoFormSubmit = async ({ videoId, categoryId }) => {
    try {
      const videoData = await fetchVideoData(videoId);
      addVideo(videoData, categoryId);
      setVideoFormOpen(false);
    } catch (error) {
      throw error;
    }
  };

  // Handlers de Export
  const handleExport = (type, categoryId) => {
    if (type === 'all') {
      exportAll(categories, videos);
    } else if (type === 'category' && categoryId) {
      const category = getCategoryById(categoryId);
      exportCategory(category, videos);
    }
  };

  // Handlers de Import
  const handleImport = (data, merge) => {
    console.log('Import:', data, merge);
  };

  const videoCounts = getVideoCounts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <Header
        categories={categories}
        onCategoryClick={navigateToCategory}
        onSettingsClick={() => setSettingsOpen(true)}
        onLogoClick={navigateToDashboard}
      />

      {/* Main Content - Roteamento */}
      {currentView === 'dashboard' && (
        <DashboardView
          categories={categories}
          videoCounts={videoCounts}
          getCategoryVideos={getCategoryVideos}
          onCreateCategory={handleCreateCategory}
          onAddVideo={handleAddVideo}
          onCategoryClick={navigateToCategory}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      )}
      
      {currentView === 'category' && (
        <CategoryPage
          categoryId={currentCategoryId}
          onBack={navigateToDashboard}
        />
      )}

      {/* --- NOVAS VIEWS CONECTADAS --- */}
      {currentView === 'favorites' && <FavoritesView />}
      {currentView === 'watched' && <WatchedView />}
      {currentView === 'unwatched' && <UnwatchedView />}

      {/* Modals */}
      {categoryFormOpen && (
        <CategoryForm
          category={editingCategory}
          existingCategories={categories}
          onSubmit={handleCategoryFormSubmit}
          onCancel={() => {
            setCategoryFormOpen(false);
            setEditingCategory(null);
          }}
        />
      )}

      {videoFormOpen && (
        <VideoForm
          categories={categories}
          selectedCategoryId={currentCategoryId}
          onSubmit={handleVideoFormSubmit}
          onCancel={() => setVideoFormOpen(false)}
          fetchVideoData={fetchVideoData}
        />
      )}

      {settingsOpen && (
        <SettingsModal
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          theme={theme}
          onThemeChange={toggleTheme}
          apiKey={apiKey}
          onApiKeyChange={saveApiKey}
          categories={categories}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
          onExport={handleExport}
          onImport={handleImport}
        />
      )}

      {deleteCategoryModal && (
        <DeleteCategoryModal
          isOpen={!!deleteCategoryModal}
          onClose={() => setDeleteCategoryModal(null)}
          onConfirm={handleConfirmDeleteCategory}
          categoryName={deleteCategoryModal.name}
          videoCount={videoCounts[deleteCategoryModal.id] || 0}
        />
      )}
    </div>
  );
};

/**
 * App - Componente raiz com providers
 */
const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;