/**
 * Storage Service
 * Funções para gerenciar LocalStorage
 */

// Chaves do LocalStorage
export const STORAGE_KEYS = {
  CATEGORIES: 'yt_organizer_categories',
  VIDEOS: 'yt_organizer_videos',
  SETTINGS: 'yt_organizer_settings',
  THEME: 'yt_organizer_theme',
  VIEW_MODE: 'yt_organizer_view_mode',
  API_KEY: 'yt_organizer_api_key'
};

/**
 * Salva item no LocalStorage
 * @param {string} key - Chave
 * @param {*} value - Valor (será convertido para JSON)
 */
export const setItem = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Erro ao salvar ${key}:`, error);
    return false;
  }
};

/**
 * Busca item do LocalStorage
 * @param {string} key - Chave
 * @param {*} defaultValue - Valor padrão se não encontrar
 * @returns {*} - Valor deserializado ou defaultValue
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    
    if (item === null) {
      return defaultValue;
    }
    
    return JSON.parse(item);
  } catch (error) {
    console.error(`Erro ao ler ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Remove item do LocalStorage
 * @param {string} key - Chave
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Erro ao remover ${key}:`, error);
    return false;
  }
};

/**
 * Limpa todo o LocalStorage da aplicação
 */
export const clear = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Erro ao limpar storage:', error);
    return false;
  }
};

/**
 * Verifica espaço disponível no LocalStorage (aproximado)
 * @returns {Object} - {used, total, available} em MB
 */
export const getStorageInfo = () => {
  try {
    let totalSize = 0;
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length + key.length;
      }
    }
    
    // Aproximação: 1 char ≈ 2 bytes (UTF-16)
    const usedMB = (totalSize * 2) / (1024 * 1024);
    const totalMB = 5; // LocalStorage geralmente ~5MB
    const availableMB = totalMB - usedMB;
    
    return {
      used: usedMB.toFixed(2),
      total: totalMB,
      available: availableMB.toFixed(2),
      percentage: ((usedMB / totalMB) * 100).toFixed(1)
    };
  } catch (error) {
    console.error('Erro ao calcular storage:', error);
    return null;
  }
};

/**
 * Verifica se LocalStorage está disponível
 * @returns {boolean}
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};