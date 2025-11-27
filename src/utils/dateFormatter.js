/**
 * Date Formatter Utilities
 * Funções para formatar datas
 */

/**
 * Formata data ISO para formato brasileiro
 * @param {string} isoDate - Data em formato ISO
 * @returns {string} - Data formatada (DD/MM/YYYY)
 */
export const formatDate = (isoDate) => {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Formata data para formato longo
 * @param {string} isoDate - Data em formato ISO
 * @returns {string} - Data formatada (DD de mês de YYYY)
 */
export const formatDateLong = (isoDate) => {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Formata data de forma relativa (ex: "há 2 dias")
 * @param {string} isoDate - Data em formato ISO
 * @returns {string} - Data relativa
 */
export const formatRelativeDate = (isoDate) => {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  const now = new Date();
  
  if (isNaN(date.getTime())) return '';

  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return 'agora mesmo';
  } else if (diffMinutes < 60) {
    return `há ${diffMinutes} ${diffMinutes === 1 ? 'minuto' : 'minutos'}`;
  } else if (diffHours < 24) {
    return `há ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
  } else if (diffDays < 30) {
    return `há ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
  } else if (diffMonths < 12) {
    return `há ${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'}`;
  } else {
    return `há ${diffYears} ${diffYears === 1 ? 'ano' : 'anos'}`;
  }
};

/**
 * Formata data e hora
 * @param {string} isoDate - Data em formato ISO
 * @returns {string} - Data e hora formatadas (DD/MM/YYYY às HH:MM)
 */
export const formatDateTime = (isoDate) => {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  
  if (isNaN(date.getTime())) return '';

  const dateStr = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const timeStr = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return `${dateStr} às ${timeStr}`;
};