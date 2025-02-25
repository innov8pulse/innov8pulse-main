import React from 'react';
import { useNavigate } from 'react-router-dom';
import { onLogout } from '../../../api/AuthAPI';
import { auth } from '../../../firebaseConfig';
import "./index.css";

const Topbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await onLogout();
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="topbar-main">
      <div className="navbar-items">
        <div className="navbar-left">
          <img 
            className="innov8-logo" 
            src="/innov8.png" 
            alt="Innov8 Logo" 
            onClick={() => navigate('/home')}
          />
        </div>
        <div className="navbar-right">
          {user && (
            <>
              <button onClick={() => navigate('/projects')} className="nav-button">
                Projects
              </button>
              <button onClick={() => navigate('/myprojects')} className="nav-button">
                My Projects
              </button>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
