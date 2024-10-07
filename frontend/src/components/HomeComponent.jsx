import React from "react";
import { useNavigate } from "react-router-dom";
import Projects from "../components/common/Projects";
const HomeComponent = () => {
    let navigate = useNavigate();
    return (
      <>
        <Projects/>
      </>
    );
};

export default HomeComponent; 