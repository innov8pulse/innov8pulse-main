// MainProjectsPage.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../../firebaseConfig'; 
import SearchProject from "../SearchProject";
import "../Projects/index.css";
const MainProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const db = getFirestore(app); // Initialize Firestore with the app instance
      const projectsCollection = collection(db, 'projects'); // Access the projects collection
      const projectSnapshot = await getDocs(projectsCollection); // Get documents
      const projectList = projectSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Map documents to data
      setProjects(projectList); // Set the projects state
    };
    fetchProjects();
  }, []);

  return (
    <div>
      < SearchProject />
      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.projectName}</h3>
            <p>{project.projectDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainProjectsPage;
