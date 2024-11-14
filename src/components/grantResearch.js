import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GrantResearch() {
    const [grants, setGrants] = useState([]);
    const [message, setMessage] = useState('');

    const statuses = ["LOI Needed", "Contacted", "Applied", "Rejected", "Approved"];

    // Fetch all grants when the component mounts
    useEffect(() => {
        fetchGrants();
    }, []);

    // Function to fetch all grants from the API
    const fetchGrants = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/potential-grants`);
            if (!response.ok) throw new Error('Failed to fetch grants');
            const data = await response.json();
            setGrants(data);
        } catch (error) {
            console.error("Error fetching grants:", error);
            setMessage("Failed to load grants.");
        }
    };

    // Function to delete a specific grant
    const handleDeleteGrant = async (grantId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/potential-grants/${grantId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setMessage('Grant deleted successfully');
                setGrants(grants.filter(grant => grant.id !== grantId)); // Update state to remove deleted grant
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || 'Failed to delete grant');
            }
        } catch (error) {
            console.error("Error deleting grant:", error);
            setMessage("Failed to delete grant.");
        }
    };

    // Rendering of the grants list and management actions
    return (
        <div>
            <h2>Potential Grants</h2>
            <ul>
                {grants.map(grant => (
                    <li key={grant.id}>
                        <strong>{grant.grantname}</strong> <br />
                        <em>Type:</em> {grant.type} <br />
                        <em>Category:</em> {grant.category} <br />
                        <em>Due Date:</em> {grant.duedate} <br />
                        <em>Submitted Date:</em> {grant.submitteddate} <br />
                        <em>Status:</em> {grant.status} <br />

                        <Link to={`/edit-potential-grant/${grant.id}`}>
                            <button>Edit</button>
                        </Link>                        
                        <button onClick={() => handleDeleteGrant(grant.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Link to="/add-potential-grant"><button>Add New Grant</button></Link>
            {message && <p>{message}</p>}
        </div>
    );
}

export default GrantResearch;