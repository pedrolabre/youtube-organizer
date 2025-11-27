import React from 'react';
import { ArrowUpDown } from 'lucide-react';

/**
 * SortDropdown - Dropdown para ordenação
 * @param {string} value - Valor atual da ordenação
 * @param {Function} onChange - Callback ao mudar ordenação
 * @param {Array} options - Lista de opções [{value, label}]
 */
const SortDropdown = ({
  value,
  onChange,
  options = []
}) => {
  const defaultOptions = [
    { value: 'dateAddedDesc', label: 'Data de adição (mais recente)' },
    { value: 'dateAddedAsc', label: 'Data de adição (mais antiga)' },
    { value: 'datePublishedDesc', label: 'Data de publicação (mais recente)' },
    { value: 'datePublishedAsc', label: 'Data de publicação (mais antiga)' },
    { value: 'titleAsc', label: 'Título (A-Z)' },
    { value: 'titleDesc', label: 'Título (Z-A)' },
    { value: 'viewsDesc', label: 'Visualizações (maior)' },
    { value: 'viewsAsc', label: 'Visualizações (menor)' },
    { value: 'durationDesc', label: 'Duração (maior)' },
    { value: 'durationAsc', label: 'Duração (menor)' }
  ];

  const sortOptions = options.length > 0 ? options : defaultOptions;

  return (
    <div className="relative">
      {/* Icon */}
      <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />

      {/* Select */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input pl-10 pr-4 appearance-none cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Dropdown arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default SortDropdown;