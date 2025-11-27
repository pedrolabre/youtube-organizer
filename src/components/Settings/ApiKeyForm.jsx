import React, { useState } from 'react';
import { Key, Eye, EyeOff, ExternalLink, Check, AlertCircle } from 'lucide-react';

/**
 * ApiKeyForm - Formulário para configurar YouTube API Key
 * @param {string} apiKey - API Key atual
 * @param {Function} onChange - Callback ao salvar nova key
 */
const ApiKeyForm = ({ apiKey, onChange }) => {
  const [localKey, setLocalKey] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    try {
      // Validação básica
      if (localKey && !/^AIza[A-Za-z0-9_-]{35}$/.test(localKey)) {
        setSaveStatus('error');
        setIsSaving(false);
        return;
      }

      await onChange(localKey);
      setSaveStatus('success');
      
      // Limpa status após 3 segundos
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = localKey !== (apiKey || '');

  return (
    <div className="space-y-4">
      {/* Info box */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Key className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
              Por que preciso de uma API Key?
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              A API Key do YouTube permite buscar automaticamente informações dos vídeos (título, thumbnail, visualizações, etc.). É gratuita e você tem 10.000 requisições por dia.
            </p>
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <span>Como obter minha API Key</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          YouTube API Key
        </label>
        
        <div className="relative">
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          
          <input
            type={showKey ? 'text' : 'password'}
            value={localKey}
            onChange={(e) => setLocalKey(e.target.value)}
            placeholder="AIza..."
            className="input pl-10 pr-10"
          />

          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            {showKey ? (
              <EyeOff className="w-5 h-5 text-gray-500" />
            ) : (
              <Eye className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Validation message */}
        {saveStatus === 'error' && (
          <div className="flex items-center gap-2 mt-2 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span>API Key inválida. Verifique o formato.</span>
          </div>
        )}

        {saveStatus === 'success' && (
          <div className="flex items-center gap-2 mt-2 text-sm text-green-600 dark:text-green-400">
            <Check className="w-4 h-4" />
            <span>API Key salva com sucesso!</span>
          </div>
        )}
      </div>

      {/* Tutorial steps */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
          Passo a passo:
        </h4>
        <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex gap-2">
            <span className="font-semibold text-blue-500">1.</span>
            <span>Acesse o Google Cloud Console</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-blue-500">2.</span>
            <span>Crie um novo projeto ou selecione um existente</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-blue-500">3.</span>
            <span>Ative a "YouTube Data API v3"</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-blue-500">4.</span>
            <span>Vá em "Credenciais" → "Criar credenciais" → "Chave de API"</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-blue-500">5.</span>
            <span>Copie a chave e cole acima</span>
          </li>
        </ol>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={!hasChanges || isSaving}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isSaving ? 'Salvando...' : 'Salvar API Key'}
      </button>

      {/* Clear button */}
      {apiKey && (
        <button
          onClick={() => {
            setLocalKey('');
            onChange('');
          }}
          className="btn-secondary w-full"
        >
          Remover API Key
        </button>
      )}
    </div>
  );
};

export default ApiKeyForm;