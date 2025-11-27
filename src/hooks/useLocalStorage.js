import { useState, useEffect } from 'react';

/**
 * useLocalStorage - Hook para gerenciar estado sincronizado com LocalStorage
 * @param {string} key - Chave do LocalStorage
 * @param {*} initialValue - Valor inicial (usado se não houver dado no storage)
 * @returns {[value, setValue, removeValue]} - Estado, setter e remover
 */
const useLocalStorage = (key, initialValue) => {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Busca do LocalStorage
      const item = window.localStorage.getItem(key);
      
      // Parse e retorna o valor ou valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler ${key} do LocalStorage:`, error);
      return initialValue;
    }
  });

  // Função para salvar no LocalStorage
  const setValue = (value) => {
    try {
      // Permite que value seja uma função (como setState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Salva no estado
      setStoredValue(valueToStore);
      
      // Salva no LocalStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao salvar ${key} no LocalStorage:`, error);
    }
  };

  // Função para remover do LocalStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Erro ao remover ${key} do LocalStorage:`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;