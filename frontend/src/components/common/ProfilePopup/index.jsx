import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";

const ProfilePopup = () => {
  let navigate = useNavigate();
  return (
    <div className="popup-card">
        <ul className="popup-options">
            <li className="popup-option" onClick={onLogout}>
                Logout
            </li>
        </ul>
    </div>
  );
};

export default ProfilePopup;