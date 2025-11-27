import React from 'react';
import { Folder, MoreVertical, Video } from 'lucide-react';
import CategoryMenu from './CategoryMenu';

/**
 * CategoryCard - Card individual de categoria (usado em Grid/Card view)
 * @param {Object} category - Dados da categoria
 * @param {number} videoCount - Número de vídeos na categoria
 * @param {Function} onClick - Callback ao clicar no card
 * @param {Function} onEdit - Callback para editar categoria
 * @param {Function} onDelete - Callback para excluir categoria
 */
const CategoryCard = ({ 
  category, 
  videoCount = 0, 
  onClick, 
  onEdit, 
  onDelete 
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleCardClick = (e) => {
    // Não navega se clicou no menu
    if (e.target.closest('[data-menu]')) {
      return;
    }
    onClick(category.id);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      onClick={handleCardClick}
      className="card cursor-pointer group hover:scale-[1.02] transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        {/* Ícone da categoria */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
          <Folder className="w-6 h-6 text-blue-500 dark:text-blue-400" />
        </div>

        {/* Menu de ações */}
        <div className="relative" data-menu>
          <button
            onClick={handleMenuToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Menu de ações"
          >
            <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {menuOpen && (
            <CategoryMenu
              onEdit={() => {
                setMenuOpen(false);
                onEdit(category);
              }}
              onDelete={() => {
                setMenuOpen(false);
                onDelete(category);
              }}
              onClose={() => setMenuOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Nome da categoria */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
        {category.name}
      </h3>

      {/* Contador de vídeos */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Video className="w-4 h-4" />
        <span>
          {videoCount} {videoCount === 1 ? 'vídeo' : 'vídeos'}
        </span>
      </div>

      {/* Data de criação (opcional) */}
      {category.createdAt && (
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          Criada em {new Date(category.createdAt).toLocaleDateString('pt-BR')}
        </p>
      )}
    </div>
  );
};

export default CategoryCard;