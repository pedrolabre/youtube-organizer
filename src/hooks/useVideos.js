import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const STORAGE_KEY = 'yt_organizer_videos';

/**
 * useVideos - Hook para gerenciar vídeos
 * @returns {Object} - Métodos e estado dos vídeos
 */
const useVideos = () => {
  const [videos, setVideos] = useLocalStorage(STORAGE_KEY, []);

  // Adicionar vídeo
  const addVideo = useCallback((videoData, categoryId) => {
    const newVideo = {
      id: `vid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      videoId: videoData.videoId,
      title: videoData.title,
      channel: videoData.channel,
      thumbnail: videoData.thumbnail,
      views: videoData.views,
      duration: videoData.duration,
      publishedAt: videoData.publishedAt,
      description: videoData.description,
      addedAt: new Date().toISOString(),
      watched: false,
      favorite: false, // <--- ADICIONADO: Inicia como não favorito
      categories: [categoryId]
    };

    setVideos((prev) => [...prev, newVideo]);
    return newVideo;
  }, [setVideos]);

  // Excluir vídeo
  const deleteVideo = useCallback((id) => {
    setVideos((prev) => prev.filter((video) => video.id !== id));
  }, [setVideos]);

  // Excluir múltiplos vídeos
  const deleteVideos = useCallback((ids) => {
    const idsSet = new Set(ids);
    setVideos((prev) => prev.filter((video) => !idsSet.has(video.id)));
  }, [setVideos]);

  // Atualizar vídeo
  const updateVideo = useCallback((id, updates) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id ? { ...video, ...updates } : video
      )
    );
  }, [setVideos]);

  // Alternar status "visto"
  const toggleWatched = useCallback((id) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id ? { ...video, watched: !video.watched } : video
      )
    );
  }, [setVideos]);

  // --- NOVA FUNÇÃO ADICIONADA ---
  // Alternar status "favorito"
  const toggleFavorite = useCallback((id) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === id ? { ...video, favorite: !video.favorite } : video
      )
    );
  }, [setVideos]);

  // Marcar múltiplos como vistos
  const markMultipleWatched = useCallback((ids, watched = true) => {
    const idsSet = new Set(ids);
    setVideos((prev) =>
      prev.map((video) =>
        idsSet.has(video.id) ? { ...video, watched } : video
      )
    );
  }, [setVideos]);

  // Copiar vídeo para categoria
  const copyToCategory = useCallback((videoId, categoryId) => {
    setVideos((prev) =>
      prev.map((video) => {
        if (video.id === videoId && !video.categories.includes(categoryId)) {
          return {
            ...video,
            categories: [...video.categories, categoryId]
          };
        }
        return video;
      })
    );
  }, [setVideos]);

  // Copiar múltiplos vídeos para categoria
  const copyMultipleToCategory = useCallback((videoIds, categoryId) => {
    const idsSet = new Set(videoIds);
    setVideos((prev) =>
      prev.map((video) => {
        if (idsSet.has(video.id) && !video.categories.includes(categoryId)) {
          return {
            ...video,
            categories: [...video.categories, categoryId]
          };
        }
        return video;
      })
    );
  }, [setVideos]);

  // Mover vídeo para categoria
  const moveToCategory = useCallback((videoId, fromCategoryId, toCategoryId) => {
    setVideos((prev) =>
      prev.map((video) => {
        if (video.id === videoId) {
          const newCategories = video.categories.filter(
            (catId) => catId !== fromCategoryId
          );
          if (!newCategories.includes(toCategoryId)) {
            newCategories.push(toCategoryId);
          }
          return { ...video, categories: newCategories };
        }
        return video;
      })
    );
  }, [setVideos]);

  // Mover múltiplos vídeos para categoria
  const moveMultipleToCategory = useCallback((videoIds, fromCategoryId, toCategoryId) => {
    const idsSet = new Set(videoIds);
    setVideos((prev) =>
      prev.map((video) => {
        if (idsSet.has(video.id)) {
          const newCategories = video.categories.filter(
            (catId) => catId !== fromCategoryId
          );
          if (!newCategories.includes(toCategoryId)) {
            newCategories.push(toCategoryId);
          }
          return { ...video, categories: newCategories };
        }
        return video;
      })
    );
  }, [setVideos]);

  // Buscar vídeo por ID
  const getVideoById = useCallback((id) => {
    return videos.find((video) => video.id === id);
  }, [videos]);

  // Buscar vídeos de uma categoria
  const getCategoryVideos = useCallback((categoryId) => {
    return videos.filter((video) => video.categories.includes(categoryId));
  }, [videos]);

  // Contar vídeos por categoria
  const getVideoCounts = useCallback(() => {
    const counts = {};
    videos.forEach((video) => {
      video.categories.forEach((catId) => {
        counts[catId] = (counts[catId] || 0) + 1;
      });
    });
    return counts;
  }, [videos]);

  // Remover categoria de todos os vídeos
  const removeCategoryFromVideos = useCallback((categoryId) => {
    setVideos((prev) =>
      prev.map((video) => ({
        ...video,
        categories: video.categories.filter((catId) => catId !== categoryId)
      }))
    );
  }, [setVideos]);

  // Excluir vídeos órfãos (sem categoria)
  const deleteOrphanVideos = useCallback(() => {
    setVideos((prev) => prev.filter((video) => video.categories.length > 0));
  }, [setVideos]);

  // Importar vídeos
  const importVideos = useCallback((importedVideos, merge = true) => {
    if (merge) {
      // Mesclar: adiciona novos, mantém existentes
      setVideos((prev) => {
        const existing = new Set(prev.map(v => v.id));
        const newVideos = importedVideos.filter(v => !existing.has(v.id));
        return [...prev, ...newVideos];
      });
    } else {
      // Substituir: remove tudo e adiciona importados
      setVideos(importedVideos);
    }
  }, [setVideos]);

  return {
    videos,
    addVideo,
    deleteVideo,
    deleteVideos,
    updateVideo,
    toggleWatched,
    toggleFavorite, // <--- ADICIONADO: Exportar a função para usar nos botões
    markMultipleWatched,
    copyToCategory,
    copyMultipleToCategory,
    moveToCategory,
    moveMultipleToCategory,
    getVideoById,
    getCategoryVideos,
    getVideoCounts,
    removeCategoryFromVideos,
    deleteOrphanVideos,
    importVideos,
    setVideos
  };
};

export default useVideos;