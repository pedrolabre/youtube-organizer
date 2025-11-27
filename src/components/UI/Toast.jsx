import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

/**
 * Toast - Notificação temporária
 * @param {string} message - Mensagem a exibir
 * @param {string} type - Tipo: 'success' | 'error' | 'info' | 'warning'
 * @param {Function} onClose - Callback ao fechar
 * @param {number} duration - Duração em ms (0 = não fecha automaticamente)
 */
const Toast = ({
  message,
  type = 'info',
  onClose,
  duration = 5000
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const types = {
    success: {
      icon: CheckCircle,
      bg: 'bg-green-50 dark:bg-green-900/30',
      border: 'border-green-500 dark:border-green-600',
      text: 'text-green-800 dark:text-green-200',
      iconColor: 'text-green-500 dark:text-green-400'
    },
    error: {
      icon: XCircle,
      bg: 'bg-red-50 dark:bg-red-900/30',
      border: 'border-red-500 dark:border-red-600',
      text: 'text-red-800 dark:text-red-200',
      iconColor: 'text-red-500 dark:text-red-400'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      border: 'border-yellow-500 dark:border-yellow-600',
      text: 'text-yellow-800 dark:text-yellow-200',
      iconColor: 'text-yellow-500 dark:text-yellow-400'
    },
    info: {
      icon: Info,
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      border: 'border-blue-500 dark:border-blue-600',
      text: 'text-blue-800 dark:text-blue-200',
      iconColor: 'text-blue-500 dark:text-blue-400'
    }
  };

  const currentType = types[type] || types.info;
  const Icon = currentType.icon;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-up">
      <div
        className={`
          flex items-start gap-3 p-4 rounded-lg shadow-lg border-l-4 min-w-[300px] max-w-md
          ${currentType.bg} ${currentType.border}
        `}
      >
        {/* Icon */}
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${currentType.iconColor}`} />

        {/* Message */}
        <p className={`flex-1 text-sm font-medium ${currentType.text}`}>
          {message}
        </p>

        {/* Close button */}
        <button
          onClick={onClose}
          className={`flex-shrink-0 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${currentType.iconColor}`}
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;