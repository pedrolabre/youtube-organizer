import { useState, useMemo } from 'react';

/**
 * useSearch - Hook para busca em vídeos
 * @param {Array} videos - Lista de vídeos
 * @returns {Object} - Estado e métodos de busca
 */
const useSearch = (videos = []) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra vídeos baseado no termo de busca
  const filteredVideos = useMemo(() => {
    if (!searchTerm.trim()) {
      return videos;
    }

    const term = searchTerm.toLowerCase().trim();

    return videos.filter((video) => {
      const titleMatch = video.title.toLowerCase().includes(term);
      const channelMatch = video.channel.toLowerCase().includes(term);
      
      return titleMatch || channelMatch;
    });
  }, [videos, searchTerm]);

  // Limpar busca
  const clearSearch = () => {
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredVideos,
    clearSearch,
    hasSearchTerm: !!searchTerm.trim()
  };
};

export default useSearch;