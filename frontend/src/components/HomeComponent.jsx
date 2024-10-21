import React, { useState, useEffect } from "react";
import { firestore } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import ProjectsDisplay from "./common/Projects";
import SearchProject from "./common/SearchProject";

const HomeComponent = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [projects, setProjects] = useState([]); // State for all projects
  const [filteredProjects, setFilteredProjects] = useState([]); // State for filtered projects

  useEffect(() => {
    // Fetch projects from Firestore (mocking this part)
    const fetchProjects = async () => {
      const projectsCollection = await firestore.collection("projects").get();
      const projectsData = projectsCollection.docs.map(doc => doc.data());
      setProjects(projectsData); // Set the fetched projects
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Filter projects based on search term
    const filtered = projects.filter(project =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) // Search by project name
    );
    setFilteredProjects(filtered); // Update the filtered projects
  }, [searchTerm, projects]);

  return (
    <>
      <SearchProject searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProjectsDisplay projects={filteredProjects} /> {/* Pass the filtered projects */}
    </>
  );
};

export default HomeComponent;
