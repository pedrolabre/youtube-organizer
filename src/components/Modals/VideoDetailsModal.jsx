import React from 'react';
import { X, ExternalLink, Calendar, Eye, Clock, User } from 'lucide-react';

/**
 * VideoDetailsModal - Modal com detalhes completos do vídeo
 * @param {boolean} isOpen - Se o modal está aberto
 * @param {Function} onClose - Callback ao fechar
 * @param {Object} video - Dados do vídeo
 */
const VideoDetailsModal = ({ isOpen, onClose, video }) => {
  if (!isOpen || !video) return null;

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatViews = (views) => {
    return new Intl.NumberFormat('pt-BR').format(views);
  };

  const formatDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  };

  const handleOpenYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="relative">
          {/* Thumbnail */}
          <div className="aspect-video bg-black">
            <img
              src={video.thumbnail.replace('mqdefault', 'maxresdefault')}
              alt={video.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors backdrop-blur-sm"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {video.title}
          </h2>

          {/* Channel */}
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-gray-500" />
            <span className="text-lg text-gray-700 dark:text-gray-300">
              {video.channel}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {/* Views */}
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Eye className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Visualizações</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {formatViews(video.views)}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <Clock className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Duração</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {formatDuration(video.duration)}
                </p>
              </div>
            </div>

            {/* Published */}
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg col-span-2 sm:col-span-1">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Publicado</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                  {formatDate(video.publishedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Descrição
            </h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg max-h-48 overflow-y-auto">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {video.description || 'Sem descrição disponível'}
              </p>
            </div>
          </div>

          {/* Added date */}
          <div className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            Adicionado em {formatDate(video.addedAt)}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Fechar
            </button>
            <button
              onClick={handleOpenYouTube}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Abrir no YouTube
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsModal;