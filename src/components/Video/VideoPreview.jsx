import React from 'react';
import { Calendar, Eye } from 'lucide-react';

/**
 * VideoPreview - Preview expandido do vídeo (aparece ao hover no VideoCard)
 * @param {Object} video - Dados do vídeo
 */
const VideoPreview = ({ video }) => {
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="absolute left-0 right-0 top-full mt-2 z-50 animate-slide-up">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 max-w-md">
        {/* Description */}
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Descrição
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {video.description || 'Sem descrição disponível'}
          </p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          {/* Published date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Publicado em</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {formatDate(video.publishedAt)}
              </p>
            </div>
          </div>

          {/* Views */}
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Visualizações</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {formatViews(video.views)}
              </p>
            </div>
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="absolute -top-2 left-8 w-4 h-4 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700 transform rotate-45" />
      </div>
    </div>
  );
};

export default VideoPreview;