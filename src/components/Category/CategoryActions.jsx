import React from 'react';
import { Plus, ArrowLeft } from 'lucide-react';

/**
 * CategoryActions - Barra de ações da página de categoria
 * @param {Object} category - Dados da categoria atual
 * @param {number} videoCount - Número de vídeos na categoria
 * @param {Function} onBack - Callback para voltar ao dashboard
 * @param {Function} onAddVideo - Callback para adicionar vídeo
 */
const CategoryActions = ({ 
  category, 
  videoCount = 0, 
  onBack, 
  onAddVideo 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      {/* Left side: Back button + Title */}
      <div className="flex items-center gap-4">
        {/* Back button */}
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Category info */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {category.name}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {videoCount} {videoCount === 1 ? 'vídeo' : 'vídeos'}
          </p>
        </div>
      </div>

      {/* Right side: Add video button */}
      <button
        onClick={onAddVideo}
        className="btn-primary flex items-center gap-2 whitespace-nowrap"
      >
        <Plus className="w-4 h-4" />
        <span>Adicionar Vídeo</span>
      </button>
    </div>
  );
};

export default CategoryActions;