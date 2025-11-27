import React from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle - Toggle para alternar entre tema claro e escuro
 * @param {string} theme - Tema atual: 'light' | 'dark'
 * @param {Function} onChange - Callback ao mudar tema
 */
const ThemeToggle = ({ theme, onChange }) => {
  const isLight = theme === 'light';
  const isDark = theme === 'dark';

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Escolha entre tema claro ou escuro para a interface
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Light Theme */}
        <button
          onClick={() => onChange('light')}
          className={`
            relative p-6 rounded-xl border-2 transition-all
            ${isLight
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }
          `}
        >
          <div className="flex flex-col items-center gap-3">
            <div className={`
              p-3 rounded-full
              ${isLight ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}
            `}>
              <Sun className={`w-6 h-6 ${isLight ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
            </div>
            <span className={`text-sm font-medium ${isLight ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
              Tema Claro
            </span>
          </div>

          {/* Checkmark */}
          {isLight && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>

        {/* Dark Theme */}
        <button
          onClick={() => onChange('dark')}
          className={`
            relative p-6 rounded-xl border-2 transition-all
            ${isDark
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }
          `}
        >
          <div className="flex flex-col items-center gap-3">
            <div className={`
              p-3 rounded-full
              ${isDark ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}
            `}>
              <Moon className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
              Tema Escuro
            </span>
          </div>

          {/* Checkmark */}
          {isDark && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;