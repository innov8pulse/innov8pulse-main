import React from 'react';
import { useNavigate } from "react-router-dom";
import './Footer.css';

const Footer = () => {
const navigate = useNavigate();

const handleStartProjectClick = () => {
    navigate("/myprojects");  
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Innov8Pulse</h2>
          <p>Fuelling Innovation Beyond the Event.</p>
          
        <div className="footer-logo2">
            <p>hello@innov8pulse.network</p>
        </div>
        </div>

        <div className="footer-links">
        <h3>Quick Links</h3>
        <ul>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
        </ul>
    </div>

    <div className="footer-links">
        <h3>Resources</h3>
        <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/guides">Guides</a></li>
            <li><a href="/updates">Latest Updates</a></li>
        </ul>
    </div>

    <div className="footer-links">
        <h3>Community</h3>
        <ul>
            <li><a href="/community">Community Forum</a></li>
            <li><a href="/events">Hackathons</a></li>
            <li><a href="/feedback">Feedback</a></li>
            <li><a href="/join">Careers</a></li>
            <li><a href="/ambassadors">Ambassador Program</a></li>
        </ul>
    </div>

        <div className="footer-cta">
          <h3>Get Started</h3>
          <button className="cta-button" onClick={handleStartProjectClick}>Create a Project</button>
        </div>

      </div>

      <div className="footer-bottom">
      <div className="footer-social">
          <div className="social-icons">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
          </div>
        </div>

      
        <p>&copy; 2024 Innov8Pulse. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
