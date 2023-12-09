import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      //navigate(`/Search/${searchTerm}`);
    }
  };

  return (
    <div className="input-box pt-6">
      <input
        type="text"
        placeholder="🔍 Search for countries and country data"
        className="form-control"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <i className="fa fa-search" onClick={handleSearch}></i>
    </div>
  );
};

export default SearchBar;
