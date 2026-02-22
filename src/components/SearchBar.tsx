import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par lieu ou titre..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        <button className="search-button">🔍</button>
      </div>
    </div>
  );
};

export default SearchBar;
