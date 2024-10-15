import React, { useEffect, useState } from "react";
import MainProjectsPage from "../components/common/Projects"; 
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import  Loader  from "../components/common/Loader";

const Home = () => {
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(()=> {
        onAuthStateChanged(auth, (res) => {
            if(!res?.accessToken){
                navigate('/login')
            } else {
                setLoading(false)
            };
        })
    }, []) 
    return loading ? <Loader /> : <MainProjectsPage />;
};

export default Home; 
