/**
 * Sort Functions
 * Funções de comparação para ordenação de vídeos
 */

import { parseDuration } from './durationFormatter';

/**
 * Funções de ordenação
 */
export const sortFunctions = {
  // Data de adição (mais recente primeiro)
  dateAddedDesc: (a, b) => {
    return new Date(b.addedAt) - new Date(a.addedAt);
  },

  // Data de adição (mais antigo primeiro)
  dateAddedAsc: (a, b) => {
    return new Date(a.addedAt) - new Date(b.addedAt);
  },

  // Data de publicação (mais recente primeiro)
  datePublishedDesc: (a, b) => {
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  },

  // Data de publicação (mais antigo primeiro)
  datePublishedAsc: (a, b) => {
    return new Date(a.publishedAt) - new Date(b.publishedAt);
  },

  // Título (A-Z)
  titleAsc: (a, b) => {
    return a.title.localeCompare(b.title, 'pt-BR');
  },

  // Título (Z-A)
  titleDesc: (a, b) => {
    return b.title.localeCompare(a.title, 'pt-BR');
  },

  // Visualizações (maior primeiro)
  viewsDesc: (a, b) => {
    return b.views - a.views;
  },

  // Visualizações (menor primeiro)
  viewsAsc: (a, b) => {
    return a.views - b.views;
  },

  // Duração (maior primeiro)
  durationDesc: (a, b) => {
    return parseDuration(b.duration) - parseDuration(a.duration);
  },

  // Duração (menor primeiro)
  durationAsc: (a, b) => {
    return parseDuration(a.duration) - parseDuration(b.duration);
  }
};

/**
 * Ordena array de vídeos
 * @param {Array} videos - Array de vídeos
 * @param {string} sortOption - Opção de ordenação
 * @returns {Array} - Array ordenado
 */
export const sortVideos = (videos, sortOption) => {
  const sortFn = sortFunctions[sortOption];
  
  if (!sortFn) {
    console.warn(`Opção de ordenação inválida: ${sortOption}`);
    return videos;
  }

  return [...videos].sort(sortFn);
};