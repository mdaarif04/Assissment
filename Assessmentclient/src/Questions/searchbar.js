import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search questions..."
      value={searchTerm}
      onChange={handleSearch}
      style={{ width: "100%", padding: "10px", margin: "5px 0" }}
    />
  );
};

export default SearchBar;
