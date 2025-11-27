import React, { useState } from 'react';
import CategoryActions from './CategoryActions';
import VideoCard from '../Video/VideoCard'; 
import MoveCopyModal from '../Modals/MoveCopyModal';
import SortSelect from '../UI/SortSelect'; // <--- Import Novo
import { useApp } from '../../context/AppContext';
import useSort from '../../hooks/useSort'; // <--- Import Novo

const CategoryPage = ({ categoryId, onBack }) => {
  const { 
    categories,
    getCategoryById, 
    getCategoryVideos, 
    toggleFavorite, 
    toggleWatched, 
    deleteVideo,
    deleteVideos,
    moveMultipleToCategory,
    copyMultipleToCategory,
    moveToCategory,
    copyToCategory
  } = useApp();
  
  const [selectedVideos, setSelectedVideos] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  
  const [moveModal, setMoveModal] = useState({
    isOpen: false,
    videoId: null,
    mode: 'move'
  });

  const category = getCategoryById(categoryId);
  const allVideos = getCategoryVideos(categoryId);

  // 1. Filtrar por busca
  const filteredVideos = allVideos.filter(v => 
    v.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Ordenar (HOOK CONECTADO AQUI)
  const { sortedVideos, sortOption, setSortOption } = useSort(filteredVideos);

  if (!category) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500">Categoria não encontrada</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Voltar para o Início</button>
      </div>
    );
  }

  const videoCount = sortedVideos.length;

  // --- Handlers ---

  const handleAddVideo = () => {
    alert('Use o botão "+ Adicionar Vídeo" azul no painel principal para adicionar!');
  };

  const handleSearch = (term) => setSearchTerm(term);

  // handleSort removido pois o setSortOption do hook faz isso direto

  const handleSelectAll = () => {
    if (selectedVideos.size === sortedVideos.length) {
      setSelectedVideos(new Set());
    } else {
      setSelectedVideos(new Set(sortedVideos.map(v => v.id)));
    }
  };

  const handleToggleSelection = (videoId) => {
    const newSelection = new Set(selectedVideos);
    if (newSelection.has(videoId)) {
      newSelection.delete(videoId);
    } else {
      newSelection.add(videoId);
    }
    setSelectedVideos(newSelection);
  };

  const handleDeleteVideo = (videoId) => {
    if (window.confirm('Tem certeza que deseja remover este vídeo?')) {
      deleteVideo(videoId);
    }
  };

  // --- Modal Logic ---

  const handleOpenMove = (videoId) => setMoveModal({ isOpen: true, videoId, mode: 'move' });
  const handleOpenCopy = (videoId) => setMoveModal({ isOpen: true, videoId, mode: 'copy' });

  const handleConfirmMoveCopy = (targetCategoryId) => {
    const isBulkAction = moveModal.videoId === null;
    const targetIds = isBulkAction ? Array.from(selectedVideos) : [moveModal.videoId];

    if (moveModal.mode === 'move') {
      if (isBulkAction) {
        moveMultipleToCategory(targetIds, categoryId, targetCategoryId);
        setSelectedVideos(new Set());
      } else {
        moveToCategory(moveModal.videoId, categoryId, targetCategoryId);
      }
    } else {
      if (isBulkAction) {
        copyMultipleToCategory(targetIds, targetCategoryId);
        setSelectedVideos(new Set());
      } else {
        copyToCategory(moveModal.videoId, targetCategoryId);
      }
    }
    setMoveModal({ isOpen: false, videoId: null, mode: 'move' });
  };

  const handleBulkAction = (action) => {
    if (selectedVideos.size === 0) return;

    if (action === 'delete') {
      if (window.confirm(`Tem certeza que deseja excluir ${selectedVideos.size} vídeos?`)) {
        deleteVideos(Array.from(selectedVideos));
        setSelectedVideos(new Set());
      }
    } else if (action === 'move') {
      setMoveModal({ isOpen: true, videoId: null, mode: 'move' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <CategoryActions
          category={category}
          videoCount={videoCount}
          onBack={onBack}
          onAddVideo={handleAddVideo}
        />

        {/* Filtros e Ordenação */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Buscar vídeos nesta categoria..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Componente SortSelect conectado ao Hook */}
          <SortSelect value={sortOption} onChange={setSortOption} />
        </div>

        {/* Barra de Ações em Massa */}
        {sortedVideos.length > 0 && (
          <div className="flex items-center justify-between mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedVideos.size === sortedVideos.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-500 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {selectedVideos.size > 0
                  ? `${selectedVideos.size} selecionado${selectedVideos.size > 1 ? 's' : ''}`
                  : 'Selecionar todos'}
              </span>
            </label>

            {selectedVideos.size > 0 && (
              <div className="flex gap-2">
                <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors">
                  Excluir
                </button>
                <button onClick={() => handleBulkAction('move')} className="px-3 py-1 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                  Mover
                </button>
              </div>
            )}
          </div>
        )}

        {/* Lista de Vídeos Ordenada */}
        <div className="space-y-3">
          {sortedVideos.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
              <span className="text-3xl block mb-4">🎬</span>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Nenhum vídeo encontrado</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? 'Tente buscar por outro termo.' : 'Adicione seu primeiro vídeo para começar.'}
              </p>
            </div>
          ) : (
            sortedVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isSelected={selectedVideos.has(video.id)}
                onToggleSelect={handleToggleSelection}
                onToggleFavorite={toggleFavorite}
                onToggleWatched={toggleWatched}
                onDelete={handleDeleteVideo}
                onMove={handleOpenMove}
                onCopy={handleOpenCopy}
              />
            ))
          )}
        </div>
      </div>

      <MoveCopyModal
        isOpen={moveModal.isOpen}
        onClose={() => setMoveModal({ ...moveModal, isOpen: false })}
        onConfirm={handleConfirmMoveCopy}
        categories={categories}
        currentCategoryId={categoryId}
        action={moveModal.mode}
        videoCount={selectedVideos.size || 1}
      />
    </div>
  );
};

export default CategoryPage;