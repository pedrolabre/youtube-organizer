import React from 'react';
import { Folder, MoreVertical, Video, Calendar } from 'lucide-react';
import CategoryMenu from './CategoryMenu';

/**
 * CategoryList - Exibe categorias em formato de lista vertical (mais detalhes)
 * @param {Array} categories - Lista de categorias
 * @param {Object} videoCounts - Objeto com contagem de vídeos por categoria
 * @param {Function} onCategoryClick - Callback ao clicar em uma categoria
 * @param {Function} onEdit - Callback para editar categoria
 * @param {Function} onDelete - Callback para excluir categoria
 */
const CategoryList = ({ 
  categories = [], 
  videoCounts = {}, 
  onCategoryClick, 
  onEdit, 
  onDelete 
}) => {
  const [openMenuId, setOpenMenuId] = React.useState(null);

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <span className="text-3xl">📋</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nenhuma categoria ainda
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Crie sua primeira categoria para começar
        </p>
      </div>
    );
  }

  const handleMenuToggle = (categoryId, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === categoryId ? null : categoryId);
  };

  return (
    <div className="space-y-2 animate-fade-in">
      {categories.map((category) => {
        const videoCount = videoCounts[category.id] || 0;
        const createdDate = new Date(category.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });

        return (
          <div
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="card cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group"
          >
            <div className="flex items-center gap-4">
              {/* Ícone */}
              <div className="flex-shrink-0 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <Folder className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              </div>

              {/* Informações */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate mb-1">
                  {category.name}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {/* Contador de vídeos */}
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    <span>{videoCount} {videoCount === 1 ? 'vídeo' : 'vídeos'}</span>
                  </div>

                  {/* Data de criação */}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{createdDate}</span>
                  </div>
                </div>
              </div>

              {/* Menu de ações */}
              <div className="relative flex-shrink-0" data-menu>
                <button
                  onClick={(e) => handleMenuToggle(category.id, e)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Menu de ações"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>

                {openMenuId === category.id && (
                  <CategoryMenu
                    onEdit={() => {
                      setOpenMenuId(null);
                      onEdit(category);
                    }}
                    onDelete={() => {
                      setOpenMenuId(null);
                      onDelete(category);
                    }}
                    onClose={() => setOpenMenuId(null)}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;