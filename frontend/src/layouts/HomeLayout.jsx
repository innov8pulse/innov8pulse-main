import React, { useMemo } from "react";
import Home from "../Pages/Home";
import { getCurrentUser } from "../api/FirestoreAPI";
import  Topbar  from "../components/common/Topbar";

export default function HomeLayout() {
    useMemo(() => {
        getCurrentUser();
    }, []);
    return (
        <div>
            <Topbar />
            <Home />
        </div>
    
);
}