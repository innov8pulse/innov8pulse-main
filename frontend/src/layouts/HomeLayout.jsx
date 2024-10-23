import React, { useMemo } from "react";
import Home from "../Pages/Home";
import { getCurrentUser } from "../api/FirestoreAPI";
import  Topbar  from "../components/common/Topbar";
import AddProjectCard from '../components/common/AddProjectCard'

export default function HomeLayout() {
    useMemo(() => {
        getCurrentUser();
    }, []);
    return (
        <div>
            <Home />
        </div>
    
);
}