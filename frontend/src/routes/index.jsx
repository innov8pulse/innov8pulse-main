// import {
//     createBrowserRouter,
//   } from "react-router-dom";
// // import  App  from '../App';
// import  Login  from "../Pages/Login";
// import  Landing   from "../Pages/Landing"
// import  Register  from "../Pages/Register";
// import  HomeLayout  from "../layouts/HomeLayout";
// import AddProjects from "../Pages/AddProjects";
// import Projects from "../components/common/Projects";
// import MyProjects from "../Pages/MyProjects";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Landing />,
//   },
//     {
//       path: "/login",
//       element: <Login />,
//     },
//     {
//       path: "/register",
//       element: <Register />,
//     },
//     {
//       path: "/home",
//       element: <HomeLayout />,
//     }, 
//     {
//       path: "/addproject",
//       element:<MyProjects /> ,
//     },
//     {
//       path: "/projects",
//       element: <AddProjects />,
//     },
//   ]);
        
import { createBrowserRouter } from "react-router-dom";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import AddProjects from "../Pages/AddProjects";
import Projects from "../components/common/Projects";
import MyProjects from "../Pages/MyProjects";
import PrivateRoute from "./privateroute"; 

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
    element: (
      <PrivateRoute>
        <HomeLayout />
      </PrivateRoute>
    ),
  },
  {
    path: "/addproject",
    element: (
      <PrivateRoute>
        <AddProjects />
      </PrivateRoute>
    ),
  },
  {
    path: "/projects",
    element: (
      <PrivateRoute>
        <Projects />
      </PrivateRoute>
    ),
  },
  {
    path: "/myprojects",
    element: (
      <PrivateRoute>
        <MyProjects />
      </PrivateRoute>
    ),
  },
]);
    