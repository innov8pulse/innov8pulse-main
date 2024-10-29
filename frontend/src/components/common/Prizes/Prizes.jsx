// src/components/common/Prizes/Prizes.js
import React, { useState } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';

const Prizes = ({ project, currentUserId }) => {
  const [newPrize, setNewPrize] = useState('');
  const isOwner = currentUserId === project.userId;

  const handleAddPrize = async () => {
    const db = getFirestore(app);
    const projectRef = doc(db, 'projects', project.id); // assuming `project.id` is available

    await updateDoc(projectRef, {
      prizes: arrayUnion(newPrize)
    });

    setNewPrize('');
  };

  return (
    <div>
      <h2>Prizes</h2>
      <ul>
        {project.prizes && project.prizes.map((prize, index) => (
          <li key={index}>{prize}</li>
        ))}
      </ul>
      {isOwner && (
        <div>
          <input
            type="text"
            placeholder="Enter prize"
            value={newPrize}
            onChange={(e) => setNewPrize(e.target.value)}
          />
          <button onClick={handleAddPrize}>Add Prize</button>
        </div>
      )}
    </div>
  );
};

export default Prizes;
