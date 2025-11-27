/**
 * Opções de ordenação para vídeos
 */

export const SORT_OPTIONS = [
  {
    value: 'dateAddedDesc',
    label: 'Data de adição (mais recente)'
  },
  {
    value: 'dateAddedAsc',
    label: 'Data de adição (mais antiga)'
  },
  {
    value: 'datePublishedDesc',
    label: 'Data de publicação (mais recente)'
  },
  {
    value: 'datePublishedAsc',
    label: 'Data de publicação (mais antiga)'
  },
  {
    value: 'titleAsc',
    label: 'Título (A-Z)'
  },
  {
    value: 'titleDesc',
    label: 'Título (Z-A)'
  },
  {
    value: 'viewsDesc',
    label: 'Visualizações (maior)'
  },
  {
    value: 'viewsAsc',
    label: 'Visualizações (menor)'
  },
  {
    value: 'durationDesc',
    label: 'Duração (maior)'
  },
  {
    value: 'durationAsc',
    label: 'Duração (menor)'
  }
];

export const DEFAULT_SORT = 'dateAddedDesc';