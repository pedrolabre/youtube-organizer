/**
 * Duration Formatter Utilities
 * Funções para formatar duração de vídeos (ISO 8601)
 */

/**
 * Converte duração ISO 8601 para segundos
 * @param {string} isoDuration - Duração ISO (ex: PT15M30S)
 * @returns {number} - Duração em segundos
 */
export const parseDuration = (isoDuration) => {
  if (!isoDuration) return 0;

  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
  if (!match) return 0;

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * Formata duração ISO para formato legível (HH:MM:SS ou MM:SS)
 * @param {string} isoDuration - Duração ISO (ex: PT15M30S)
 * @returns {string} - Duração formatada (ex: 15:30)
 */
export const formatDuration = (isoDuration) => {
  if (!isoDuration) return '0:00';

  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
  if (!match) return '0:00';

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Formata duração para formato longo (ex: 1h 15m 30s)
 * @param {string} isoDuration - Duração ISO
 * @returns {string} - Duração formatada
 */
export const formatDurationLong = (isoDuration) => {
  if (!isoDuration) return '0s';

  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
  if (!match) return '0s';

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  const parts = [];
  
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
};

/**
 * Converte segundos para duração ISO 8601
 * @param {number} seconds - Segundos
 * @returns {string} - Duração ISO
 */
export const secondsToISO = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let duration = 'PT';
  
  if (hours > 0) duration += `${hours}H`;
  if (minutes > 0) duration += `${minutes}M`;
  if (secs > 0 || duration === 'PT') duration += `${secs}S`;

  return duration;
};