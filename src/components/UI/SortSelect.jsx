import React from 'react';

const SortSelect = ({ value, onChange, mode = 'video' }) => {
  // Opções para VÍDEOS
  if (mode === 'video') {
    return (
      <select
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <optgroup label="Data">
          <option value="dateAddedDesc">📅 Adicionado (Recentes)</option>
          <option value="dateAddedAsc">📅 Adicionado (Antigos)</option>
        </optgroup>
        <optgroup label="Título">
          <option value="titleAsc">🔤 Título (A-Z)</option>
          <option value="titleDesc">🔤 Título (Z-A)</option>
        </optgroup>
        <optgroup label="Métricas">
          <option value="viewsDesc">👁️ Visualizações (Maior)</option>
          <option value="durationDesc">⏳ Duração (Longos)</option>
          <option value="durationAsc">⏱️ Duração (Curtos)</option>
        </optgroup>
      </select>
    );
  }

  // Opções para CATEGORIAS (Novo Modo)
  return (
    <select
      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="dateCreatedDesc">📅 Criado em (Novas)</option>
      <option value="dateCreatedAsc">📅 Criado em (Antigas)</option>
      <option value="nameAsc">🔤 Nome (A-Z)</option>
      <option value="nameDesc">🔤 Nome (Z-A)</option>
    </select>
  );
};

export default SortSelect;