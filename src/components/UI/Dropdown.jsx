import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Dropdown - Menu dropdown genérico
 * @param {React.ReactNode} trigger - Elemento que abre o dropdown
 * @param {React.ReactNode} children - Conteúdo do dropdown
 * @param {string} align - Alinhamento: 'left' | 'right'
 */
const Dropdown = ({ trigger, children, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const alignmentClass = align === 'left' ? 'left-0' : 'right-0';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`
            absolute ${alignmentClass} top-full mt-2 w-56 
            bg-white dark:bg-gray-800 rounded-lg shadow-lg 
            border border-gray-200 dark:border-gray-700 
            py-1 z-50 animate-scale-in
          `}
        >
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * DropdownItem - Item do dropdown
 */
export const DropdownItem = ({ icon, children, onClick, variant = 'default' }) => {
  const variants = {
    default: 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
    danger: 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
        ${variants[variant]}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

/**
 * DropdownDivider - Divisor do dropdown
 */
export const DropdownDivider = () => {
  return <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />;
};

export default Dropdown;