import React, { useRef, useEffect } from "react";
import { useState } from "react";
import viteLogo from "/vite.svg";
// import Login from "../Pages/Login";
import LogoWhite from "../assets/logo-white-bg.png";
import "../index.css";
import "../App.css";
import Topbar from "../components/common/Topbar";
import Button  from "../components/common/Button/button";
import { useNavigate } from "react-router-dom";

export default function LandingComponent() {
  let navigate = useNavigate();
  const videoRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    "Join the movement of innovators.",
    "Bring your ideas to life.",
    "Empower yourself with knowledge.",
    "Collaborate and grow together.",
    "Build for the future.",
  ];

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleEnd = () => {
      videoElement.currentTime = 0; 
      videoElement.play(); 
    };

    videoElement.addEventListener("ended", handleEnd);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => {
      videoElement.removeEventListener("ended", handleEnd);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleEnd = () => {
      videoElement.currentTime = 0; 
      videoElement.play(); 
    };

    videoElement.addEventListener("ended", handleEnd);

    return () => {
      videoElement.removeEventListener("ended", handleEnd);
    };
  }, []);

  const handleJoinInnovationClick = () => {
    navigate("/register");
  };

  const handleExploreProjectsClick = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="Hero">
        <div className="Left-Content">
          <img src={LogoWhite} className="innovLogo" />
          <div className="Headers">
            <div className="Hero-Heading">
              <h1 className="title">welcome to innov8Pulse.</h1>
              <div className="Hero-Heading-2">
                <p className="subtitle">
                  fuelling innovation
                  <br></br>beyond the event
                </p>
              </div>
              <div className="button-container" style={{ textAlign: 'center', marginTop: '20px' }}>
      <Button text="join us" onClick={handleJoinInnovationClick} />
      <Button
        text="explore"
        onClick={handleExploreProjectsClick}
        variant="alt" 
      />
    </div>
            </div>
          </div>
        </div>
        <div className="Right-Content">
          <div className="Vid-Container">
            <div className="video-container">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="background-video"
              >
                <source src="/bgvideo.mp4" type="video/mp4" />
              </video>
              <div className="overlay" />
              <div className="dynamic-list">
                <h1>{items[currentIndex]}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
