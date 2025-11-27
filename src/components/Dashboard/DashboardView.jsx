import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Container from '../Layout/Container';
import QuickActions from './QuickActions';
import CategoryDisplay from './CategoryDisplay';
import ViewToggle from '../UI/ViewToggle';
import SortSelect from '../UI/SortSelect'; // <--- Import Novo
import useCategorySort from '../../hooks/useCategorySort'; // <--- Import Novo

/**
 * DashboardView - Tela principal do dashboard
 * @param {Array} categories - Lista de categorias
 * @param {Object} videoCounts - Contagem de vídeos por categoria
 * @param {Function} getCategoryVideos - Função para obter vídeos de uma categoria
 * @param {Function} onCreateCategory - Callback para criar categoria
 * @param {Function} onAddVideo - Callback para adicionar vídeo
 * @param {Function} onCategoryClick - Callback ao clicar em categoria
 * @param {Function} onEditCategory - Callback para editar categoria
 * @param {Function} onDeleteCategory - Callback para excluir categoria
 */
const DashboardView = ({
  categories = [],
  videoCounts = {},
  getCategoryVideos = () => [],
  onCreateCategory,
  onAddVideo,
  onCategoryClick,
  onEditCategory,
  onDeleteCategory
}) => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Filtrar Categorias pela Busca
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Ordenar Categorias (Usando o Hook Novo)
  const { sortedCategories, sortOption, setSortOption } = useCategorySort(filteredCategories);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Container className="py-8">
        {/* Quick Actions */}
        <QuickActions
          onCreateCategory={onCreateCategory}
          onAddVideo={onAddVideo}
        />

        {/* --- BARRA DE FILTRO E ORDENAÇÃO (NOVO) --- */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar categoria..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <SortSelect 
            value={sortOption} 
            onChange={setSortOption} 
            mode="category" 
          />
        </div>

        {/* Header da Seção + View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Minhas Categorias
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {sortedCategories.length} {sortedCategories.length === 1 ? 'categoria' : 'categorias'}
            </p>
          </div>

          <ViewToggle value={viewMode} onChange={setViewMode} />
        </div>

        {/* Categories Display - Usando a lista ordenada */}
        <CategoryDisplay
          categories={sortedCategories} // <--- Passando a lista processada
          videoCounts={videoCounts}
          getCategoryVideos={getCategoryVideos}
          viewMode={viewMode}
          onCategoryClick={onCategoryClick}
          onEdit={onEditCategory}
          onDelete={onDeleteCategory}
        />

        {/* Feedback de Busca Vazia */}
        {sortedCategories.length === 0 && searchTerm && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Nenhuma categoria encontrada para "{searchTerm}"
          </div>
        )}

        {/* Empty state (Apenas se não tiver nenhuma categoria criada e não estiver buscando) */}
        {categories.length === 0 && !searchTerm && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <span className="text-4xl">📁</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
              Bem-vindo ao YouTube Organizer!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Comece criando sua primeira categoria para organizar seus vídeos favoritos do YouTube
            </p>
            <button
              onClick={onCreateCategory}
              className="btn-primary"
            >
              Criar Primeira Categoria
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default DashboardView;