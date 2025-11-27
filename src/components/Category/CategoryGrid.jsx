import React from 'react';
import CategoryCard from './CategoryCard';

/**
 * CategoryGrid - Exibe categorias em layout de grid (múltiplas colunas)
 * @param {Array} categories - Lista de categorias
 * @param {Object} videoCounts - Objeto com contagem de vídeos por categoria {categoryId: count}
 * @param {Function} onCategoryClick - Callback ao clicar em uma categoria
 * @param {Function} onEdit - Callback para editar categoria
 * @param {Function} onDelete - Callback para excluir categoria
 */
const CategoryGrid = ({ 
  categories = [], 
  videoCounts = {}, 
  onCategoryClick, 
  onEdit, 
  onDelete 
}) => {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <span className="text-3xl">📁</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nenhuma categoria ainda
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Crie sua primeira categoria para começar a organizar seus vídeos
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          videoCount={videoCounts[category.id] || 0}
          onClick={onCategoryClick}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;