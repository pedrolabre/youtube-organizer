import React from 'react';
import { Folder, MoreVertical, Video, Play } from 'lucide-react';
import CategoryMenu from './CategoryMenu';

/**
 * CategoryCardView - Cards grandes de categoria com preview de vídeos
 * @param {Array} categories - Lista de categorias
 * @param {Object} videoCounts - Contagem de vídeos por categoria
 * @param {Function} getCategoryVideos - Função que retorna vídeos de uma categoria
 * @param {Function} onCategoryClick - Callback ao clicar na categoria
 * @param {Function} onEdit - Callback para editar
 * @param {Function} onDelete - Callback para excluir
 */
const CategoryCardView = ({ 
  categories = [], 
  videoCounts = {}, 
  getCategoryVideos = () => [],
  onCategoryClick, 
  onEdit, 
  onDelete 
}) => {
  const [openMenuId, setOpenMenuId] = React.useState(null);

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <span className="text-4xl">🎬</span>
        </div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nenhuma categoria criada
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Organize seus vídeos criando categorias personalizadas
        </p>
      </div>
    );
  }

  const handleMenuToggle = (categoryId, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === categoryId ? null : categoryId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      {categories.map((category) => {
        const videoCount = videoCounts[category.id] || 0;
        const categoryVideos = getCategoryVideos(category.id).slice(0, 4); // Primeiros 4 vídeos

        return (
          <div
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="card cursor-pointer hover:shadow-card-hover transition-all duration-200 group"
          >
            {/* Header do card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                  <Folder className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <Video className="w-4 h-4" />
                    <span>{videoCount} {videoCount === 1 ? 'vídeo' : 'vídeos'}</span>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="relative" data-menu>
                <button
                  onClick={(e) => handleMenuToggle(category.id, e)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Menu"
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

            {/* Preview de vídeos */}
            {categoryVideos.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {categoryVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group/video"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Overlay com play icon */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/video:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>

                    {/* Badge de "Visto" */}
                    {video.watched && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-video bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="text-center">
                  <Video className="w-8 h-8 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Nenhum vídeo ainda
                  </p>
                </div>
              </div>
            )}

            {/* Mais vídeos (se houver) */}
            {videoCount > 4 && (
              <div className="mt-3 text-sm text-blue-500 dark:text-blue-400 font-medium">
                +{videoCount - 4} {videoCount - 4 === 1 ? 'vídeo' : 'vídeos'}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryCardView;