import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { app } from '../../../firebaseConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Timeline.css';

const Timeline = ({ isOwner }) => { 
  const db = getFirestore(app); 
  const eventsCollectionRef = collection(db, 'events'); 

  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: new Date() });

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsSnapshot = await getDocs(eventsCollectionRef);
      const eventsData = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventsData);
    };
    fetchEvents();
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleAddEvent = async () => {
    try {
      const formattedDate = newEvent.date.toLocaleString();
      const docRef = await addDoc(eventsCollectionRef, {
        title: newEvent.title,
        date: formattedDate
      });

      setEvents((prevEvents) => [
        ...prevEvents,
        { id: docRef.id, title: newEvent.title, date: formattedDate }
      ]);

      setNewEvent({ title: '', date: new Date() }); 
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  const handleDateChange = (date) => {
    setNewEvent((prevEvent) => ({ ...prevEvent, date }));
  };

  return (
    <div className="timeline-container">
      <h2>Timeline</h2>
      <ul className="timeline-list">
        {events.map((event) => (
          <li key={event.id} className="timeline-event">
            <strong>{event.title}</strong> - <span>{event.date}</span>
          </li>
        ))}
      </ul>

      {isOwner && ( 
        <div className="edit-section">
          <button className="btn-primary" onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit Timeline'}
          </button>
          {isEditing && (
            <div className="add-event-form">
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Event Title"
              />
              <DatePicker
                selected={newEvent.date}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select event date and time"
              />
              <button className="btn-secondary" onClick={handleAddEvent}>
                Add Event
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Timeline;
