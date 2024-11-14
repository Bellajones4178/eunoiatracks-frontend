import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { parse } from 'date-fns';

function GrantInfo() {
    const [grants, setGrants] = useState([]);
    const [editedStatuses, setEditedStatuses] = useState({});
    const [message, setMessage] = useState('');

    const statuses = ["Pending", "Approved", "Rejected", "In Progress"]; 
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
            
                        

                        <Link to={`/edit-grant/${grant.id}`}><button>Edit</button></Link>
                        <button onClick={() => handleDeleteGrant(grant.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <Link to="/add-grant"><button>Add New Grant</button></Link>
            <p>{message}</p>
        </div>
    );
}

export default GrantInfo;
