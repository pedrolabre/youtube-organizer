import React from 'react';
import { ArrowLeft } from 'lucide-react';

/**
 * BackButton - Botão de voltar
 * @param {Function} onClick - Callback ao clicar
 * @param {string} label - Texto do botão
 */
const BackButton = ({ onClick, label = 'Voltar' }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;