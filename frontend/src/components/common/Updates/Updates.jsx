import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Updates.css';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';

const Updates = ({ currentUserId, projectOwnerId, projectCreatedDate, projectName, userId }) => {
  const [updates, setUpdates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newUpdate, setNewUpdate] = useState({ title: '', content: '', date: new Date() });
  const [currentEventId, setCurrentEventId] = useState(null);

  const isOwner = currentUserId === projectOwnerId;

  useEffect(() => {
    const fetchUpdates = async () => {
      // Fetch updates only for this specific project using projectName
      const updatesCollection = collection(db, 'updates');
      const projectQuery = query(updatesCollection, where('projectName', '==', projectName));
      const updateSnapshot = await getDocs(projectQuery);
      const updatesList = updateSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUpdates(updatesList);
    };
    fetchUpdates();
  }, [projectName]);

  const handleAddToggle = () => setIsAdding(!isAdding);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUpdate((prevUpdate) => ({ ...prevUpdate, [name]: value }));
  };

  const handleDateChange = (date) => {
    setNewUpdate((prevUpdate) => ({ ...prevUpdate, date }));
  };

  const handleAddUpdate = async () => {
    if (newUpdate.title && newUpdate.content) {
      const updateData = {
        title: newUpdate.title,
        content: newUpdate.content,
        date: newUpdate.date.toISOString(),
        current: false,
        projectName, 
      };
      try {
        const docRef = await addDoc(collection(db, 'updates'), updateData);
        setUpdates([...updates, { id: docRef.id, ...updateData }]);
        setNewUpdate({ title: '', content: '', date: new Date() });
        setIsAdding(false);
      } catch (error) {
        console.error("Error adding update: ", error);
      }
    }
  };
  
  const handleSetCurrentEvent = async (id) => {
    setCurrentEventId(id);
    const updatedUpdates = updates.map((update) =>
      update.id === id ? { ...update, current: true } : { ...update, current: false }
    );
    setUpdates(updatedUpdates);

    const updateRef = doc(db, 'updates', id);
    await updateDoc(updateRef, { current: true });
  };

  const isPastEvent = (date) => new Date(date) < new Date();

  return (
    <div className="updates-container">
      <h2>Project Updates</h2>
      <ul className="updates-list">
        {updates.map((update) => (
          <li
            key={update.id}
            className={`update-item ${update.current ? 'current-event' : ''} ${
              isPastEvent(update.date) && !update.current ? 'past-event' : ''
            }`}
            onClick={() => handleSetCurrentEvent(update.id)}
          >
            <h3>{update.title}</h3>
            <p>{update.content}</p>
            <small>{new Date(update.date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>

      {isOwner && (
        <div className="add-update-section">
          <button className="btn-primary" onClick={handleAddToggle}>
            {isAdding ? 'Cancel' : 'Add Update'}
          </button>
          {isAdding && (
            <div className="add-update-form">
              <input
                type="text"
                name="title"
                value={newUpdate.title}
                onChange={handleInputChange}
                placeholder="Update Title"
                required
              />
              <textarea
                name="content"
                value={newUpdate.content}
                onChange={handleInputChange}
                placeholder="Update Content"
                required
              />
              <DatePicker
                selected={newUpdate.date}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select event date"
              />
              <button
                className="btn-secondary"
                onClick={handleAddUpdate}
                disabled={!newUpdate.title || !newUpdate.content}
              >
                Post Update
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Updates;
