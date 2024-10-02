import {
    createBrowserRouter,
  } from "react-router-dom";
// import  App  from '../App';
import  Login  from "../Pages/Login";
import  Landing   from "../Pages/Landing"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
        
    