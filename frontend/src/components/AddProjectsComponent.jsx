import React, { useState } from 'react';
import { firestore } from '../firebaseConfig'; // Update to your config file path
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddProjectsComponent = () => {
  

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setProjects([...projects, formData]);
    setFormData({
      title: "",
      description: "",
      contributors: "",
      tags: "",
      image: ""
    });
  };

  return (
    <div className="App">
      <h1>Create a New Project</h1>
      <form onSubmit={handleSubmit} className="project-form">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="contributors"
          placeholder="Contributors"
          value={formData.contributors}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        <button type="submit">Create Project</button>
      </form>

      <div className="project-cards">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            {project.image && (
              <img src={project.image} alt="Project" className="project-image" />
            )}
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Contributors:</strong> {project.contributors}</p>
            <div className="tags">
              {project.tags.split(",").map((tag, i) => (
                <span className="tag" key={i}>
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProjectsComponent;
