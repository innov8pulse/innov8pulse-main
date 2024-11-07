import { createBrowserRouter } from "react-router-dom";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import AddProjects from "../Pages/AddProjects";
import Projects from "../components/common/Projects";
import MyProjects from "../Pages/MyProjects";
import PrivateRoute from "./privateroute"; 
import ProjectDetail from "../components/ProjectDetail";

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
      <PrivateRoute allowedRole="participant">
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
    path: "/projects/page/:pageNumber",  
    element: (
      <PrivateRoute>
        <Projects />
      </PrivateRoute>
    ),
  },
  {
    path: "/myprojects",
    element: (
      <PrivateRoute allowedRole='participant'>
        <MyProjects />
      </PrivateRoute>
    ),
  },
  {
    path: "/projects/:projectName",
    element: (
      <PrivateRoute>
        <ProjectDetail />
      </PrivateRoute>
    ),
  },
]);
