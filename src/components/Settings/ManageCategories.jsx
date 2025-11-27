import React from 'react';
import { Edit2, Trash2, Folder, Calendar } from 'lucide-react';

/**
 * ManageCategories - Lista de categorias com ações de editar/excluir
 * @param {Array} categories - Lista de categorias
 * @param {Function} onEdit - Callback para editar categoria
 * @param {Function} onDelete - Callback para excluir categoria
 */
const ManageCategories = ({ categories = [], onEdit, onDelete }) => {
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <Folder className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nenhuma categoria criada
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Crie sua primeira categoria para começar
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {/* Icon */}
          <div className="flex-shrink-0 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <Folder className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {category.name}
            </h4>
            {category.createdAt && (
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-600 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>Criada em {formatDate(category.createdAt)}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(category)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Editar categoria"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(category)}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Excluir categoria"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {/* Info */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-6">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 Dica: Você também pode editar e excluir categorias diretamente no dashboard clicando no menu (⋮) de cada categoria.
        </p>
      </div>
    </div>
  );
};

export default ManageCategories;