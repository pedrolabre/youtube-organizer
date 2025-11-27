/**
 * Validators Utilities
 * Funções de validação
 */

/**
 * Valida nome de categoria
 * @param {string} name - Nome a validar
 * @param {Array} existingCategories - Categorias existentes
 * @param {string} excludeId - ID para excluir da validação (ao editar)
 * @returns {Object} - {valid: boolean, error?: string}
 */
export const validateCategoryName = (name, existingCategories = [], excludeId = null) => {
  // Verifica se está vazio
  if (!name || !name.trim()) {
    return {
      valid: false,
      error: 'O nome da categoria não pode estar vazio'
    };
  }

  const trimmed = name.trim();

  // Verifica tamanho mínimo
  if (trimmed.length < 2) {
    return {
      valid: false,
      error: 'O nome deve ter pelo menos 2 caracteres'
    };
  }

  // Verifica tamanho máximo
  if (trimmed.length > 50) {
    return {
      valid: false,
      error: 'O nome deve ter no máximo 50 caracteres'
    };
  }

  // Verifica duplicatas
  const isDuplicate = existingCategories.some(
    (cat) =>
      cat.name.toLowerCase() === trimmed.toLowerCase() &&
      cat.id !== excludeId
  );

  if (isDuplicate) {
    return {
      valid: false,
      error: 'Já existe uma categoria com este nome'
    };
  }

  return { valid: true };
};

/**
 * Valida formato de API Key do YouTube
 * @param {string} apiKey - API Key
 * @returns {boolean}
 */
export const validateApiKey = (apiKey) => {
  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }

  // Formato: AIza seguido de 35 caracteres
  return /^AIza[A-Za-z0-9_-]{35}$/.test(apiKey);
};

/**
 * Valida URL do YouTube
 * @param {string} url - URL a validar
 * @returns {Object} - {valid: boolean, error?: string}
 */
export const validateYouTubeUrl = (url) => {
  if (!url || !url.trim()) {
    return {
      valid: false,
      error: 'Cole o link do vídeo do YouTube'
    };
  }

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /(?:youtu\.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
    /(?:m\.youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ];

  const isValid = patterns.some((pattern) => pattern.test(url.trim()));

  if (!isValid) {
    return {
      valid: false,
      error: 'Link do YouTube inválido'
    };
  }

  return { valid: true };
};

/**
 * Valida estrutura de dados para importação
 * @param {Object} data - Dados a validar
 * @returns {Object} - {valid: boolean, error?: string}
 */
export const validateImportData = (data) => {
  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      error: 'Formato de arquivo inválido'
    };
  }

  if (!data.categories || !Array.isArray(data.categories)) {
    return {
      valid: false,
      error: 'Estrutura inválida: "categories" ausente'
    };
  }

  if (!data.videos || !Array.isArray(data.videos)) {
    return {
      valid: false,
      error: 'Estrutura inválida: "videos" ausente'
    };
  }

  // Valida cada categoria
  for (const cat of data.categories) {
    if (!cat.id || !cat.name) {
      return {
        valid: false,
        error: 'Categoria com estrutura inválida'
      };
    }
  }

  // Valida cada vídeo
  for (const video of data.videos) {
    if (!video.id || !video.videoId || !video.title || !Array.isArray(video.categories)) {
      return {
        valid: false,
        error: 'Vídeo com estrutura inválida'
      };
    }
  }

  return { valid: true };
};