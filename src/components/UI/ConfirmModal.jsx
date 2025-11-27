import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

/**
 * ConfirmModal - Modal de confirmação para ações destrutivas
 * @param {boolean} isOpen - Se o modal está aberto
 * @param {Function} onClose - Callback ao fechar/cancelar
 * @param {Function} onConfirm - Callback ao confirmar
 * @param {string} title - Título do modal
 * @param {string} message - Mensagem de confirmação
 * @param {string} confirmText - Texto do botão confirmar
 * @param {string} cancelText - Texto do botão cancelar
 * @param {string} variant - Tipo: 'danger' | 'warning' | 'info'
 * @param {Array} details - Lista de detalhes adicionais
 * @param {boolean} loading - Se está processando
 */
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  details = [],
  loading = false
}) => {
  const variants = {
    danger: {
      icon: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      button: 'danger'
    },
    warning: {
      icon: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
      button: 'primary'
    },
    info: {
      icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      button: 'primary'
    }
  };

  const currentVariant = variants[variant] || variants.danger;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${currentVariant.icon} mb-4`}>
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {message}
        </p>

        {/* Details */}
        {details.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6 text-left">
            <ul className="space-y-2">
              {details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-gray-400 dark:text-gray-600">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warning message */}
        {variant === 'danger' && (
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            ⚠️ Esta ação não pode ser desfeita
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            className="flex-1"
          >
            {cancelText}
          </Button>

          <Button
            variant={currentVariant.button}
            onClick={onConfirm}
            loading={loading}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;