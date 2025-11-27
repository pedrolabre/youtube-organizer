import React, { useState } from 'react';
import { X, Settings as SettingsIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ApiKeyForm from './ApiKeyForm';
import ExportData from './ExportData';
import ImportData from './ImportData';
import ManageCategories from './ManageCategories';

/**
 * SettingsModal - Modal principal de configurações
 * @param {boolean} isOpen - Se o modal está aberto
 * @param {Function} onClose - Callback ao fechar
 * @param {string} theme - Tema atual
 * @param {Function} onThemeChange - Callback ao mudar tema
 * @param {string} apiKey - API Key atual
 * @param {Function} onApiKeyChange - Callback ao mudar API Key
 * @param {Array} categories - Lista de categorias
 * @param {Function} onEditCategory - Callback para editar categoria
 * @param {Function} onDeleteCategory - Callback para excluir categoria
 * @param {Function} onExport - Callback para exportar dados
 * @param {Function} onImport - Callback para importar dados
 */
const SettingsModal = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  apiKey,
  onApiKeyChange,
  categories = [],
  onEditCategory,
  onDeleteCategory,
  onExport,
  onImport
}) => {
  const [activeTab, setActiveTab] = useState('general');

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: 'Geral', icon: '⚙️' },
    { id: 'api', label: 'API Key', icon: '🔑' },
    { id: 'data', label: 'Dados', icon: '💾' },
    { id: 'categories', label: 'Categorias', icon: '📁' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <SettingsIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Configurações
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap
                ${activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Aparência
                </h3>
                <ThemeToggle theme={theme} onChange={onThemeChange} />
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Sobre
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  YouTube Organizer v1.0.0 - Organize seus vídeos favoritos do YouTube em categorias personalizadas.
                </p>
                <a
                  href="https://github.com/seu-usuario/youtube-organizer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  GitHub →
                </a>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                YouTube API Key
              </h3>
              <ApiKeyForm apiKey={apiKey} onChange={onApiKeyChange} />
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Exportar Dados
                </h3>
                <ExportData 
                  categories={categories}
                  onExport={onExport}
                />
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Importar Dados
                </h3>
                <ImportData onImport={onImport} />
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Gerenciar Categorias
              </h3>
              <ManageCategories
                categories={categories}
                onEdit={onEditCategory}
                onDelete={onDeleteCategory}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button onClick={onClose} className="btn-primary w-full">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;