import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Make sure react-bootstrap is installed
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { auth } from '../../../firebaseConfig'; // Your Firebase Auth
import "../AddProjectCard/index.css";

const AddProjectCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [errors, setErrors] = useState({}); // For storing error messages

  const handleOpenModal = () => {
    setShowModal(true);
    setErrors({}); // Reset errors when modal opens
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle project submission
  const handleSubmit = async () => {
    const newErrors = {}; // Temporary object for errors
    if (!projectName) {
      newErrors.projectName = "Project name is required."; // Set error message
    }
    if (!projectDescription) {
      newErrors.projectDescription = "Project description is required."; // Set error message
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Update errors state
      return; // Prevent submission if there are errors
    }

    const user = auth.currentUser;
    if (user) {
      try {
        const db = getFirestore(); // Initialize Firestore
        await addDoc(collection(db, 'projects'), {
          userId: user.uid,
          projectName: projectName,
          projectDescription: projectDescription,
          createdAt: new Date(),
        });

        // Reset form and close modal
        setProjectName('');
        setProjectDescription('');
        setShowModal(false);
        setErrors({}); // Clear errors on successful submission
      } catch (error) {
        console.error('Error adding project: ', error);
      }
    }
  };

  return (
    <div>
      {/* Card with plus sign */}
      <div className="card" onClick={handleOpenModal}>
        <div className="card-body text-center">
          <h2>+</h2>
        </div>
      </div>

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Register a Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="projectName">
              <Form.Control
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="mb-2" // Add margin-bottom for spacing
              />
              {errors.projectName && (
                <Form.Text className="text-danger">{errors.projectName}</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="projectDescription">
              <Form.Control
                as="textarea"
                rows={3}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Enter project description"
                className="mb-2" // Add margin-bottom for spacing
              />
              {errors.projectDescription && (
                <Form.Text className="text-danger">{errors.projectDescription}</Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProjectCard;
