import React, { useState, useEffect } from "react";
import { firestore } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import ProjectsDisplay from "./common/Projects";
import SearchProject from "./common/SearchProject";
import { Box, Container, Typography, AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#ffffff',
  minHeight: 'calc(100vh - 64px)',
  marginTop: '64px',
}));

const HomeComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const projectsCollection = await firestore.collection("projects").get();
        const projectsData = projectsCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
        setFilteredProjects(projectsData); // Initialize filtered projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  return (
    <Box sx={{ backgroundColor: '#ffffff' }}>
      <StyledAppBar>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: '#333' }}
          >
            Project Dashboard
          </Typography>
          <SearchProject 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
        </Toolbar>
      </StyledAppBar>

      <ContentWrapper>
        <Container maxWidth="lg">
          {isLoading ? (
            <Typography 
              variant="h6" 
              sx={{ textAlign: 'center', mt: 4, color: '#666' }}
            >
              Loading projects...
            </Typography>
          ) : filteredProjects.length === 0 ? (
            <Typography 
              variant="h6" 
              sx={{ textAlign: 'center', mt: 4, color: '#666' }}
            >
              {searchTerm ? `No projects found matching "${searchTerm}"` : "No projects available"}
            </Typography>
          ) : (
            <ProjectsDisplay projects={filteredProjects} />
          )}
        </Container>
      </ContentWrapper>
    </Box>
  );
};

export default HomeComponent;
