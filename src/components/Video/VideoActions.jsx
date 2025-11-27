import React, { useEffect, useRef } from 'react';
import { Eye, EyeOff, Copy, FolderInput, Trash2, ExternalLink } from 'lucide-react';

/**
 * VideoActions - Menu dropdown de ações do vídeo
 * @param {Object} video - Dados do vídeo
 * @param {Function} onToggleWatched - Callback para marcar/desmarcar como visto
 * @param {Function} onCopy - Callback para copiar para categoria
 * @param {Function} onMove - Callback para mover para categoria
 * @param {Function} onDelete - Callback para excluir
 * @param {Function} onClose - Callback para fechar menu
 */
const VideoActions = ({
  video,
  onToggleWatched,
  onCopy,
  onMove,
  onDelete,
  onClose
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleAction = (action) => (e) => {
    e.stopPropagation();
    action();
  };

  const handleOpenInYouTube = (e) => {
    e.stopPropagation();
    window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 animate-scale-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Abrir no YouTube */}
      <button
        onClick={handleOpenInYouTube}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        <span>Abrir no YouTube</span>
      </button>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

      {/* Marcar como visto/não visto */}
      <button
        onClick={handleAction(onToggleWatched)}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        {video.watched ? (
          <>
            <EyeOff className="w-4 h-4" />
            <span>Marcar como não visto</span>
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            <span>Marcar como visto</span>
          </>
        )}
      </button>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

      {/* Copiar para categoria */}
      <button
        onClick={handleAction(onCopy)}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Copy className="w-4 h-4" />
        <span>Copiar para...</span>
      </button>

      {/* Mover para categoria */}
      <button
        onClick={handleAction(onMove)}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <FolderInput className="w-4 h-4" />
        <span>Mover para...</span>
      </button>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

      {/* Excluir */}
      <button
        onClick={handleAction(onDelete)}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        <span>Excluir</span>
      </button>
    </div>
  );
};

export default VideoActions;