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
      const confirmDelete = window.confirm("Are you sure you want to delete this grant?");
      if (!confirmDelete) {
          return; 
      }
  
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
          <div className="grants-container">
            <ul className="grants-list">
              {grants.map(grant => (
                <li key={grant.id} className="grant-item">
                  <div className="grant-details">
                    <strong className="grant-name">{grant.grantname}</strong>
                    <div>
                      <span className="grant-field"><em>Grantor:</em> {grant.grantor || 'No grantor specified'}</span>
                      <span className="grant-field"><em>SubGrantor:</em> {grant.subgrantor || 'No subgrantor specified'}</span>
                      <span className="grant-field"><em>Type:</em> {grant.type || 'Type not specified'}</span>
                      <span className="grant-field"><em>Start Date:</em> {grant.startdate || 'Not specified'}</span>
                      <span className="grant-field"><em>End Date:</em> {grant.enddate || 'Not specified'}</span>
                      <span className="grant-field"><em>Description:</em> {grant.description || 'No description available'}</span>
                    </div>
                  </div>
                  <div className="grant-actions">
                    <Link to={`/edit-grant/${grant.id}`}>
                      <button className="edit-btn">Edit</button>
                    </Link>
                    <button className="delete-btn" onClick={() => handleDeleteGrant(grant.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
      
            <Link to="/add-grant">
              <button className="add-btn">Add New Grant</button>
            </Link>
            <p>{message}</p>
          </div>
        </div>
      );
}

export default GrantInfo;
