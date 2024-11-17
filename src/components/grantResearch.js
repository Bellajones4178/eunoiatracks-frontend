import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GrantResearch() {
    const [grants, setGrants] = useState([]);
    const [message, setMessage] = useState('');

    const statuses = ["LOI Needed", "Contacted", "Applied", "Rejected", "Approved"];


    useEffect(() => {
        fetchGrants();
    }, []);

    // Get all grants
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

    // Delete Specific Grant
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

    return (
        <div>
          <h2 className='center'>Potential Grants</h2>
          <br />
          <h4 className='description'>Add potential grants that your organization may be eligible for, with the ability to add, edit, and delete entries, as well as easily filter them to streamline your selection process.</h4>
          <div className="grants-container">
            <ul className="grants-list">
              {grants.map(grant => (
                <li key={grant.id} className="grant-item">
                  <div className="grant-details">
                    <strong className="grant-name">{grant.grantname}</strong>
                    <div>
                      <span className="grant-field"><em>Type:</em> {grant.type}</span>
                      <span className="grant-field"><em>Category:</em> {grant.category}</span>
                      <span className="grant-field"><em>Due Date:</em> {grant.duedate}</span>
                      <span className="grant-field"><em>Submitted Date:</em> {grant.submitteddate}</span>
                      <span className="grant-field"><em>Status:</em> {grant.status}</span>
                    </div>
                  </div>
                  <div className="grant-actions">
                    <Link to={`/edit-potential-grant/${grant.id}`}>
                      <button className="edit-btn">Edit</button>
                    </Link>
                    <button className="delete-btn" onClick={() => handleDeleteGrant(grant.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/add-potential-grant">
              <button className="add-btn">Add New Grant</button>
            </Link>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      );
      
}

export default GrantResearch;