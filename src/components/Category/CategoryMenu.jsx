import React, { useEffect, useRef } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

/**
 * CategoryMenu - Menu dropdown com ações da categoria
 * @param {Function} onEdit - Callback para editar
 * @param {Function} onDelete - Callback para excluir
 * @param {Function} onClose - Callback para fechar menu
 */
const CategoryMenu = ({ onEdit, onDelete, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    // Fecha menu ao clicar fora
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    // Fecha menu ao pressionar ESC
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 animate-scale-in"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Editar */}
      <button
        onClick={handleEdit}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Edit2 className="w-4 h-4" />
        <span>Editar</span>
      </button>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

      {/* Excluir */}
      <button
        onClick={handleDelete}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        <span>Excluir</span>
      </button>
    </div>
  );
};

export default CategoryMenu;