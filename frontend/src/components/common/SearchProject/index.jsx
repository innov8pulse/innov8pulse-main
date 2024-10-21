import React from "react";

const SearchProject = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term on input change
  };

  return (
    <div className="title-container">
      <div className="header-container">
        <h1 className="home-title">Projects</h1>
        <input
          type="text"
          value={searchTerm} // Bind searchTerm state to the input
          onChange={handleSearchChange} // Handle search input change
          placeholder="Search Project"
          className="input-container"
        />
      </div>
      <hr className="divider" />
    </div>
  );
};

export default SearchProject;
