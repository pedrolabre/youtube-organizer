import React, { useState } from 'react';
import { Youtube, Menu, Settings, ChevronDown, Heart, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

/**
 * Header - Cabeçalho fixo da aplicação
 * @param {Array} categories - Lista de categorias
 * @param {Function} onCategoryClick - Callback ao clicar em categoria
 * @param {Function} onSettingsClick - Callback ao abrir configurações
 * @param {Function} onLogoClick - Callback ao clicar no logo
 */
const Header = ({
  categories = [],
  onCategoryClick,
  onSettingsClick,
  onLogoClick
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { navigateToFavorites, navigateToWatched, navigateToUnwatched } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="p-2 bg-red-500 rounded-lg">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 hidden sm:block">
              YouTube Organizer
            </h1>
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Atalhos de Navegação (Favoritos, Assistidos, etc) */}
            <div className="flex items-center gap-1 sm:gap-2 mr-2 border-r border-gray-200 dark:border-gray-700 pr-4">
              <button
                onClick={navigateToFavorites}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Meus Favoritos"
              >
                <Heart className="w-5 h-5" />
              </button>

              <button
                onClick={navigateToWatched}
                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:text-gray-400 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Vídeos Assistidos"
              >
                <Eye className="w-5 h-5" />
              </button>

              <button
                onClick={navigateToUnwatched}
                className="p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 dark:text-gray-400 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                title="Vídeos Não Assistidos"
              >
                <EyeOff className="w-5 h-5" />
              </button>
            </div>

            {/* Categories dropdown */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Menu className="w-4 h-4" />
                <span className="hidden sm:inline">Categorias</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown menu */}
              {menuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setMenuOpen(false)}
                  />

                  {/* Menu */}
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-40 max-h-96 overflow-y-auto animate-scale-in">
                    {categories.length === 0 ? (
                      <div className="px-4 py-8 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          Nenhuma categoria criada
                        </p>
                      </div>
                    ) : (
                      categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setMenuOpen(false);
                            onCategoryClick(category.id);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {category.name}
                        </button>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Settings button */}
            <button
              onClick={onSettingsClick}
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Configurações"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;