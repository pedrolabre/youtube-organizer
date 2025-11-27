/**
 * Generate ID Utility
 * Funções para gerar IDs únicos
 */

/**
 * Gera ID único com prefixo
 * @param {string} prefix - Prefixo (ex: 'cat', 'vid')
 * @returns {string} - ID único (ex: 'cat_1699200000000_abc123')
 */
export const generateId = (prefix = '') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
};

/**
 * Gera ID curto (apenas random)
 * @returns {string} - ID curto (ex: 'abc123xyz')
 */
export const generateShortId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Gera UUID v4 simplificado
 * @returns {string} - UUID (ex: '550e8400-e29b-41d4-a716-446655440000')
 */
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};