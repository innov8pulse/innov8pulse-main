import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { app } from '../firebaseConfig';
import Loader from "../components/common/Loader";
import Topbar from "../components/common/Topbar";
// import Timeline from "../components/common/Timeline/Timeline";/
import './ProjectDetail.css';
import Timeline from './common/Timeline/Timeline';
import Updates from './common/Updates/Updates';
import Footer from './common/Footer/Footer';
import Prizes from './common/Prizes/Prizes';

const ProjectDetail = ({ projectId }) => {
  const { projectName } = useParams(); 
  const [project, setProject] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [activeTab, setActiveTab] = useState('Overview');
  const [userRole, setUserRole] = useState('participant'); 
  const [notificationSent, setNotificationSent] = useState(false);
  const currentUserId = auth.currentUser?.uid;
  const tabs = ['Overview', 'Timeline', 'Rules', 'Prizes', 'FAQs', 'Updates', 'Participants'];
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const db = getFirestore(app);
      const projectsRef = collection(db, 'projects');

      const q = query(projectsRef, where('projectName', '==', projectName));
      
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const projectData = querySnapshot.docs[0].data();
        setProject(projectData); 
      } else {
        console.error("Project not found");
      }

      setLoading(false); 
    };

    fetchProject();
  }, [projectName]);

  if (loading) {
    return <Loader />;
  }

  if (!project) {
    return <div>Project not found or unavailable.</div>;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleContributeClick = async () => {
    const db = getFirestore(app);
    const ownerRef = doc(db, 'users', project.ownerId); 
    const notificationData = {
      message: `Mentor wants to contribute to your project: ${project.projectName}`,
      projectId: projectName,
      timestamp: new Date(),
      status: 'pending' 
    };

    await setDoc(doc(db, 'notifications', ownerRef.id), notificationData, { merge: true });
    
    setNotificationSent(true); 
    alert("Your request to contribute has been sent to the project owner."); 
  };

  return (
    <>
    <Topbar />
    <div className="project-container">
      <div className="project-header">
        <img 
          src={project.image || "https://via.placeholder.com/1400x400"} 
          alt="Project Banner" 
          className="header-image"
        />
      </div>

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
        {userRole === 'mentor' && (
                <button className="btn-primary" onClick={handleContributeClick}>
                  Ask to Contribute
                </button>
              )}
      </div>
  </div>

  <div className="tab-content">
    {activeTab === 'Overview' && (
      <div>
        <h2>{project.projectName}</h2>
        <p>
          The {project.projectName} project focuses on leveraging technologies to tackle challenges 
          related to {project.tags}. This event brings together coders, problem-solvers, and innovators 
          to develop cutting-edge solutions in fields like {project.projectState}. 
        </p>
        <p>
          Contribute to {project.projectName} by clicking the discord button and the owner will 
          let you in. Happy building.
        </p>
      </div>
    )}
    {activeTab === 'Timeline' && (
  <div>
    <Timeline isOwner={auth.currentUser && auth.currentUser.uid === project.userId}  projectName={projectName} />
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
    <Prizes project={project} currentUserId={currentUserId} />
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
    <Updates currentUserId={currentUserId} projectOwnerId={project.userId} projectName={projectName}  projectId={projectId} />
  </div>
)}

    {activeTab === 'Participants' && (
      <div>
         {/* <Contributors /> */}
      </div>
    )}
  </div>
</div>


      

      <div className="event-info">
        {/* <h3>Event Dates</h3> */}
        {/* <p>
          Start Date: {project.startDate || ""}<br />
          End Date: {project.endDate || ""}
        </p> */}
        <p>
          The {project.projectName} project was registered on the platform on {new Date(project.createdAt.seconds * 1000).toDateString()}.
          
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProjectDetail;
