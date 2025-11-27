import React from 'react';

/**
 * Input - Componente de input reutilizável
 * @param {string} label - Label do input
 * @param {string} error - Mensagem de erro
 * @param {string} hint - Texto de ajuda
 * @param {React.ReactNode} icon - Ícone à esquerda
 * @param {string} className - Classes adicionais
 */
const Input = React.forwardRef(({
  label,
  error,
  hint,
  icon,
  className = '',
  ...props
}, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={inputId}
          className={`
            input
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
          `}
          {...props}
        />
      </div>

      {/* Error or Hint */}
      {error ? (
        <p className="mt-2 text-xs text-red-500 dark:text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;