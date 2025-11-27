import React, { useState } from 'react';
import ConfirmModal from '../UI/ConfirmModal';

/**
 * DeleteConfirmModal - Modal específico para confirmar exclusão
 * @param {boolean} isOpen - Se o modal está aberto
 * @param {Function} onClose - Callback ao fechar
 * @param {Function} onConfirm - Callback ao confirmar exclusão
 * @param {string} type - Tipo: 'video' | 'videos' | 'category'
 * @param {number} count - Quantidade de itens (para múltiplas exclusões)
 * @param {string} categoryName - Nome da categoria (se aplicável)
 * @param {number} videoCount - Quantidade de vídeos na categoria
 * @param {boolean} keepVideos - Se deve manter vídeos ao excluir categoria
 * @param {Function} onKeepVideosChange - Callback ao mudar opção
 */
const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  type = 'video',
  count = 1,
  categoryName,
  videoCount = 0,
  keepVideos = false,
  onKeepVideosChange
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(keepVideos);
      onClose();
    } catch (error) {
      console.error('Erro ao excluir:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getModalConfig = () => {
    switch (type) {
      case 'category':
        return {
          title: 'Excluir Categoria',
          message: `Tem certeza que deseja excluir a categoria "${categoryName}"?`,
          details: videoCount > 0 ? [`${videoCount} ${videoCount === 1 ? 'vídeo' : 'vídeos'} nesta categoria`] : []
        };

      case 'videos':
        return {
          title: 'Excluir Vídeos',
          message: `Tem certeza que deseja excluir ${count} ${count === 1 ? 'vídeo selecionado' : 'vídeos selecionados'}?`,
          details: [`${count} ${count === 1 ? 'vídeo será excluído' : 'vídeos serão excluídos'}`]
        };

      case 'video':
      default:
        return {
          title: 'Excluir Vídeo',
          message: 'Tem certeza que deseja excluir este vídeo?',
          details: []
        };
    }
  };

  const config = getModalConfig();

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
        title={config.title}
        message={config.message}
        details={config.details}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        loading={isDeleting}
      />

      {/* Opção de manter vídeos (apenas para categoria) */}
      {type === 'category' && videoCount > 0 && isOpen && (
        <style jsx>{`
          /* Adiciona checkbox dentro do modal via portal */
        `}</style>
      )}
    </>
  );
};

/**
 * DeleteCategoryModal - Modal específico para excluir categoria com opções
 */
export const DeleteCategoryModal = ({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
  videoCount
}) => {
  const [deleteOption, setDeleteOption] = useState('deleteAll');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(deleteOption === 'keepVideos');
      onClose();
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Excluir Categoria
          </h3>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tem certeza que deseja excluir a categoria <strong>"{categoryName}"</strong>?
          </p>

          {videoCount > 0 && (
            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Esta categoria contém {videoCount} {videoCount === 1 ? 'vídeo' : 'vídeos'}. O que deseja fazer?
              </p>

              <label className="flex items-start gap-3 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-600 transition-colors">
                <input
                  type="radio"
                  name="deleteOption"
                  value="deleteAll"
                  checked={deleteOption === 'deleteAll'}
                  onChange={(e) => setDeleteOption(e.target.value)}
                  className="mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Excluir categoria e todos os vídeos
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Todos os vídeos serão removidos permanentemente
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-600 transition-colors">
                <input
                  type="radio"
                  name="deleteOption"
                  value="keepVideos"
                  checked={deleteOption === 'keepVideos'}
                  onChange={(e) => setDeleteOption(e.target.value)}
                  className="mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Excluir apenas a categoria
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Os vídeos ficarão em "Sem categoria"
                  </p>
                </div>
              </label>
            </div>
          )}

          <p className="text-sm text-red-600 dark:text-red-400 mb-6">
            ⚠️ Esta ação não pode ser desfeita
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={isDeleting}
              className="btn-primary bg-red-500 hover:bg-red-600 flex-1"
            >
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;