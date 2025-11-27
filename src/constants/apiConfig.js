/**
 * Configurações da YouTube API
 */

export const YOUTUBE_API = {
  BASE_URL: 'https://www.googleapis.com/youtube/v3',
  QUOTA_LIMIT: 10000, // Requisições por dia (free tier)
  REQUEST_COST: 1, // Custo de uma requisição videos com 3 parts
};

export const API_ERRORS = {
  INVALID_KEY: 'API Key inválida ou sem permissões',
  QUOTA_EXCEEDED: 'Limite diário de requisições atingido',
  VIDEO_NOT_FOUND: 'Vídeo não encontrado ou privado',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  INVALID_REQUEST: 'Requisição inválida'
};

export const YOUTUBE_URL_PATTERNS = [
  /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
  /(?:youtu\.be\/)([^&\n?#]+)/,
  /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
  /(?:m\.youtube\.com\/watch\?v=)([^&\n?#]+)/,
  /^([a-zA-Z0-9_-]{11})$/ // ID direto
];