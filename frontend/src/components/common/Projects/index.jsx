import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { app } from '../../../firebaseConfig'; 
import SearchProject from "../SearchProject";
import AddProjectCard from "../AddProjectCard";
import "../Projects/index.css";
import { useAccount } from '@starknet-react/core'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import Topbar from "../Topbar";
import Footer from "../Footer/Footer";

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <span
          key={i}
          className={`pagination-number ${i === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </span>
      );
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <button
        className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        &laquo; Prev
      </button>
      <div className="pagination-numbers">{renderPageNumbers()}</div>
      <button
        className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};

const MainProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { address } = useAccount();
  const { pageNumber } = useParams(); // Get the page number from the URL
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1); // Initialize with URL param
  const projectsPerPage = 9; // Number of projects per page

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
    const filtered = projects.filter(project => {
      const projectNameMatch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase());
      const tagsMatch = project.tags.toLowerCase().includes(searchTerm.toLowerCase());
      const contributorsMatch = project.contributors.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = project.projectDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const stateMatch = project.projectState.toLowerCase().includes(searchTerm.toLowerCase());

      return projectNameMatch || tagsMatch || contributorsMatch || descriptionMatch || stateMatch;
    });

    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to page 1 on search
  }, [searchTerm, projects]);

  const addProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setFilteredProjects((prevFiltered) => [...prevFiltered, newProject]); 
  };

  // Get current projects based on pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/projects/page/${pageNumber}`); // Update the URL with the new page
  };

  useEffect(() => {
    if (pageNumber) {
      setCurrentPage(parseInt(pageNumber)); // Update the current page when the URL changes
    }
  }, [pageNumber]);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Topbar />
      <div>
        <SearchProject searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {address && <AddProjectCard addProject={addProject} />} {/* Pass addProject as prop */}      

        <div className="project-list">
          {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
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

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default MainProjectsPage;
