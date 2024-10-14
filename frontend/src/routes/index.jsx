import {
    createBrowserRouter,
  } from "react-router-dom";
// import  App  from '../App';
import  Login  from "../Pages/Login";
import  Landing   from "../Pages/Landing"
import  Register  from "../Pages/Register";
import  HomeLayout  from "../layouts/HomeLayout";
import AddProjects from "../Pages/AddProjects";
import Projects from "../components/common/Projects";
import MyProjects from "../Pages/MyProjects";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <HomeLayout />,
    }, 
    {
      path: "/addproject",
      element: <AddProjects />,
    },
    {
      path: "/projects",
      element: <MyProjects />,
    },
  ]);
        
    