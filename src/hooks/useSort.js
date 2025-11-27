import { useState, useMemo } from 'react';

/**
 * useSort - Hook para ordenação de vídeos
 * @param {Array} videos - Lista de vídeos
 * @param {string} initialSort - Ordenação inicial
 * @returns {Object} - Estado e métodos de ordenação
 */
const useSort = (videos = [], initialSort = 'dateAddedDesc') => {
  const [sortOption, setSortOption] = useState(initialSort);

  // Função de comparação para duração ISO 8601
  const parseDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
  };

  // Vídeos ordenados
  const sortedVideos = useMemo(() => {
    const videosCopy = [...videos];

    switch (sortOption) {
      // Data de adição
      case 'dateAddedDesc':
        return videosCopy.sort((a, b) => 
          new Date(b.addedAt) - new Date(a.addedAt)
        );
      
      case 'dateAddedAsc':
        return videosCopy.sort((a, b) => 
          new Date(a.addedAt) - new Date(b.addedAt)
        );

      // Data de publicação
      case 'datePublishedDesc':
        return videosCopy.sort((a, b) => 
          new Date(b.publishedAt) - new Date(a.publishedAt)
        );
      
      case 'datePublishedAsc':
        return videosCopy.sort((a, b) => 
          new Date(a.publishedAt) - new Date(b.publishedAt)
        );

      // Título
      case 'titleAsc':
        return videosCopy.sort((a, b) => 
          a.title.localeCompare(b.title, 'pt-BR')
        );
      
      case 'titleDesc':
        return videosCopy.sort((a, b) => 
          b.title.localeCompare(a.title, 'pt-BR')
        );

      // Visualizações
      case 'viewsDesc':
        return videosCopy.sort((a, b) => b.views - a.views);
      
      case 'viewsAsc':
        return videosCopy.sort((a, b) => a.views - b.views);

      // Duração
      case 'durationDesc':
        return videosCopy.sort((a, b) => 
          parseDuration(b.duration) - parseDuration(a.duration)
        );
      
      case 'durationAsc':
        return videosCopy.sort((a, b) => 
          parseDuration(a.duration) - parseDuration(b.duration)
        );

      default:
        return videosCopy;
    }
  }, [videos, sortOption]);

  return {
    sortOption,
    setSortOption,
    sortedVideos
  };
};

export default useSort;