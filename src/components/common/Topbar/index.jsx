import React from "react";
import LogoWhite from "../../../assets/logo-white-bg.png";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle  } from "react-icons/fa";
import { FaBell } from "react-icons/fa";

const Topbar = () => {
  let navigate = useNavigate();
  return (
    <div className="topbar-main">
      <div className="Logo">
        <img
          src={LogoWhite}
          className="BarLogo"
          onClick={() => navigate("/home")}
        />
      </div>
      <div className="nav-items">
        <ul>
          <li onClick={() => navigate("/projects")}>Projects</li>
          <li onClick={() => navigate("/leaderboard")}>Leaderboard</li>
          <li onClick={() => navigate("/organizations")}>Organizations</li>
        </ul>
      </div>
      <div className="react-icons">
        <FaBell size={30} className="react-icon"/>
        <FaUserCircle  size={30} className="react-icon"/>
      </div>
    </div>
  );
};

export default Topbar;
