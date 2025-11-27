/**
 * Export/Import Service
 * Funções para exportar e importar dados
 */

/**
 * Gera arquivo JSON para download
 * @param {Object} data - Dados para exportar
 * @param {string} filename - Nome do arquivo
 */
const downloadJSON = (data, filename) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Limpa URL temporária
  URL.revokeObjectURL(url);
};

/**
 * Exporta todos os dados
 * @param {Array} categories - Lista de categorias
 * @param {Array} videos - Lista de vídeos
 */
export const exportAll = (categories, videos) => {
  const data = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    categories: categories,
    videos: videos
  };
  
  const filename = `youtube-organizer-backup-${formatDate()}.json`;
  downloadJSON(data, filename);
};

/**
 * Exporta uma categoria específica
 * @param {Object} category - Categoria para exportar
 * @param {Array} videos - Lista de vídeos
 */
export const exportCategory = (category, videos) => {
  // Filtra apenas vídeos da categoria
  const categoryVideos = videos.filter((video) =>
    video.categories.includes(category.id)
  );
  
  const data = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    categories: [category],
    videos: categoryVideos
  };
  
  const safeName = category.name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const filename = `category-${safeName}-${formatDate()}.json`;
  downloadJSON(data, filename);
};

/**
 * Valida estrutura de dados importados
 * @param {Object} data - Dados importados
 * @returns {Object} - {valid: boolean, error?: string}
 */
export const validateImportData = (data) => {
  // Verifica estrutura básica
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Formato de arquivo inválido' };
  }
  
  if (!data.categories || !Array.isArray(data.categories)) {
    return { valid: false, error: 'Propriedade "categories" ausente ou inválida' };
  }
  
  if (!data.videos || !Array.isArray(data.videos)) {
    return { valid: false, error: 'Propriedade "videos" ausente ou inválida' };
  }
  
  // Valida estrutura das categorias
  for (const cat of data.categories) {
    if (!cat.id || !cat.name || !cat.createdAt) {
      return { valid: false, error: 'Categoria com estrutura inválida' };
    }
  }
  
  // Valida estrutura dos vídeos
  for (const video of data.videos) {
    if (!video.id || !video.videoId || !video.title || !Array.isArray(video.categories)) {
      return { valid: false, error: 'Vídeo com estrutura inválida' };
    }
  }
  
  return { valid: true };
};

/**
 * Processa dados para importação (merge ou replace)
 * @param {Object} importedData - Dados importados
 * @param {Array} currentCategories - Categorias atuais
 * @param {Array} currentVideos - Vídeos atuais
 * @param {boolean} merge - Se true, mescla; se false, substitui
 * @returns {Object} - {categories, videos}
 */
export const processImport = (importedData, currentCategories, currentVideos, merge) => {
  if (!merge) {
    // Modo substituir: usa apenas dados importados
    return {
      categories: importedData.categories,
      videos: importedData.videos
    };
  }
  
  // Modo mesclar: combina dados
  const existingCategoryIds = new Set(currentCategories.map((c) => c.id));
  const existingVideoIds = new Set(currentVideos.map((v) => v.id));
  
  // Adiciona apenas categorias novas
  const newCategories = importedData.categories.filter(
    (cat) => !existingCategoryIds.has(cat.id)
  );
  
  // Adiciona apenas vídeos novos
  const newVideos = importedData.videos.filter(
    (video) => !existingVideoIds.has(video.id)
  );
  
  return {
    categories: [...currentCategories, ...newCategories],
    videos: [...currentVideos, ...newVideos]
  };
};

/**
 * Lê arquivo JSON
 * @param {File} file - Arquivo para ler
 * @returns {Promise<Object>} - Dados do arquivo
 */
export const readJSONFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Erro ao fazer parse do JSON'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Formata data para nome de arquivo
 * @returns {string} - Data formatada (YYYY-MM-DD)
 */
const formatDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};