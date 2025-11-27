import React from 'react';
// CORREÇÃO: Trocamos Grid3x3 por Grid
import { LayoutGrid, Grid, List } from 'lucide-react';

/**
 * ViewToggle - Toggle de visualização (Card/Grid/Lista)
 * @param {string} value - Modo atual: 'card' | 'grid' | 'list'
 * @param {Function} onChange - Callback ao mudar modo
 */
const ViewToggle = ({ value = 'grid', onChange }) => {
  const options = [
    { value: 'card', icon: LayoutGrid, label: 'Card' },
    // CORREÇÃO: Usando o ícone Grid aqui
    { value: 'grid', icon: Grid, label: 'Grid' },
    { value: 'list', icon: List, label: 'Lista' }
  ];

  return (
    <div className="inline-flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200
              ${isActive
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
            aria-label={option.label}
            title={option.label}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ViewToggle;