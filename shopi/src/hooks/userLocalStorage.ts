// useLocalStorage.ts
import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    try {
    return storedValue !== null && storedValue !== undefined ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Error parsing localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  const remove = () => {
    localStorage.removeItem(key);
    setValue(initialValue);
  };

  return [value, setValue, remove];
};

export default useLocalStorage;