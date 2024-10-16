import React, { useState } from "react";
import LogoWhite from "../../../assets/logo-white-bg.png";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { Modal, Button } from 'react-bootstrap';
import { auth } from '../../../firebaseConfig';
import { useStarknetkitConnectModal } from 'starknetkit';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';

const Topbar = () => {
  let navigate = useNavigate();

  const { connect, connectors } = useConnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors,  // Removed "as any" assertion
  });

  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr) => {
    return addr ? `${addr.slice(0, 5)}...${addr.slice(-4)}` : '';
  };

  const connectWallet = async () => {
    const { connector } = await starknetkitConnectModal();
    if (connector) {
      await connect({ connector });
    }
  };

  const disconnectWallet = () => {
    disconnect();
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const CustomModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
      <div className="custom-modal-overlay">
        <div className="custom-modal">
          <div className="custom-modal-body">
            <p>Are you sure you want to log out?</p>
          </div>
          <div className="custom-modal-footer">
            <button className="cancel-button" onClick={onClose}>Cancel</button>
            <button className="confirm-button" onClick={onConfirm}>Logout</button>
          </div>
        </div>
      </div>
    );
  };

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
        <FaBell size={30} className="react-icon" />
        <FaUserCircle
          size={30}
          className="react-icon"
          onClick={() => setShowLogoutModal(true)} 
        />
        <div className="wallet-section">
          {!address ? (
            <button className="connect-wallet-btn" onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <div className="connected-wallet">
              <button className="disconnect-wallet-btn" onClick={disconnectWallet}>Disconnect</button>
              <p className="wallet-address">{formatAddress(address)}</p>
            </div>
          )}
        </div>
        <CustomModal
          show={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </div>
    </div>
  );
};

export default Topbar;


// import React from "react";
// import LogoWhite from "../../../assets/logo-white-bg.png";
// import "./index.css";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { FaBell } from "react-icons/fa";

// const Topbar = ({ showLogin = false }) => { // Added showLogin prop
//   let navigate = useNavigate();

//   const handleLogin = () => {
//     // Handle login functionality here
//     console.log("Login button clicked");
//     // Navigate to login page or trigger login modal
//   };

//   return (
//     <div className="topbar-main">
//       <div className="Logo">
//         <img
//           src={LogoWhite}
//           className="BarLogo"
//           onClick={() => navigate("/home")}
//           alt="Logo"
//         />
//       </div>
//       {!showLogin ? ( // Conditional rendering
//         <div className="nav-items">
//           <ul>
//             <li onClick={() => navigate("/projects")}>Projects</li>
//             <li onClick={() => navigate("/leaderboard")}>Leaderboard</li>
//             <li onClick={() => navigate("/organizations")}>Organizations</li>
//           </ul>
//         </div>
//       ) : (
//         <div className="nav-items">
//           <button className="login-button" onClick={handleLogin}>
//             Login
//           </button>
//         </div>
//       )}
//       <div className="react-icons">
//         <FaBell size={30} className="react-icon" />
//         <FaUserCircle size={30} className="react-icon" />
//       </div>
//     </div>
//   );
// };

// export default Topbar;
