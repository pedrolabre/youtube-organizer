import React from 'react';
// CORREÇÃO: Trocamos VideoPlus por Video, pois VideoPlus não existe nesta versão
import { FolderPlus, Video } from 'lucide-react';

/**
 * QuickActions - Cards de ações rápidas do dashboard
 * @param {Function} onCreateCategory - Callback para criar categoria
 * @param {Function} onAddVideo - Callback para adicionar vídeo
 */
const QuickActions = ({ onCreateCategory, onAddVideo }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {/* Create Category */}
      <button
        onClick={onCreateCategory}
        className="group card hover:shadow-card-hover transition-all duration-200 text-left cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
            <FolderPlus className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Criar Categoria
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Organize seus vídeos em categorias personalizadas
            </p>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Add Video */}
      <button
        onClick={onAddVideo}
        className="group card hover:shadow-card-hover transition-all duration-200 text-left cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
            {/* CORREÇÃO: Usando o ícone Video aqui */}
            <Video className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Adicionar Vídeo
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cole o link de um vídeo do YouTube
            </p>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
};

export default QuickActions;