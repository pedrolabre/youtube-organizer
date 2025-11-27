import React from 'react';
import CategoryCardView from '../Category/CategoryCardView';
import CategoryGrid from '../Category/CategoryGrid';
import CategoryList from '../Category/CategoryList';

/**
 * CategoryDisplay - Renderiza categorias no modo selecionado
 * @param {Array} categories - Lista de categorias
 * @param {Object} videoCounts - Contagem de vídeos por categoria
 * @param {Function} getCategoryVideos - Função para obter vídeos
 * @param {string} viewMode - Modo de visualização: 'card' | 'grid' | 'list'
 * @param {Function} onCategoryClick - Callback ao clicar em categoria
 * @param {Function} onEdit - Callback para editar
 * @param {Function} onDelete - Callback para excluir
 */
const CategoryDisplay = ({
  categories,
  videoCounts,
  getCategoryVideos,
  viewMode,
  onCategoryClick,
  onEdit,
  onDelete
}) => {
  const commonProps = {
    categories,
    videoCounts,
    onCategoryClick,
    onEdit,
    onDelete
  };

  switch (viewMode) {
    case 'card':
      return (
        <CategoryCardView
          {...commonProps}
          getCategoryVideos={getCategoryVideos}
        />
      );
    
    case 'list':
      return <CategoryList {...commonProps} />;
    
    case 'grid':
    default:
      return <CategoryGrid {...commonProps} />;
  }
};

export default CategoryDisplay;