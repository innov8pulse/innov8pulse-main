// src/components/common/Contributors/Contributors.js
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';

const Contributors = ({ project = {}, currentUserId }) => {
  const [contributors, setContributors] = useState([]);
  const [newContributor, setNewContributor] = useState('');
  const isOwner = currentUserId === project.userId;
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const db = getFirestore(app);
    const projectRef = doc(db, 'projects', project.id); // assuming `project.id` is available

    // Fetch contributors from Firestore in real-time
    const unsubscribe = onSnapshot(projectRef, (doc) => {
      const data = doc.data();
      if (data && data.contributors) {
        setContributors(data.contributors); // Set contributors from Firestore
      } else {
        setContributors([]); // Ensure contributors is an empty array if undefined
      }
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, [project.id]);

  const handleAddContributor = async () => {
    if (newContributor.trim() === '') return; // Prevent adding empty names

    const db = getFirestore(app);
    const projectRef = doc(db, 'projects', project.id);

    await updateDoc(projectRef, {
      contributors: arrayUnion(newContributor)
    });

    setNewContributor(''); // Clear the input field
  };

  return (
    <div className="contributors-container">
      <h2 className="contributors-title">Contributors</h2>
      <ul className="contributor-list">
        {contributors.length > 0 ? ( // Check if contributors array has elements
          contributors.map((contributor, index) => (
            <li className="contributor-item" key={index}>{contributor}</li>
          ))
        ) : (
          <li>No contributors yet</li> // Show message if no contributors
        )}
      </ul>
      {isOwner && (
        <div className="contributor-input">
          <input
            type="text"
            placeholder="Enter contributor name"
            value={newContributor}
            onChange={(e) => setNewContributor(e.target.value)}
          />
          <button onClick={handleAddContributor}>Add Contributor</button>
        </div>
      )}
    </div>
  );
};

export default Contributors;
