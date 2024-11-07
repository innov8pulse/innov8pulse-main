import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig"; // Import your Firebase config
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminMentorApproval() {
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        const fetchMentors = async () => {
            const mentorCollection = await getDocs(collection(db, "mentors"));
            setMentors(mentorCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchMentors();
    }, []);

    const approveMentor = async (mentorId) => {
        const mentorDoc = doc(db, "mentors", mentorId);
        await updateDoc(mentorDoc, { approved: true });
        // Optionally, notify the mentor via email or other methods
    };

    const denyMentor = async (mentorId) => {
        const mentorDoc = doc(db, "mentors", mentorId);
        await updateDoc(mentorDoc, { approved: false });
        // Optionally, notify the mentor via email or other methods
    };

    return (
        <div>
            <h2>Mentor Approval</h2>
            <ul>
                {mentors.map((mentor) => (
                    <li key={mentor.id}>
                        {mentor.name} - {mentor.approved ? "Approved" : "Pending"}
                        <button onClick={() => approveMentor(mentor.id)}>Approve</button>
                        <button onClick={() => denyMentor(mentor.id)}>Deny</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


// import React, { useEffect, useState } from "react";
// import { getMentors, updateMentorStatus } from "../api/FirestoreAPI"; // Adjust the path as necessary
// import { toast } from "react-toastify";

// export default function AdminMentorApproval() {
//     const [mentors, setMentors] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchMentors = async () => {
//         try {
//             const mentorList = await getMentors();
//             setMentors(mentorList);
//         } catch (error) {
//             console.error("Error fetching mentors: ", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleApproval = async (mentorId) => {
//         try {
//             await updateMentorStatus(mentorId, "approved");
//             toast.success("Mentor approved!");
//             fetchMentors();
//         } catch (error) {
//             toast.error("Error approving mentor.");
//             console.error(error);
//         }
//     };

//     const handleDenial = async (mentorId) => {
//         try {
//             await updateMentorStatus(mentorId, "denied");
//             toast.success("Mentor denied.");
//             fetchMentors();
//         } catch (error) {
//             toast.error("Error denying mentor.");
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         fetchMentors();
//     }, []);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div className="admin-mentor-approval">
//             <h1>Mentor Approval Dashboard</h1>
//             <ul>
//                 {mentors.map((mentor) => (
//                     <li key={mentor.id}>
//                         <p>{mentor.email}</p>
//                         <p>Expertise: {mentor.expertise}</p>
//                         <p>Motivation: {mentor.motivation}</p>
//                         <p>Status: {mentor.status}</p>
//                         <button onClick={() => handleApproval(mentor.id)}>Approve</button>
//                         <button onClick={() => handleDenial(mentor.id)}>Deny</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
