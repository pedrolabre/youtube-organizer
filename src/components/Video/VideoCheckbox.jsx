import React from 'react';
import { Check } from 'lucide-react';

/**
 * VideoCheckbox - Checkbox customizado para seleção de vídeos
 * @param {boolean} isSelected - Se o vídeo está selecionado
 * @param {Function} onChange - Callback ao mudar seleção
 */
const VideoCheckbox = ({ isSelected = false, onChange }) => {
  return (
    <label className="relative flex items-center cursor-pointer group">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onChange}
        className="sr-only peer"
      />
      
      <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 dark:peer-focus:ring-offset-gray-800 transition-all duration-200 flex items-center justify-center group-hover:border-blue-400 dark:group-hover:border-blue-500">
        {isSelected && (
          <Check className="w-3.5 h-3.5 text-white animate-scale-in" strokeWidth={3} />
        )}
      </div>
    </label>
  );
};

export default VideoCheckbox;