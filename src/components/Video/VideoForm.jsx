import React, { useState, useEffect } from 'react';
import { X, Video, Link as LinkIcon, Loader } from 'lucide-react';

/**
 * VideoForm - Formulário para adicionar vídeo do YouTube
 * @param {Array} categories - Lista de categorias disponíveis
 * @param {string} selectedCategoryId - ID da categoria pré-selecionada
 * @param {Function} onSubmit - Callback ao submeter (recebe {url, categoryId})
 * @param {Function} onCancel - Callback ao cancelar
 * @param {Function} fetchVideoData - Função para buscar dados do YouTube
 */
const VideoForm = ({
  categories = [],
  selectedCategoryId = '',
  onSubmit,
  onCancel,
  fetchVideoData
}) => {
  const [url, setUrl] = useState('');
  const [categoryId, setCategoryId] = useState(selectedCategoryId);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Auto-focus no input
    const input = document.getElementById('video-url-input');
    if (input) {
      input.focus();
    }
  }, []);

  const extractVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/ // ID direto
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const validateUrl = (url) => {
    if (!url.trim()) {
      return 'Cole o link do vídeo do YouTube';
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return 'Link do YouTube inválido';
    }

    return null;
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setError('');
    setPreview(null);
  };

  const handleUrlBlur = async () => {
    if (!url.trim()) return;

    const validationError = validateUrl(url);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Buscar preview do vídeo
    if (fetchVideoData) {
      setIsLoading(true);
      try {
        const videoId = extractVideoId(url);
        const data = await fetchVideoData(videoId);
        setPreview(data);
        setError('');
      } catch (err) {
        setError('Não foi possível buscar informações do vídeo. Verifique o link ou sua API Key.');
        setPreview(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateUrl(url);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!categoryId) {
      setError('Selecione uma categoria');
      return;
    }

    setIsLoading(true);

    try {
      const videoId = extractVideoId(url);
      await onSubmit({ url, videoId, categoryId });
    } catch (err) {
      setError(err.message || 'Erro ao adicionar vídeo');
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <Video className="w-5 h-5 text-red-500 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Adicionar Vídeo do YouTube
            </h2>
          </div>

          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* URL Input */}
          <div className="mb-4">
            <label
              htmlFor="video-url-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Link do Vídeo
            </label>

            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="video-url-input"
                type="text"
                value={url}
                onChange={handleUrlChange}
                onBlur={handleUrlBlur}
                onKeyDown={handleKeyDown}
                placeholder="https://www.youtube.com/watch?v=..."
                className={`input pl-10 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                {error}
              </p>
            )}
          </div>

          {/* Loading */}
          {isLoading && !preview && (
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center gap-3">
              <Loader className="w-5 h-5 text-blue-500 animate-spin" />
              <span className="text-sm text-blue-700 dark:text-blue-300">
                Buscando informações do vídeo...
              </span>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex gap-4">
                <img
                  src={preview.thumbnail}
                  alt={preview.title}
                  className="w-32 aspect-video object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
                    {preview.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {preview.channel}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Category Select */}
          <div className="mb-6">
            <label
              htmlFor="category-select"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Categoria
            </label>

            <select
              id="category-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="input"
              disabled={isLoading}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Info */}
          <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 Formatos aceitos: youtube.com/watch?v=..., youtu.be/..., ou ID do vídeo
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
              disabled={isLoading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !url.trim() || !categoryId}
            >
              {isLoading ? 'Adicionando...' : 'Adicionar Vídeo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoForm;