import React, { useState, useEffect } from "react";
import LogoWhite from "../../../assets/logo-white-bg.png";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { Modal, Button, Dropdown } from 'react-bootstrap';
import { auth } from '../../../firebaseConfig';
import { useStarknetkitConnectModal } from 'starknetkit';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { getDoc, doc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../../../firebaseConfig"; // Import your Firestore configuration

const Topbar = () => {
  let navigate = useNavigate();
  
  const { connect, connectors } = useConnect();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors,
  });

  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const [userRole, setUserRole] = useState(""); // Store user role
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false); // Modal for mentor without projects

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "users", user.userID);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserRole(userData.role);  
            console.log("User role:", userData.role);  // Log the role for debugging
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
  
    fetchUserRole();
  }, []);

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

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleMyProjects = () => {
    if (userRole === 'participant') {
      navigate("/myprojects");
    } else if (userRole === 'mentor') {
      navigate("/myprojects");
      setShowProjectModal(true);
    }
  };

  const closeModals = () => {
    setShowLogoutModal(false);
    setShowProjectModal(false);
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
          <li onClick={() => navigate("/leaderboard")}>Builders</li>
          <li onClick={() => navigate("/organizations")}>Organizations</li>
          <li onClick={() => navigate("/learn")}>Learn</li>
        </ul>
      </div>
      <div className="react-icons">
        <FaBell size={30} className="react-icon" />

        {/* Dropdown Menu for User */}
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FaUserCircle size={30} className="react-icon" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate("/myprojects")}>My Projects</Dropdown.Item>
            <Dropdown.Item onClick={() => setShowLogoutModal(true)}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Project Modal for Mentor with no Projects */}
        <Modal show={showProjectModal} onHide={closeModals}>
          <Modal.Header closeButton>
            <Modal.Title>No Projects</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are not contributing to any project at the moment.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModals}>Close</Button>
          </Modal.Footer>
        </Modal>

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
