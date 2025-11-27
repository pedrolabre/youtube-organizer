import React, { useState } from 'react';
import { Download, FileJson, Folder } from 'lucide-react';

/**
 * ExportData - Componente para exportar dados
 * @param {Array} categories - Lista de categorias
 * @param {Function} onExport - Callback para exportar (recebe tipo e categoryId opcional)
 */
const ExportData = ({ categories = [], onExport }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const handleExportAll = async () => {
    setIsExporting(true);
    try {
      await onExport('all');
    } catch (error) {
      console.error('Erro ao exportar:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCategory = async () => {
    if (!selectedCategory) return;
    
    setIsExporting(true);
    try {
      await onExport('category', selectedCategory);
      setSelectedCategory('');
    } catch (error) {
      console.error('Erro ao exportar categoria:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Export All */}
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <FileJson className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          </div>

          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Exportar Tudo
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Exporta todas as categorias e vídeos em um único arquivo JSON
            </p>
            <button
              onClick={handleExportAll}
              disabled={isExporting}
              className="btn-primary btn-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Exportando...' : 'Exportar Tudo'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Export Category */}
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Folder className="w-6 h-6 text-green-500 dark:text-green-400" />
          </div>

          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Exportar Categoria
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Exporta apenas uma categoria específica e seus vídeos
            </p>

            {categories.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Nenhuma categoria para exportar
              </p>
            ) : (
              <div className="space-y-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input text-sm"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleExportCategory}
                  disabled={!selectedCategory || isExporting}
                  className="btn-primary btn-sm flex items-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting ? 'Exportando...' : 'Exportar Categoria'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          📋 Sobre a exportação
        </h4>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>• Os dados são exportados em formato JSON</li>
          <li>• Inclui todas as informações dos vídeos e categorias</li>
          <li>• Use para backup ou transferência entre dispositivos</li>
          <li>• O arquivo pode ser importado novamente a qualquer momento</li>
        </ul>
      </div>
    </div>
  );
};

export default ExportData;