import React from "react";
// { searchTerm, setSearchTerm }
const MyProject = () => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  return (
    <div className="title-container">
      <div className="header-container">
        <h1 className="home-title">My Projects</h1>
        <input
          type="text"
        //   value={searchTerm} // Bind searchTerm state to the input
          onChange={handleSearchChange} 
          placeholder="Search Project"
          className="input-container"
        />
      </div>
      <hr className="divider" />
    </div>
  );
};

export default MyProject;
