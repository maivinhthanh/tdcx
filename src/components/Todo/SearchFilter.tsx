import { useState, useEffect } from "react";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SearchFilter({ searchTerm, setSearchTerm }: SearchFilterProps) {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue, setSearchTerm]);

  return (
    <input
      className="border p-2 w-full mb-2 rounded-md"
      type="text"
      placeholder="Search todos..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
