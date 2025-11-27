/**
 * Video Parser Utilities
 * Funções para extrair e validar URLs do YouTube
 */

/**
 * Extrai ID do vídeo de diferentes formatos de URL
 * @param {string} url - URL ou ID do vídeo
 * @returns {string|null} - ID do vídeo ou null
 */
export const extractVideoId = (url) => {
  if (!url) return null;

  // Remove espaços
  url = url.trim();

  // Padrões suportados
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /(?:youtu\.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
    /(?:m\.youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /(?:youtube\.com\/v\/)([^&\n?#]+)/,
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
 * Valida se é uma URL válida do YouTube
 * @param {string} url - URL para validar
 * @returns {boolean}
 */
export const isValidYouTubeUrl = (url) => {
  return extractVideoId(url) !== null;
};

/**
 * Gera URL do YouTube a partir do ID
 * @param {string} videoId - ID do vídeo
 * @returns {string} - URL completa
 */
export const generateYouTubeUrl = (videoId) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

/**
 * Gera URL da thumbnail em diferentes qualidades
 * @param {string} videoId - ID do vídeo
 * @param {string} quality - Qualidade: 'default' | 'medium' | 'high' | 'maxres'
 * @returns {string} - URL da thumbnail
 */
export const getThumbnailUrl = (videoId, quality = 'medium') => {
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault'
  };

  const qualityKey = qualityMap[quality] || qualityMap.medium;
  return `https://i.ytimg.com/vi/${videoId}/${qualityKey}.jpg`;
};