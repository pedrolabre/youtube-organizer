import { useState, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const STORAGE_KEY = 'yt_organizer_categories';

/**
 * useCategories - Hook para gerenciar categorias
 * @returns {Object} - Métodos e estado das categorias
 */
const useCategories = () => {
  const [categories, setCategories] = useLocalStorage(STORAGE_KEY, []);

  // Adicionar categoria
  const addCategory = useCallback((name) => {
    const newCategory = {
      id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      createdAt: new Date().toISOString()
    };

    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  }, [setCategories]);

  // Atualizar categoria
  const updateCategory = useCallback((id, newName) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, name: newName.trim() } : cat
      )
    );
  }, [setCategories]);

  // Excluir categoria
  const deleteCategory = useCallback((id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  }, [setCategories]);

  // Buscar categoria por ID
  const getCategoryById = useCallback((id) => {
    return categories.find((cat) => cat.id === id);
  }, [categories]);

  // Verificar se categoria existe
  const categoryExists = useCallback((name) => {
    return categories.some(
      (cat) => cat.name.toLowerCase() === name.toLowerCase()
    );
  }, [categories]);

  // Importar categorias
  const importCategories = useCallback((importedCategories, merge = true) => {
    if (merge) {
      // Mesclar: adiciona novas, mantém existentes
      setCategories((prev) => {
        const existing = new Set(prev.map(c => c.id));
        const newCategories = importedCategories.filter(c => !existing.has(c.id));
        return [...prev, ...newCategories];
      });
    } else {
      // Substituir: remove tudo e adiciona importados
      setCategories(importedCategories);
    }
  }, [setCategories]);

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    categoryExists,
    importCategories,
    setCategories
  };
};

export default useCategories;