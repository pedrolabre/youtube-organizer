/**
 * Views Formatter Utilities
 * Funções para formatar números de visualizações
 */

/**
 * Formata número de views de forma compacta (1.2M, 500K, etc.)
 * @param {number} views - Número de visualizações
 * @returns {string} - Número formatado
 */
export const formatViews = (views) => {
  if (!views || views === 0) return '0';

  // Milhões
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }

  // Milhares
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }

  return views.toString();
};

/**
 * Formata número de views por extenso
 * @param {number} views - Número de visualizações
 * @returns {string} - Número formatado (ex: 1.234.567)
 */
export const formatViewsFull = (views) => {
  if (!views || views === 0) return '0';

  return new Intl.NumberFormat('pt-BR').format(views);
};

/**
 * Formata número com sufixo "visualizações"
 * @param {number} views - Número de visualizações
 * @returns {string} - Texto formatado (ex: "1.2M visualizações")
 */
export const formatViewsWithLabel = (views) => {
  const formatted = formatViews(views);
  return `${formatted} ${views === 1 ? 'visualização' : 'visualizações'}`;
};

/**
 * Formata qualquer número de forma compacta (genérico)
 * @param {number} num - Número
 * @returns {string} - Número formatado
 */
export const formatNumber = (num) => {
  if (!num || num === 0) return '0';

  // Bilhões
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`;
  }

  // Milhões
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }

  // Milhares
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  return num.toString();
};