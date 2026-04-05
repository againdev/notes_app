import React from "react";

function SearchBar({ searchValue, setSearchValue }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
