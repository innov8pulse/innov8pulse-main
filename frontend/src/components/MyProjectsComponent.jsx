import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import "./common/AddProjectCard/index.css";
import AddProjectCard from "./common/AddProjectCard";
import Topbar from './common/Topbar';
import Loader from "./common/Loader";
import SearchProject from './common/SearchProject';
import Footer from "./common/Footer/Footer";

const MyProjectsComponent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const user = auth.currentUser;
            if (!user) return; 

            const db = getFirestore();
            const q = query(collection(db, 'projects'), where('userId', '==', user.uid));
            try {
                const querySnapshot = await getDocs(q);
                const userProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProjects(userProjects);
                setFilteredProjects(userProjects);
            } catch (err) {
                setError("Failed to load projects.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Add search filtering
    useEffect(() => {
        if (searchTerm) {
            const filtered = projects.filter(project => 
                project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.projectDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (project.tags && project.tags.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredProjects(filtered);
        } else {
            setFilteredProjects(projects);
        }
    }, [searchTerm, projects]);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Topbar />
            <SearchProject 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
            />
            <div className="project-list">
                {filteredProjects.length === 0 ? (
                    <p style={{ color: '#17202a' }}>
                        {searchTerm ? "No matching projects found" : "Create your first project!🎉"}
                    </p>
                ) : (
                    filteredProjects.map(project => (
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
                                            {project.tags && project.tags.split(',').map((tag, index) => (
                                                <span key={index} className="tag">{tag.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <div>
                <AddProjectCard />
            </div>
            <Footer />
        </div>
    );
};

export default MyProjectsComponent;
