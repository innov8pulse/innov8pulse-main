import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "../AddProjectCard/index.css";

const AddProjectCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [contributors, setContributors] = useState([]);
  const [tags, setTags] = useState('');
  const [projectState, setProjectState] = useState('Development');
  const [website, setWebsite] = useState('');
  const [github, setGitHub] = useState('');
  const [discord, setDiscord] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users based on input
  const [contributorInput, setContributorInput] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore();
      const userCollection = collection(db, 'users'); // Change to your users collection name
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, email: doc.data().email }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    setErrors({});
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    const newErrors = validateInputs();
    if (newErrors) {
      setErrors(newErrors);
      return;
    }

    setLoading(true); // Set loading to true when submission starts
    const user = auth.currentUser;
    if (user) {
      try {
        const exists = await checkIfProjectExists(projectName); // Check for existing project
        if (exists) {
          setErrors({ projectName: "This project already exists." });
          setLoading(false); // Reset loading state
          return;
        }

        const imageUrl = await uploadImage(image, projectName);
        await saveProjectToFirestore(user.uid, imageUrl);
        setShowToast(true);
        handleCloseModal();
        resetForm();
        
      } catch (error) {
        console.error('Error adding project: ', error);
      } finally {
        setLoading(false); // Reset loading state after the try-catch
      }
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!projectName) newErrors.projectName = "Project name is required.";
    if (!projectDescription) newErrors.projectDescription = "Project description is required.";
    if (contributors.length === 0) newErrors.contributors = "At least one contributor is required.";
    if (!tags) newErrors.tags = "Tags are required.";
    if (!image) newErrors.image = "An image is required.";

    return Object.keys(newErrors).length > 0 ? newErrors : null;
  };

  const checkIfProjectExists = async (projectName) => {
    const db = getFirestore();
    const q = query(collection(db, 'projects'), where('projectName', '==', projectName));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Return true if project exists
  };

  const uploadImage = async (file, projectName) => {
    const storage = getStorage();
    const imageRef = ref(storage, `projects/${projectName}/${file.name}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  const saveProjectToFirestore = async (userId, imageUrl) => {
    const db = getFirestore();
    await addDoc(collection(db, 'projects'), {
      userId,
      projectName,
      projectDescription,
      contributors,
      tags,
      website,
      github,
      discord,
      projectState,
      image: imageUrl,
      createdAt: new Date(),
    });
  };

  const resetForm = () => {
    setProjectName('');
    setProjectDescription('');
    setContributors([]);
    setTags('');
    setWebsite('');
    setGitHub('');
    setDiscord('');
    setProjectState('Development');
    setImage(null);
    setErrors({});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleContributorInputChange = (e) => {
    const input = e.target.value;
    setContributorInput(input);

    // Filter users based on input
    const filtered = users.filter(user => user.email.toLowerCase().includes(input.toLowerCase()));
    setFilteredUsers(filtered);
  };

  const handleContributorSelect = (email) => {
    if (!contributors.includes(email)) {
      setContributors([...contributors, email]); // Add selected email to contributors
    }
    setContributorInput(''); // Clear input field
    setFilteredUsers([]); // Clear the filtered users
  };

  const handleRemoveContributor = (email) => {
    setContributors(contributors.filter((contributor) => contributor !== email)); // Remove email from contributors
  };

  return (
    <div>
      <div className="card" onClick={handleOpenModal}>
        <div className="card-body text-center">
          <h2>+</h2>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
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
                className="mb-2"
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
                className="mb-2"
              />
              {errors.projectDescription && (
                <Form.Text className="text-danger">{errors.projectDescription}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="contributors">
              <Form.Control
                type="text"
                value={contributors}
                onChange={(e) => setContributors(e.target.value)}
                placeholder="Enter contributors"
                className="mb-2"
              />
              {errors.contributors && (
                <Form.Text className="text-danger">{errors.contributors}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="tags">
              <Form.Control
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags"
                className="mb-2"
              />
              {errors.tags && (
                <Form.Text className="text-danger">{errors.tags}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-2"
              />
              {errors.image && (
                <Form.Text className="text-danger">{errors.image}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="website">
              <Form.Control
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Project Website (optional)"
                className="mb-2"
              />
            </Form.Group>

            <Form.Group controlId="github">
              <Form.Control
                type="text"
                value={github}
                onChange={(e) => setGitHub(e.target.value)}
                placeholder="GitHub Repository (optional)"
                className="mb-2"
              />
            </Form.Group>

            <Form.Group controlId="discord">
              <Form.Control
                type="text"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                placeholder="Discord Link (optional)"
                className="mb-2"
              />
            </Form.Group>

            <Form.Group controlId="projectState">
              <Form.Label>Select Project State</Form.Label>
              <Form.Control
                as="select"
                value={projectState}
                onChange={(e) => setProjectState(e.target.value)}
                className="mb-2"
              >
                <option value="Finished">Finished</option>
                <option value="Development">Development</option>
                <option value="Judging">Judging</option>
                <option value="Seeking funding">Seeking funding</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'} {/* Button text changes based on loading state */}
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{ position: 'absolute', top: 20, right: 20 }}>
        <Toast.Body>{projectName} added</Toast.Body>
      </Toast>
    </div>
  );
};

export default AddProjectCard
