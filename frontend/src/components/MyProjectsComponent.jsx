// MyProjectsPage.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import  AddProjectCard  from "../components/common/AddProjectCard";
import "../components/Styling/myprojects.css"
import SearchProject from "../components/common/SearchProject";


const MyProjectsComponent = () => {
  const [myProjects, setMyProjects] = useState([]);

  useEffect(() => {
    async function fetchMyProjects() {
      try {
        const user = auth.currentUser;
        if (user) {
          const userProjectsRef = collection(db, "projects"); 
          const q = query(userProjectsRef, where("userId", "==", user.uid)); 
    
          const querySnapshot = await getDocs(q);
          const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
          return projects;
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
  }, []);

  return (
    <div>
      <SearchProject />
      <div className="my-project-list">
        {myProjects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.projectName}</h3>
            <p>{project.projectDescription}</p>
          </div>
        ))}
      </div>
      <div>
      <AddProjectCard />
      </div>
    </div>
  );
};

export default MyProjectsComponent;
