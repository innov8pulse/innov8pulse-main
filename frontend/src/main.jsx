import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import Landing  from "./Pages/Landing.jsx";
import Login  from "./Pages/Login.jsx";
import { router } from './routes/index.jsx';
import { app } from "./firebaseConfig.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import "./App.css"
import { AuthProvider } from './auth/authprovider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    </ AuthProvider>
    <ToastContainer />
  </StrictMode>,
)
