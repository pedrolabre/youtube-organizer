import React, { useState } from 'react';
import { Play, Eye, EyeOff, Heart, Trash2, Youtube } from 'lucide-react';
import VideoStatusBadge from './VideoStatusBadge';
import VideoCheckbox from './VideoCheckbox';
import VideoPreview from './VideoPreview';

const VideoCard = ({
  video,
  isSelected = false,
  onToggleSelect,
  onToggleWatched,
  onToggleFavorite,
  onDelete
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) return;
    window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
  };

  const formatDuration = (isoDuration) => {
    const match = isoDuration?.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    if (hours > 0) return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  const tooltipClasses = "absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none shadow-lg z-[60]";
  const iconBtnBase = "p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center w-9 h-9 relative";

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 p-3 pl-4 rounded-lg shadow-sm border ${video.watched ? 'border-green-200 dark:border-green-900 bg-green-50/10 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-700'} hover:shadow-md transition-shadow group z-0`}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
      onClick={handleCardClick}
    >
      <div className="flex items-start gap-4">
        
        {/* 1. Checkbox */}
        <div onClick={(e) => e.stopPropagation()} className="pt-2 shrink-0">
          <VideoCheckbox isSelected={isSelected} onChange={() => onToggleSelect(video.id)} />
        </div>

        {/* 2. Thumbnail */}
        <div className="relative flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 group-hover:ring-2 group-hover:ring-blue-500 transition-all">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Play className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" fill="white" />
          </div>
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
            {formatDuration(video.duration)}
          </div>
        </div>

        {/* 3. Info Central */}
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={video.title}>
            {video.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span className="truncate">{video.channel}</span>
            <span>•</span>
            <span>{formatViews(video.views)} views</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {formatDate(video.addedAt)}
            </span>
            <div onClick={(e) => e.stopPropagation()}>
              <VideoStatusBadge watched={video.watched} onClick={() => onToggleWatched(video.id)} />
            </div>
            {video.favorite && (
               <span className="text-xs text-pink-500 font-bold flex items-center gap-1 bg-pink-50 dark:bg-pink-900/20 px-2 py-0.5 rounded-full">
                 ❤️ Favorito
               </span>
            )}
          </div>
        </div>

        {/* 4. Coluna de Ações (4 Botões Fixos na Direita) */}
        <div className="flex flex-col gap-2 shrink-0 ml-auto pl-2 z-20" onClick={(e) => e.stopPropagation()}>
          
          {/* YouTube */}
          <div className="relative group/btn">
            <span className={tooltipClasses}>Assistir no YouTube</span>
            <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer"
               className={`${iconBtnBase} text-red-600 hover:text-red-700 border-red-100 dark:border-red-900/30`}>
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          {/* Favoritar */}
          <div className="relative group/btn">
            <span className={tooltipClasses}>{video.favorite ? "Remover Favorito" : "Favoritar"}</span>
            <button onClick={() => onToggleFavorite(video.id)}
              className={`${iconBtnBase} ${video.favorite ? 'text-pink-500 border-pink-200 bg-pink-50' : 'text-gray-400 hover:text-pink-500'}`}>
              <Heart className={`w-5 h-5 ${video.favorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Marcar Visto */}
          <div className="relative group/btn">
            <span className={tooltipClasses}>{video.watched ? "Marcar como não visto" : "Marcar como visto"}</span>
            <button onClick={() => onToggleWatched(video.id)}
              className={`${iconBtnBase} ${video.watched ? 'text-green-600 border-green-200 bg-green-50' : 'text-gray-400 hover:text-green-600'}`}>
              {video.watched ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>

          {/* Excluir */}
          <div className="relative group/btn">
            <span className={tooltipClasses}>Excluir</span>
            <button onClick={() => onDelete(video.id)}
              className={`${iconBtnBase} text-gray-400 hover:text-red-600`}>
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* 5. Preview Flutuante (Absoluto) */}
      {showPreview && (
        <div className="absolute left-0 top-full mt-1 z-50 w-full px-4 pointer-events-none">
           <div className="shadow-xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
             <VideoPreview video={video} />
           </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;