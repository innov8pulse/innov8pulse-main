import React, { useState, useEffect } from "react";
import { firestore } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Projects from "./common/Projects";
import PostStatus from "./common/PostUpdate";
import ProjectsDisplay from "./common/Projects";
import ProjectForm from "./common/Projects/projectForm";
import SearchProject from "./common/SearchProject";

const HomeComponent = () => {
    let navigate = useNavigate();
    return (
      <>
      {/* <PostStatus /> */}
      < SearchProject />
        <ProjectsDisplay />
      </>
    );
};

export default HomeComponent; 