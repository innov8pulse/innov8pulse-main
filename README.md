# innov8pulse-main

Innov8Pulse is a platform that allows hackathon participants to showcase their projects, track contributions, and receive feedback and mentorship from industry experts. By integrating blockchain, the platform also provides a way to assign value to projects through tokens, ensuring accountability and ownership over innovative ideas.

## Contributors

| Name               | Socials                                                                                                                                                                                                                                                                      |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Huldah Kaura** | [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/Huldah-dev) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://github.com/Huldah-dev) [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?logo=twitter&logoColor=white)](https://github.com/Huldah-dev) |
| **Muiga Steve**  | [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/emuiga) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/stevemuiga) [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?logo=twitter&logoColor=white)](https://twitter.com/)   |






## Table of Contents
Documentation  
Project Overview 
Features  
Tech Stack  
System Architecture  
Getting Started  
Prerequisites  
Installation  
Usage  
API Documentation  
Blockchain Integration  

## Documentation
Here are the links to:
### 1. The Pitchdeck
https://www.canva.com/design/DAGPt2RoaI8/fTZXOsS-yddJtVCvEFbtug/view?utm_content=DAGPt2RoaI8&utm_campaign=designshare&utm_medium=link&utm_source=editor

### 2. The Docs
https://docs.google.com/document/d/1fbXG_xEpqDg-mkP6rmdT_iMwjuKABOln/edit?usp=sharing&ouid=102275064318286660251&rtpof=true&sd=true

## Project Overview
Innov8Pulse was designed to solve the problem of post-hackathon project abandonment by giving participants a platform where they can:  

Submit their projects for others to see.   
Track contributions from team members or mentors.  
Get valuable feedback and mentorship.  
Assign their projects' value by utilizing blockchain technology.  
This project is open to contributions from developers interested in web development, blockchain technology, and mentorship systems. 

## Features
User Authentication: Secure login/signup for participants and mentors.  
Project Management: Users can create, update, and delete projects. Projects are displayed publicly for others to view.  
Feedback System: Mentors can leave feedback on submitted projects.  
Blockchain Integration: Projects are assigned value through blockchain tokens, ensuring transparency and ownership.  
Responsive Design: Fully responsive, allowing access on all device sizes.  
## Tech Stack
### Frontend:
React: JavaScript library for building the user interface.  
React Router: For navigation between different pages.  
Axios: For making HTTP requests to the backend.  
Redux or Context API: For state management.  
Tailwind CSS: For styling components.  
### Backend:
Firestore DB: Relational database for storing user and project data.  
Firebase-auth: For user authentication.  
### Blockchain:
Starknet (or similar platform): Used for assigning project tokens and managing value transactions.  
Smart Contracts: For handling the project value, proof of ownership, and transparency.  
### System Architecture
```
+--------------------------+               +-------------------------+  
|         Frontend          |               |        Blockchain        |  
|      (React + Redux)      |               |       (Starknet)         |  
+--------------------------+               +-------------------------+  
            |                                  |
            v                                  |
+--------------------------+               +-------------------------+  
|         Backend           |<------------->|   Blockchain Integration |  
| (Node.js + Express + JWT) |               +-------------------------+  
+--------------------------+  
            |
            v
+--------------------------+
|        Database           |
|       (PostgreSQL)        |
+--------------------------+
```
## Getting Started
### Prerequisites
Before you begin, make sure you have the following tools installed:  

Node.js (v14 or higher)  
Firebase (v9 or higher)  
Git  
MetaMask or any other Ethereum wallet for blockchain integration  
Installation  
Clone the repository:  
  
bash  
Copy code  
git clone https://github.com/innov8pulse/innov8pulse.git  
cd innov8pulse  
Install dependencies for the backend:  
  
bash  
Copy code  
cd backend  
npm install  
Install dependencies for the frontend:  
  
bash  
Copy code  
cd ../frontend  
npm install  
Set up the PostgreSQL database:  

Create a PostgreSQL database named innov8pulse.  
Create the .env file in the backend directory with the following content:  
env  
Copy code  
DATABASE_URL=postgres://youruser:yourpassword@localhost:5432/innov8pulse    
JWT_SECRET=your_jwt_secret    
Run the development server:    
  
For the backend:  
bash  
Copy code  
cd ../backend  
npm run dev  
For the frontend:  
bash  
Copy code  
cd ../frontend  
npm start  
## Usage  
### Frontend:  
Navigate through the platform, submit new projects, view projects, and leave feedback.    
Authentication is required for most actions.  
### Backend:  
The backend serves as the API for project and user management.    
Available routes include user authentication, project creation, and fetching projects.  
### Blockchain Integration:  
When creating or updating a project, it will be linked to the blockchain using a token.    
MetaMask or another wallet is required to handle the blockchain transactions.  
### API Documentation
The API allows you to interact with the backend for user and project management.  

### Authentication
POST /api/auth/register: Register a new user.    
POST /api/auth/login: Log in a user and receive a JWT token.    
### Projects  
GET /api/projects: Get all projects.    
POST /api/projects: Create a new project (requires authentication).    
GET /api/projects/:id: Get details of a single project.  
POST /api/projects/:id/feedback: Add feedback to a project (requires authentication).  
### Blockchain Integration
Innov8Pulse uses blockchain to assign value to projects through tokens. The basic flow is as follows:

When a user submits a project, a smart contract is executed that assigns the project a token. 
The token is linked to the project and its contributors, ensuring proof of ownership.  
The blockchain ledger ensures transparency and tracks all contributions and project modifications. 
