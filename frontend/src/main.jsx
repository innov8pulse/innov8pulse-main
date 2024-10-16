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
import StarknetProvider from './provider/starknet-provider.tsx'; // Correct import for default export


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StarknetProvider>
    <AuthProvider>
    
    <RouterProvider router={router}/>
   
    </ AuthProvider>
    </StarknetProvider>
    <ToastContainer />
  </StrictMode>,
)
