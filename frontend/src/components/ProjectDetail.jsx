import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import Loader from "../components/common/Loader";
import Topbar from "../components/common/Topbar";
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { projectName } = useParams(); // Get project name from URL params
  const [project, setProject] = useState(null); // Set project as null initially
  const [loading, setLoading] = useState(true); // Loading state
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Timeline', 'Rules', 'Prizes', 'FAQs', 'Updates', 'Participants'];

  useEffect(() => {
    const fetchProject = async () => {
      const db = getFirestore(app);
      const projectsRef = collection(db, 'projects');

      // Query the projects collection where projectName matches the URL param
      const q = query(projectsRef, where('projectName', '==', projectName));
      
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Assuming project names are unique, take the first match
        const projectData = querySnapshot.docs[0].data();
        setProject(projectData); // Set the project data
      } else {
        console.error("Project not found");
      }

      setLoading(false); // Stop loading once the data is fetched
    };

    fetchProject();
  }, [projectName]);

  // Show a loader while the data is being fetched
  if (loading) {
    return <Loader />;
  }

  // Handle case when no project is found or project is null
  if (!project) {
    return <div>Project not found or unavailable.</div>;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
    <Topbar />
    <div className="project-container">
      {/* Header Section */}
      <div className="project-header">
        <img 
          src={project.image || "https://via.placeholder.com/1400x400"} 
          alt="Project Banner" 
          className="header-image"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="tab-container">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      
      <div className="container">
  <div className="header">
    <h1>{project.projectName}</h1>
    <p>{project.projectDescription}</p>
    {/* Action Buttons */}
      <div className="action-buttons">
        {project.website && (
          <a href={project.website} target="_blank" rel="noopener noreferrer">
            <button className="btn-secondary">WEBSITE</button>
          </a>
        )}
        {project.discord && (
          <a href={project.discord} target="_blank" rel="noopener noreferrer">
            <button className="btn-secondary">JOIN DISCORD</button>
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <button className="btn-secondary">VIEW GITHUB REPO</button>
          </a>
        )}
      </div>
  </div>

  {/* Tab Content */}
  <div className="tab-content">
    {activeTab === 'Overview' && (
      <div>
        <h2>{project.projectName}</h2>
        <p>
          The {project.projectName} Hackathon focuses on leveraging technologies to tackle challenges 
          related to {project.tags}. This event brings together coders, problem-solvers, and innovators 
          to develop cutting-edge solutions in fields like {project.projectState}.
        </p>
      </div>
    )}
    {activeTab === 'Timeline' && (
  <div>
    <h2>Timeline</h2>
    <div className="timeline">
      <div className="timeline-event">
        <p>Created: {new Date(project.createdAt.seconds * 1000).toDateString()}</p>
      </div>
      <div className="timeline-event">
        <p>Project Progress: {project.progress || "In Progress"}</p>
      </div>
      <div className="timeline-event">
        {project.prizes && project.prizes.length > 0 ? (
          <p>Prizes Won: {project.prizes.join(", ")}</p>
        ) : (
          <p>This project has not yet won any prizes.</p>
        )}
      </div>
    </div>
  </div>
)}

    {activeTab === 'Overview' && (
      <div>
      </div>
    )}
    {activeTab === 'Rules' && (
  <div>
    <h2>Contribution Rules</h2>
    <ul>
      <li>All contributions must align with the project’s vision and objectives. Please review the project documentation before submitting any contributions.</li>
      <li>Before starting any new work, discuss your ideas with the project owner or team to avoid overlap or duplication of efforts.</li>
      <li>All contributors must follow the project's coding standards and best practices. Make sure your code is clean, well-documented, and includes relevant tests where necessary.</li>
      <li>Respect others' contributions and provide constructive feedback. Collaboration and mutual respect are key to the project's success.</li>
      <li>Ensure that any third-party code or libraries used in your contributions are properly licensed and compatible with the project.</li>
      <li>All pull requests or changes should be submitted for review and approval before being merged into the main branch.</li>
      <li>Be responsive and available for feedback on your contributions, especially during the review process.</li>
      <li>Contributions should adhere to the project’s roadmap and timeline. Unrelated features or changes may be deferred for future consideration.</li>
      <li>By contributing, you agree to share your work under the project's license, granting the project maintainers the right to use, modify, and distribute your contributions.</li>
      <li>If you notice any bugs or issues, report them through the appropriate channels (e.g., issue tracker) before working on a fix.</li>
    </ul>
  </div>
)}


{activeTab === 'Prizes' && (
  <div>
    <h2>Prizes</h2>
    {project.prizes && project.prizes.length > 0 ? (
      <ul>
        {project.prizes.map((prize, index) => (
          <li key={index}>{prize}</li>
        ))}
      </ul>
    ) : (
      <p>This project has not yet won any prizes.</p>
    )}
  </div>
)}

    {activeTab === 'FAQs' && (
  <div>
    <h2>Frequently Asked Questions</h2>
    <ul>
      <li><strong>Q:</strong> How can I join the {project.projectName} project?<br/>
        <strong>A:</strong> You can join by logging in and selecting the "Join" button on the project page.
      </li>
      <li><strong>Q:</strong> What is the project about?<br/>
        <strong>A:</strong> The {project.projectName} focuses on solving challenges related to {project.tags} using innovative technology solutions.
      </li>
      <li><strong>Q:</strong> Do I need to have a specific skill set to contribute?<br/>
        <strong>A:</strong> No, this hackathon welcomes participants of all skill levels. However, some knowledge of {project.technologies || "related technologies"} would be helpful.
      </li>
      <li><strong>Q:</strong> What happens after the hackathon ends?<br/>
        <strong>A:</strong> After the hackathon, the project will be reviewed and there may be future development opportunities.
      </li>
      <li><strong>Q:</strong> How can I contact the project team?<br/>
        <strong>A:</strong> You can reach out through the project’s Discord channel or visit the website for more contact information.
      </li>
    </ul>
  </div>
)}
{activeTab === 'Updates' && (
  <div>
    <h2>Updates</h2>
    <ul>
      <li>Update 1: New contributors have joined the project.</li>
      <li>Update 2: The project has reached its first milestone.</li>
      <li>Update 3: The project is preparing for the second round of reviews.</li>
    </ul>
  </div>
)}

    {activeTab === 'Participants' && (
      <div>
      </div>
    )}
  </div>
</div>


      

      {/* Event Information Section */}
      <div className="event-info">
        <h3>Event Dates</h3>
        <p>
          Start Date: {project.startDate || "Not Provided"}<br />
          End Date: {project.endDate || "Not Provided"}
        </p>
        <p>
          Join the {project.projectName} hackathon from {new Date(project.createdAt.seconds * 1000).toDateString()}.
          This event will provide a great opportunity for learning and building innovative solutions.
        </p>
      </div>
    </div>
    </>
  );
};

export default ProjectDetail;
