import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import "../components/common/AddProjectCard/index.css"; 
import AddProjectCard from "../components/AddProjectsComponent";
import Topbar from './common/Topbar';
import Loader  from "../components/common/Loader";
import SearchProject from './common/SearchProject';
import Footer  from "../components/common/Footer/Footer";
const MyProjectsComponent = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

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
            } catch (err) {
                setError("Failed to load projects.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <div>
                <Topbar />

            <SearchProject/>
            <div className="project-list">
                {projects.length === 0 ? (
                    <p style={{ color: '#17202a' }}>Create your first project!🎉</p>
                ) : (
                    projects.map(project => (
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

                
            <div>
                 <AddProjectCard />
            </div>
            </div>
            <div>
            <Footer />
            </div>
        </div>
        
    );
};

export default MyProjectsComponent;
