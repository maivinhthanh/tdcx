import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "counter_value";

export default function useCounter(initialValue = 0) {
  const getStoredValue = () => {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    return storedValue ? parseInt(storedValue, 10) : initialValue;
  };

  const [count, setCount] = useState(getStoredValue);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, count.toString());
  }, [count]);

  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  const decrement = useCallback(() => setCount((prev) => prev - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}
