import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import VideoCard from '../Video/VideoCard';
import SortSelect from '../UI/SortSelect';
import useSort from '../../hooks/useSort';

const UnwatchedView = () => {
  const { videos, toggleWatched, toggleFavorite, deleteVideo, navigateToDashboard } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videos.filter(v => 
    !v.watched && v.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { sortedVideos, sortOption, setSortOption } = useSort(filteredVideos);

  const handleDeleteVideo = (videoId) => {
    if (window.confirm('Tem certeza que deseja remover este vídeo?')) deleteVideo(videoId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="flex items-center gap-4 mb-6">
          <button onClick={navigateToDashboard} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Para Assistir ⏳</h1>
          <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            {sortedVideos.length} vídeos
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Buscar em não assistidos..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <SortSelect value={sortOption} onChange={setSortOption} />
        </div>

        <div className="space-y-3">
          {sortedVideos.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500">Nenhum vídeo para assistir encontrado!</p>
            </div>
          ) : (
            sortedVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isSelected={false}
                onToggleSelect={() => {}}
                onToggleFavorite={toggleFavorite}
                onToggleWatched={toggleWatched}
                onDelete={handleDeleteVideo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UnwatchedView;