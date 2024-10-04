import {
    createBrowserRouter,
  } from "react-router-dom";
// import  App  from '../App';
import  Login  from "../Pages/Login";
import  Landing   from "../Pages/Landing"
import  Register  from "../Pages/Register";
import  Home  from "../Pages/Home";
import AddProjects from "../Pages/AddProjects";


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
      element: <Home />,
    },
    {
      path: "/project",
      element: <AddProjects />,
    },
  ]);
        
    