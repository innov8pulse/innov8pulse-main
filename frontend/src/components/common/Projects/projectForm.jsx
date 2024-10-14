import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import "./index.css"

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contributors, setContributors] = useState("");
  const [tags, setTags] = useState("");
  const [stage, setStage] = useState("");
  const [prize, setPrize] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "projects"), {
        title,
        description,
        contributors,
        tags,
        stage,
        prize,
        image
      });
      alert("Project added successfully");
      setTitle("");
      setDescription("");
      setContributors("");
      setTags("");
      setStage("");
      setPrize("");
      setImage("");
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <input
        type="text"
        placeholder="Contributors"
        value={contributors}
        onChange={(e) => setContributors(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="text"
        placeholder="Stage"
        value={stage}
        onChange={(e) => setStage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Prize"
        value={prize}
        onChange={(e) => setPrize(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="add-button" type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;
