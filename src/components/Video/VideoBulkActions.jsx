import React from 'react';
import { Eye, Copy, FolderInput, Trash2, X } from 'lucide-react';

/**
 * VideoBulkActions - Barra de ações em massa para vídeos selecionados
 * @param {number} selectedCount - Número de vídeos selecionados
 * @param {Function} onMarkAllWatched - Callback para marcar todos como vistos
 * @param {Function} onCopyAll - Callback para copiar todos
 * @param {Function} onMoveAll - Callback para mover todos
 * @param {Function} onDeleteAll - Callback para excluir todos
 * @param {Function} onClearSelection - Callback para limpar seleção
 */
const VideoBulkActions = ({
  selectedCount = 0,
  onMarkAllWatched,
  onCopyAll,
  onMoveAll,
  onDeleteAll,
  onClearSelection
}) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center gap-6">
          {/* Selected count */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {selectedCount}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedCount === 1 ? 'vídeo selecionado' : 'vídeos selecionados'}
            </span>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Marcar como visto */}
            <button
              onClick={onMarkAllWatched}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Marcar todos como vistos"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Marcar vistos</span>
            </button>

            {/* Copiar */}
            <button
              onClick={onCopyAll}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Copiar para categoria"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copiar</span>
            </button>

            {/* Mover */}
            <button
              onClick={onMoveAll}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Mover para categoria"
            >
              <FolderInput className="w-4 h-4" />
              <span className="hidden sm:inline">Mover</span>
            </button>

            {/* Excluir */}
            <button
              onClick={onDeleteAll}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Excluir selecionados"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Excluir</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Clear selection */}
          <button
            onClick={onClearSelection}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Limpar seleção"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoBulkActions;