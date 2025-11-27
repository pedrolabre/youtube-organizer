import { useState, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY_STORAGE = 'yt_organizer_api_key';

/**
 * useYouTubeAPI - Hook para interagir com YouTube Data API
 * @returns {Object} - Métodos e estado da API
 */
const useYouTubeAPI = () => {
  const [apiKey, setApiKey] = useLocalStorage(API_KEY_STORAGE, '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Validar formato da API Key
  const isValidApiKey = useCallback((key) => {
    return /^AIza[A-Za-z0-9_-]{35}$/.test(key);
  }, []);

  // Buscar dados do vídeo
  const fetchVideoData = useCallback(async (videoId) => {
    if (!apiKey) {
      throw new Error('API Key não configurada. Configure nas Configurações.');
    }

    if (!isValidApiKey(apiKey)) {
      throw new Error('API Key inválida. Verifique nas Configurações.');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('API Key inválida ou limite de requisições atingido');
        }
        throw new Error('Erro ao buscar dados do vídeo');
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        throw new Error('Vídeo não encontrado ou privado');
      }

      const video = data.items[0];

      return {
        videoId: video.id,
        title: video.snippet.title,
        channel: video.snippet.channelTitle,
        thumbnail: video.snippet.thumbnails.medium.url,
        views: parseInt(video.statistics.viewCount) || 0,
        duration: video.contentDetails.duration,
        publishedAt: video.snippet.publishedAt,
        description: video.snippet.description
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, isValidApiKey]);

  // Testar API Key
  const testApiKey = useCallback(async (keyToTest) => {
    if (!isValidApiKey(keyToTest)) {
      return { valid: false, error: 'Formato de API Key inválido' };
    }

    try {
      // Testa com um vídeo conhecido
      const response = await fetch(
        `${API_BASE_URL}/videos?part=snippet&id=dQw4w9WgXcQ&key=${keyToTest}`
      );

      if (response.status === 403) {
        return { valid: false, error: 'API Key inválida ou sem permissões' };
      }

      if (!response.ok) {
        return { valid: false, error: 'Erro ao validar API Key' };
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        return { valid: false, error: 'API Key não está funcionando corretamente' };
      }

      return { valid: true };
    } catch (err) {
      return { valid: false, error: err.message };
    }
  }, [isValidApiKey]);

  // Salvar API Key
  const saveApiKey = useCallback((key) => {
    setApiKey(key);
  }, [setApiKey]);

  // Remover API Key
  const removeApiKey = useCallback(() => {
    setApiKey('');
  }, [setApiKey]);

  return {
    apiKey,
    isLoading,
    error,
    hasApiKey: !!apiKey,
    isValidApiKey,
    fetchVideoData,
    testApiKey,
    saveApiKey,
    removeApiKey
  };
};

export default useYouTubeAPI;