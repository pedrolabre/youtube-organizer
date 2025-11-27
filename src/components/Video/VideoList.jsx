import React from 'react';
import VideoCard from './VideoCard';

/**
 * VideoList - Lista de vídeos com suporte a seleção múltipla
 * @param {Array} videos - Lista de vídeos a exibir
 * @param {Set} selectedIds - Set com IDs dos vídeos selecionados
 * @param {Function} onToggleSelect - Callback para alternar seleção de um vídeo
 * @param {Function} onToggleWatched - Callback para marcar vídeo como visto
 * @param {Function} onDelete - Callback para excluir vídeo
 * @param {Function} onMove - Callback para mover vídeo
 * @param {Function} onCopy - Callback para copiar vídeo
 */
const VideoList = ({
  videos = [],
  selectedIds = new Set(),
  onToggleSelect,
  onToggleWatched,
  onDelete,
  onMove,
  onCopy
}) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <span className="text-3xl">🎬</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Nenhum vídeo encontrado
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Adicione vídeos ou ajuste os filtros de busca
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isSelected={selectedIds.has(video.id)}
          onToggleSelect={() => onToggleSelect(video.id)}
          onToggleWatched={onToggleWatched}
          onDelete={onDelete}
          onMove={onMove}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
};

export default VideoList;