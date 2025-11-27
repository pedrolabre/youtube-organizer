import React, { useState, useRef } from 'react';
import { Upload, FileJson, AlertCircle, Check } from 'lucide-react';

/**
 * ImportData - Componente para importar dados
 * @param {Function} onImport - Callback para importar (recebe dados e opção merge)
 */
const ImportData = ({ onImport }) => {
  const [importMode, setImportMode] = useState('merge');
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Valida tipo de arquivo
    if (!file.name.endsWith('.json')) {
      setImportStatus('error');
      setErrorMessage('Por favor, selecione um arquivo JSON válido');
      return;
    }

    setIsImporting(true);
    setImportStatus(null);
    setErrorMessage('');

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validação básica da estrutura
      if (!data.categories || !data.videos || !Array.isArray(data.categories) || !Array.isArray(data.videos)) {
        throw new Error('Estrutura de arquivo inválida');
      }

      // Chama callback de importação
      await onImport(data, importMode === 'merge');

      setImportStatus('success');
      
      // Limpa status após 3 segundos
      setTimeout(() => {
        setImportStatus(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 3000);
    } catch (error) {
      setImportStatus('error');
      setErrorMessage(error.message || 'Erro ao importar arquivo. Verifique o formato.');
      console.error('Erro na importação:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Import Mode Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Modo de Importação
        </label>

        <div className="space-y-2">
          <label className="flex items-start gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-600 transition-colors">
            <input
              type="radio"
              name="importMode"
              value="merge"
              checked={importMode === 'merge'}
              onChange={(e) => setImportMode(e.target.value)}
              className="mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Mesclar dados
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Mantém dados existentes e adiciona os novos. Recomendado para preservar suas informações atuais.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-red-500 dark:hover:border-red-600 transition-colors">
            <input
              type="radio"
              name="importMode"
              value="replace"
              checked={importMode === 'replace'}
              onChange={(e) => setImportMode(e.target.value)}
              className="mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Substituir tudo
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                ⚠️ Remove todos os dados atuais e substitui pelos importados. Use com cuidado!
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Upload Area */}
      <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
            <FileJson className="w-8 h-8 text-gray-600 dark:text-gray-400" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              Selecione o arquivo de backup
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Apenas arquivos JSON exportados por este aplicativo
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={handleButtonClick}
            disabled={isImporting}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{isImporting ? 'Importando...' : 'Selecionar Arquivo'}</span>
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {importStatus === 'success' && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-800 dark:text-green-200">
              Dados importados com sucesso!
            </p>
          </div>
        </div>
      )}

      {importStatus === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                Erro ao importar
              </p>
              <p className="text-sm text-red-700 dark:text-red-300">
                {errorMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Warning */}
      {importMode === 'replace' && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                Atenção!
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Você selecionou "Substituir tudo". Todos os dados atuais serão perdidos permanentemente.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportData;