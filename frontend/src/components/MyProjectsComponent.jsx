import React from "react";
import ProjectsDisplay from "../components/common/Projects";
import ProjectForm from "../components/common/Projects/projectForm";

export default function MyProjectsComponent() {
    return (
        <>
        {/* < SearchProject /> */}
        <div>Mandazi</div>
        <ProjectForm />
        <ProjectsDisplay />
        </>
      )
}