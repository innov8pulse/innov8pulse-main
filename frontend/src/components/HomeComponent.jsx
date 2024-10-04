import React from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
    let navigate = useNavigate();
    return (
    <><div>HomeComponent</div>
    <button className="join-now" onClick={() => navigate("/project")}>
            add project
          </button>
    </>
    );
};

export default HomeComponent; // Ensure it's a default export
