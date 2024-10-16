import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../../../firebaseConfig'; 
import SearchProject from "../SearchProject";
import AddProjectCard from "../AddProjectCard"; // Import the AddProjectCard
import "../Projects/index.css";
import { useAccount } from '@starknet-react/core'; // To check if the wallet is connected
import { RpcProvider } from 'starknet';
import abi from './MyContractAbi.json'; // Import ABI


const MainProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const { address } = useAccount(); // Get the connected wallet address
//  // Use the Provider class with the rpc URL
//  const provider = new RpcProvider({
//   nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
// });

// const privateKey = process.env.ACCOUNT_PRIVKEY;

// const accountAddress = '0x03553b785b4e9a6496118b6341c44700f209c60e50b8db7ef4ba8fb681a05cde';

// // Initialize the account
// const account = new Account(provider, accountAddress, privateKey);

// // Initialize deployed contract
// const testAddress = '0x29724d03151eff483f60b7f556593beb1f600bac9b5372240f924bc5b07fe18';

// // Connect the contract
// const myTestContract = new Contract(abi, testAddress, provider);

  useEffect(() => {
    const fetchProjects = async () => {
      const db = getFirestore(app); // Initialize Firestore with the app instance
      const projectsCollection = collection(db, 'projects'); // Access the projects collection
      const projectSnapshot = await getDocs(projectsCollection); // Get documents
      const projectList = projectSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Map documents to data
      setProjects(projectList); // Set the projects state
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <SearchProject />
      
      {/* Add the "Add Project" card if wallet is connected */}
      {address && <AddProjectCard />}

      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.projectName}</h3>
            <p>{project.projectDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainProjectsPage;
