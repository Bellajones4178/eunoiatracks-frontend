import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function AddPotentialGrant() {
    const [newGrant, setNewGrant] = useState({
        grantName: '',
        type: '',
        category: '',
        dueDate: '',
        submittedDate: '',
        status: 'LOI Needed',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Use environment variable for API URL, defaulting to localhost for development
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGrant({ ...newGrant, [name]: value });
    };

    const handleAddGrant = async () => {
        const uniqueId = uuidv4(); // Generate a unique ID
        const grantWithId = { ...newGrant, id: uniqueId, grantID: uniqueId, currentGrant: false };

        try {
            const response = await fetch(`${API_URL}/potential-grants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(grantWithId)
            });
            const result = await response.json();

            if (response.ok) {
                setMessage('Grant added successfully');
                navigate('/trackgrantresearch');  // Redirect to the grants list
            } else {
                setMessage(result.error || 'Failed to add grant');
            }
        } catch (error) {
            console.error("Error adding grant:", error);
            setMessage("Failed to add grant.");
        }
    };

    return (
        <div>
            <h2>Add Potential Grant</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAddGrant();
            }}>
                <input
                    type="text"
                    name="grantName"
                    value={newGrant.grantName}
                    onChange={handleInputChange}
                    placeholder="Grant Name"
                    required
                />
                <input
                    type="text"
                    name="type"
                    value={newGrant.type}
                    onChange={handleInputChange}
                    placeholder="Type"
                    required
                />
                <input
                    type="text"
                    name="category"
                    value={newGrant.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                />
                <input
                    type="date"
                    name="dueDate"
                    value={newGrant.dueDate}
                    onChange={handleInputChange}
                    placeholder="Due Date"
                />
                <input
                    type="date"
                    name="submittedDate"
                    value={newGrant.submittedDate}
                    onChange={handleInputChange}
                    placeholder="Submitted Date"
                />
                <button type="submit">Add Grant</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default AddPotentialGrant;
