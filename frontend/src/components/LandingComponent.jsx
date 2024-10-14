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

    // Loop the video
    const handleEnd = () => {
      videoElement.currentTime = 0; // Reset to start
      videoElement.play(); // Play again
    };

    videoElement.addEventListener("ended", handleEnd);

    // Change item every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000); // Change every 3 seconds

    return () => {
      videoElement.removeEventListener("ended", handleEnd);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleEnd = () => {
      videoElement.currentTime = 0; // Reset to start
      videoElement.play(); // Play again
    };

    videoElement.addEventListener("ended", handleEnd);

    // Clean up event listener on component unmount
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
                  where innovation meets action
                  <br></br>and ideas come to life
                </p>
              </div>
              <div className="button-container" style={{ textAlign: 'center', marginTop: '20px' }}>
      <Button text="join us" onClick={handleJoinInnovationClick} />
      <Button
        text="explore projects"
        onClick={handleExploreProjectsClick}
        variant="alt" 
      />
    </div>
            </div>
          </div>
        </div>
        <div className="Right-Content">
          <div className="Vid-Container">
            {/* <video 
      src="https://www.youtube.com/embed/JpKOzW73KFI?si=Gy1d9Z0RkNGFBjWp" 
      autoPlay 
      loop 
      muted 
      playsInline
      className="background-video"
    >
    </video> */}
            {/* <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/JpKOzW73KFI?autoplay=1&loop=1&mute=1&playlist=JpKOzW73KFI&controls=0&start=15"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    className="background-video"
  ></iframe> */}
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
