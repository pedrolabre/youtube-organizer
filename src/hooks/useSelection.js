import { useState, useCallback } from 'react';

/**
 * useSelection - Hook para gerenciar seleção múltipla
 * @returns {Object} - Estado e métodos de seleção
 */
const useSelection = () => {
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Alternar seleção de um item
  const toggleSelection = useCallback((id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // Selecionar todos
  const selectAll = useCallback((ids) => {
    setSelectedIds(new Set(ids));
  }, []);

  // Limpar seleção
  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  // Verificar se item está selecionado
  const isSelected = useCallback((id) => {
    return selectedIds.has(id);
  }, [selectedIds]);

  // Verificar se todos estão selecionados
  const areAllSelected = useCallback((ids) => {
    if (ids.length === 0) return false;
    return ids.every((id) => selectedIds.has(id));
  }, [selectedIds]);

  return {
    selectedIds,
    toggleSelection,
    selectAll,
    clearSelection,
    isSelected,
    areAllSelected,
    selectedCount: selectedIds.size,
    hasSelection: selectedIds.size > 0
  };
};

export default useSelection;