import React, { useState } from 'react';
import { X, Search, FolderInput, Copy } from 'lucide-react';

/**
 * MoveCopyModal - Modal para mover ou copiar vídeos entre categorias
 * @param {boolean} isOpen - Se o modal está aberto
 * @param {Function} onClose - Callback ao fechar
 * @param {Function} onConfirm - Callback ao confirmar (recebe categoryId)
 * @param {Array} categories - Lista de categorias disponíveis
 * @param {string} currentCategoryId - ID da categoria atual (para filtrar)
 * @param {string} action - Ação: 'move' | 'copy'
 * @param {number} videoCount - Quantidade de vídeos selecionados
 */
const MoveCopyModal = ({
  isOpen,
  onClose,
  onConfirm,
  categories = [],
  currentCategoryId,
  action = 'move',
  videoCount = 1
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const isMove = action === 'move';
  const actionText = isMove ? 'Mover' : 'Copiar';
  const Icon = isMove ? FolderInput : Copy;

  // Filtra categorias (remove a atual se for mover)
  const availableCategories = categories.filter(cat => {
    if (isMove && cat.id === currentCategoryId) return false;
    if (searchTerm) {
      return cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const handleConfirm = async () => {
    if (!selectedCategoryId) return;

    setIsProcessing(true);
    try {
      await onConfirm(selectedCategoryId);
      onClose();
    } catch (error) {
      console.error('Erro ao processar:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setSelectedCategoryId('');
    setSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isMove ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
              <Icon className={`w-5 h-5 ${isMove ? 'text-blue-500 dark:text-blue-400' : 'text-green-500 dark:text-green-400'}`} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {actionText} {videoCount === 1 ? 'Vídeo' : 'Vídeos'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {videoCount} {videoCount === 1 ? 'vídeo selecionado' : 'vídeos selecionados'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar categoria..."
              className="input pl-10"
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto p-6">
          {availableCategories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-500">
                {searchTerm ? 'Nenhuma categoria encontrada' : 'Nenhuma categoria disponível'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {availableCategories.map((category) => (
                <label
                  key={category.id}
                  className={`
                    flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${selectedCategoryId === category.id
                      ? 'border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={selectedCategoryId === category.id}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-4 h-4 text-blue-500"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {category.name}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              disabled={isProcessing}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedCategoryId || isProcessing}
              className="btn-primary flex-1"
            >
              {isProcessing ? 'Processando...' : actionText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveCopyModal;