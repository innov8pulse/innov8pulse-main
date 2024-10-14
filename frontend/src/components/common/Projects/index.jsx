import React, { useState } from "react";
import ProjectForm from "./projectForm";
import "./index.css";

const Projects = () => {
  // State to hold project data
  const [projectData, setProjectData] = useState([]);
  
  // State to hold form input values
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contributors: "",
    tags: "",
    image: "",
    stage: "",
    prize: ""
  });

  // Handle input change for the form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to add new project
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Add the new project to the project data list
    setProjectData([...projectData, formData]);

    // Clear form after submission
    setFormData({
      title: "",
      description: "",
      contributors: "",
      tags: "",
      image: "",
      stage: "",
      prize: ""
    });
  };

  return (
    <>

      {/* Display Project Cards */}
      <div className="project-cards">
        {projectData.map((curElm, index) => {
          return (
            <div className="project-card" key={index}>
              <div className="project-image">
                {curElm.stage && (
                  <span className={`stage-label ${curElm.stage.toLowerCase()}`}>
                    {curElm.stage}
                  </span>
                )}
                <img
                  src={curElm.image ? curElm.image : `https://picsum.photos/400/400?random=${index}`}
                  alt={curElm.title || "Project Image"}
                />
              </div>

              <div className="contributors-section">
                <i className="fas fa-user-friends"></i>
                <span className="contributors-count">
                  {curElm.contributors ? curElm.contributors.split(",").length : 0}
                </span>
              </div>

              <div className="project-content">
                <div className="project-title">
                  <h3>{curElm.title}</h3>
                </div>
                <div className="description">
                  <p>
                    {curElm.description.length > 100 ? (
                      <>
                        {curElm.description.substring(0, 100)}...
                        <span className="read-more">Read More</span>
                      </>
                    ) : (
                      curElm.description
                    )}
                  </p>
                </div>
                <div className="tags-button-container">
                  <div className="tags-container">
                    {curElm.tags.split(",").map((tag, index) => (
                      <span className="tag" key={index}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="view-button">
                    <button>View</button>
                  </div>
                </div>

                <div className="prize-section">
                  <span className="prize-label">Value:</span>
                  <span className="prize-value">{curElm.prize ? curElm.prize : "TBD"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Projects;
