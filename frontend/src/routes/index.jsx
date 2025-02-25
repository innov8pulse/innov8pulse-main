import { createBrowserRouter } from "react-router-dom";
import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import AddProjects from "../Pages/AddProjects";
import MainProjectsPage from "../components/common/Projects/index";
import MyProjects from "../Pages/MyProjects";
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
    element: <HomeLayout />,
  },
  {
    path: "/addproject",
    element: <AddProjects />,
  },
  {
    path: "/projects",
    element: <MainProjectsPage />,
  },
  {
    path: "/projects/page/:pageNumber",  
    element: <MainProjectsPage />,
  },
  {
    path: "/myprojects",
    element: <MyProjects />,
  },
  {
    path: "/projects/:projectName",
    element: <ProjectDetail />,
  },
]);
