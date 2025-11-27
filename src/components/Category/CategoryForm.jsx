import React, { useState, useEffect } from 'react';
import { X, Folder } from 'lucide-react';

/**
 * CategoryForm - Formulário para criar/editar categoria
 * @param {Object} category - Categoria existente (null para criar nova)
 * @param {Array} existingCategories - Lista de categorias existentes (para validação)
 * @param {Function} onSubmit - Callback ao submeter (recebe nome da categoria)
 * @param {Function} onCancel - Callback ao cancelar
 */
const CategoryForm = ({ 
  category = null, 
  existingCategories = [], 
  onSubmit, 
  onCancel 
}) => {
  const [name, setName] = useState(category?.name || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = category !== null;

  useEffect(() => {
    // Auto-focus no input quando modal abre
    const input = document.getElementById('category-name-input');
    if (input) {
      input.focus();
    }
  }, []);

  const validateName = (value) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return 'O nome da categoria não pode estar vazio';
    }

    if (trimmed.length < 2) {
      return 'O nome deve ter pelo menos 2 caracteres';
    }

    if (trimmed.length > 50) {
      return 'O nome deve ter no máximo 50 caracteres';
    }

    // Verifica duplicatas (ignorando a categoria atual se estiver editando)
    const isDuplicate = existingCategories.some(
      (cat) => 
        cat.name.toLowerCase() === trimmed.toLowerCase() && 
        cat.id !== category?.id
    );

    if (isDuplicate) {
      return 'Já existe uma categoria com este nome';
    }

    return null;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    // Limpa erro ao digitar
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(name.trim());
    } catch (err) {
      setError('Erro ao salvar categoria. Tente novamente.');
      setIsSubmitting(false);
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Folder className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
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
          <div className="mb-4">
            <label 
              htmlFor="category-name-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Nome da Categoria
            </label>
            
            <input
              id="category-name-input"
              type="text"
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
              placeholder="Ex: Tutoriais, Música, Receitas..."
              className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
              maxLength={50}
              disabled={isSubmitting}
            />

            {/* Contador de caracteres */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {name.length}/50 caracteres
              </span>
              
              {error && (
                <span className="text-xs text-red-500 dark:text-red-400">
                  {error}
                </span>
              )}
            </div>
          </div>

          {/* Dica */}
          <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 Dica: Escolha nomes curtos e descritivos para suas categorias
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || !name.trim()}
            >
              {isSubmitting ? 'Salvando...' : (isEditing ? 'Salvar' : 'Criar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;