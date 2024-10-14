import React from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";

const SearchProject = () => {
  return (
    <div className="title-container">
      <div className="header-container">
        <h1 className="home-title">Projects</h1>
        <input
          type="text"
          placeholder="Search Project"
          className="input-container"
        />
      </div>
    </div>
  );
};

export default SearchProject;
