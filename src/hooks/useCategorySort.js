import { useState, useMemo } from 'react';

/**
 * useCategorySort - Hook para ordenação de categorias
 * @param {Array} categories - Lista de categorias
 */
const useCategorySort = (categories = []) => {
  const [sortOption, setSortOption] = useState('dateCreatedDesc'); // Padrão: Mais novas primeiro

  const sortedCategories = useMemo(() => {
    const itemsCopy = [...categories];

    switch (sortOption) {
      case 'dateCreatedDesc': // Data: Mais recente -> Mais antiga
        return itemsCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      case 'dateCreatedAsc': // Data: Mais antiga -> Mais recente
        return itemsCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      case 'nameAsc': // A-Z
        return itemsCopy.sort((a, b) => a.name.localeCompare(b.name));

      case 'nameDesc': // Z-A
        return itemsCopy.sort((a, b) => b.name.localeCompare(a.name));

      default:
        return itemsCopy;
    }
  }, [categories, sortOption]);

  return { sortedCategories, sortOption, setSortOption };
};

export default useCategorySort;