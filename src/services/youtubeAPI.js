/**
 * YouTube API Service
 * Funções para interagir com YouTube Data API v3
 */

const API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Busca informações de um vídeo do YouTube
 * @param {string} videoId - ID do vídeo
 * @param {string} apiKey - YouTube API Key
 * @returns {Promise<Object>} - Dados do vídeo
 */
export const fetchVideoData = async (videoId, apiKey) => {
  if (!apiKey) {
    throw new Error('API Key não fornecida');
  }

  if (!videoId) {
    throw new Error('ID do vídeo não fornecido');
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
    );

    // Trata erros HTTP
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Requisição inválida. Verifique o ID do vídeo.');
      }
      if (response.status === 403) {
        throw new Error('API Key inválida ou limite de requisições atingido.');
      }
      if (response.status === 404) {
        throw new Error('Vídeo não encontrado.');
      }
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();

    // Verifica se o vídeo existe
    if (!data.items || data.items.length === 0) {
      throw new Error('Vídeo não encontrado ou está privado.');
    }

    const video = data.items[0];

    // Retorna dados formatados
    return {
      videoId: video.id,
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      thumbnail: video.snippet.thumbnails.medium.url,
      views: parseInt(video.statistics.viewCount) || 0,
      duration: video.contentDetails.duration,
      publishedAt: video.snippet.publishedAt,
      description: video.snippet.description || ''
    };
  } catch (error) {
    // Re-throw com mensagem mais clara
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Erro de conexão. Verifique sua internet.');
    }
    throw error;
  }
};

/**
 * Valida formato da API Key do YouTube
 * @param {string} apiKey - API Key para validar
 * @returns {boolean} - True se formato válido
 */
export const validateApiKeyFormat = (apiKey) => {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }
  
  // Formato: AIza seguido de 35 caracteres alfanuméricos, _ ou -
  return /^AIza[A-Za-z0-9_-]{35}$/.test(apiKey);
};

/**
 * Testa se uma API Key está funcionando
 * @param {string} apiKey - API Key para testar
 * @returns {Promise<Object>} - {valid: boolean, error?: string}
 */
export const testApiKey = async (apiKey) => {
  if (!validateApiKeyFormat(apiKey)) {
    return {
      valid: false,
      error: 'Formato de API Key inválido'
    };
  }

  try {
    // Testa com um vídeo público conhecido
    const response = await fetch(
      `${API_BASE_URL}/videos?part=snippet&id=dQw4w9WgXcQ&key=${apiKey}`
    );

    if (response.status === 403) {
      return {
        valid: false,
        error: 'API Key inválida ou sem permissões'
      };
    }

    if (!response.ok) {
      return {
        valid: false,
        error: `Erro ao validar: ${response.status}`
      };
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return {
        valid: false,
        error: 'API Key não retornou resultados'
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error.message || 'Erro ao testar API Key'
    };
  }
};

/**
 * Extrai ID do vídeo de diferentes formatos de URL do YouTube
 * @param {string} url - URL ou ID do vídeo
 * @returns {string|null} - ID do vídeo ou null se inválido
 */
export const extractVideoId = (url) => {
  if (!url) return null;

  // Remove espaços
  url = url.trim();

  // Padrões de URL do YouTube
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // ID direto (11 caracteres)
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Verifica se uma URL é válida do YouTube
 * @param {string} url - URL para validar
 * @returns {boolean} - True se válida
 */
export const isValidYouTubeUrl = (url) => {
  return extractVideoId(url) !== null;
};