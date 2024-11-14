import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { parse } from 'date-fns';

function GrantInfo() {
    const [grants, setGrants] = useState([]);
    const [editedStatuses, setEditedStatuses] = useState({});
    const [message, setMessage] = useState('');

    const statuses = ["Pending", "Approved", "Rejected", "In Progress"]; // Add your available statuses here

    useEffect(() => {
        fetchGrants();
    }, []);

    // Fetch all grants from the backend
    const fetchGrants = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/grants`);
            const data = await response.json();
            setGrants(data);
        } catch (error) {
            console.error("Error fetching grants:", error);
            setMessage("Failed to load grants.");
        }
    };

// // Update local state with selected status
// const handleStatusChange = (grantId, newStatus) => {
//     setEditedStatuses(prevStatuses => ({
//         ...prevStatuses,
//         [grantId]: newStatus
//     }));
// };

// // Save all changes to the backend for potential grants
// const saveChanges = async () => {
//     try {
//         // Create an array of update requests for each grant ID in editedStatuses
//         const updateRequests = Object.keys(editedStatuses).map(async (grantId) => {
//             const newStatus = editedStatuses[grantId];
            
//             // Send a PUT request to the potential-grants endpoint with the new status
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/potential-grants/${grantId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ status: newStatus })
//             });
            
//             // Throw an error if the response is not OK
//             if (!response.ok) {
//                 throw new Error(`Failed to update potential grant ${grantId}`);
//             }
//         });
        
//         // Execute all update requests concurrently
//         await Promise.all(updateRequests);
        
//         // Update grants list with new statuses and clear edited statuses
//         setGrants(grants.map(grant => ({
//             ...grant,
//             status: editedStatuses[grant.id] || grant.status
//         })));
        
//         setEditedStatuses({});
//         setMessage('All changes saved successfully.');
//     } catch (error) {
//         // Log error and update the message state with an error message
//         console.error("Failed to save changes:", error);
//         setMessage('Failed to save changes.');
//     }
// };

    // Handle deleting a grant
    const handleDeleteGrant = async (grantId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/grants/${grantId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setMessage('Grant deleted successfully');
                setGrants(grants.filter(grant => grant.id !== grantId));
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || 'Failed to delete grant');
            }
        } catch (error) {
            console.error("Error deleting grant:", error);
            setMessage("Failed to delete grant.");
        }
    };

    return (
        <div>
            <h2>All Grants</h2>
            <ul>
                {grants.map(grant => (
                    <li key={grant.id}>
                        <strong>{grant.grantname}</strong> <br />
                        <em>Grantor:</em> {grant.grantor || 'No grantor specified'} <br />
                        <em>SubGrantor:</em> {grant.subgrantor || 'No subgrantor specified'} <br />
                        <em>Type:</em> {grant.type || 'Type not specified'} <br />
                        <em>Start Date:</em> {grant.startdate  || 'Not specified'} <br />
                        <em>End Date:</em> {grant.enddate  || 'Not specified'} <br />
                        <em>Description:</em> {grant.description || 'No description available'} <br />
            
                        
                        {/* Dropdown for selecting status
                        <div>
                            <label><strong>Status:</strong></label>
                            <select
                                value={editedStatuses[grant.id] || grant.status}
                                onChange={(e) => handleStatusChange(grant.id, e.target.value)}
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div> */}

                        <Link to={`/edit-grant/${grant.id}`}><button>Edit</button></Link>
                        <button onClick={() => handleDeleteGrant(grant.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {/* <button onClick={saveChanges}>Save Changes</button> */}
            <Link to="/add-grant"><button>Add New Grant</button></Link>
            <p>{message}</p>
        </div>
    );
}

export default GrantInfo;
