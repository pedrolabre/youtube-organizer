import React from 'react';
import { Check, Eye } from 'lucide-react';

/**
 * VideoStatusBadge - Badge de status "Visto" do vídeo
 * @param {boolean} watched - Se o vídeo foi assistido
 * @param {Function} onClick - Callback ao clicar no badge
 */
const VideoStatusBadge = ({ watched = false, onClick }) => {
  if (!watched) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
        aria-label="Marcar como visto"
      >
        <Eye className="w-3.5 h-3.5" />
        <span>Marcar como visto</span>
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-2 border-green-500 dark:border-green-600 hover:bg-green-200 dark:hover:bg-green-900/40 transition-all duration-200 animate-scale-in"
      aria-label="Desmarcar como visto"
    >
      <Check className="w-3.5 h-3.5" />
      <span>Visto</span>
    </button>
  );
};

export default VideoStatusBadge;