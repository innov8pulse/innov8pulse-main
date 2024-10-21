import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { app } from '../../../firebaseConfig'; 
import SearchProject from "../SearchProject";
import AddProjectCard from "../AddProjectCard";
import "../Projects/index.css";
import { useAccount } from '@starknet-react/core'; 
import { Link } from 'react-router-dom';

const MainProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { address } = useAccount();

  useEffect(() => {
    const db = getFirestore(app);
    const projectsCollection = collection(db, 'projects');

    const unsubscribe = onSnapshot(projectsCollection, (snapshot) => {
      const projectList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(projectList);
      setFilteredProjects(projectList); 
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const addProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setFilteredProjects((prevFiltered) => [...prevFiltered, newProject]); 
  };

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <SearchProject searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {address && <AddProjectCard addProject={addProject} />} {/* Pass addProject as prop */}
      <div className="project-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link to={`/projects/${encodeURIComponent(project.projectName)}`} key={project.id}>
              <div className="taikai-card">
                <div className="project-image">
                  <img
                    src={project.image || "https://via.placeholder.com/300"} // Display uploaded image
                    alt={project.projectName}
                  />
                  <span
                    className="project-state-badge"
                    style={{
                      backgroundColor: '#550767',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '5px',
                    }}
                  >
                    {project.projectState}
                  </span>
                </div>
                <div className='detailss'>
                <span className="contributors-count">
                  <i className="fas fa-users"></i> {project.contributors ? project.contributors.split(',').length : 0}
                </span>
                <h3 className="project-title">{project.projectName}</h3>
                <p className={`project-description ${isExpanded ? 'expanded' : ''}`}>
      {project.projectDescription}
    </p>
    
    {project.projectDescription.split(' ').length > 50 && (
      <span className="read-more-btn" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Read less' : 'Read more'}
      </span>
    )}
                <div className="project-info">
                  <div className='tags-container'>
                    {project.tags.split(',').map((tag, index) => (
                      <span key={index} className="tag">{tag.trim()}</span>
                    ))}
                  </div>
                </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>

      <AddProjectCard />
    </div>
  );
};

export default MainProjectsPage;
