import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function AddPotentialGrant() {
    const [newGrant, setNewGrant] = useState({
        grantname: "",
        type: "",
        category: "",
        duedate: "",
        submitteddate: "",
        status: "LOI Needed"
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGrant({ ...newGrant, [name]: value });
    };

    // Function to add the potential grant
    const handleAddGrant = async () => {
        const uniqueId = uuidv4(); // Generate a unique ID
        const grantWithId = { ...newGrant, id: uniqueId, grantID: uniqueId, currentGrant: false }; // Mark as potential grant

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/potential-grants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(grantWithId)
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Potential grant added successfully.');
                setTimeout(() => navigate('/trackgrantresearch'), 2000);  
            } else {
                setMessage(result.error || 'Failed to add potential grant');
            }
        } catch (error) {
            console.error("Error adding potential grant:", error);
            setMessage("Failed to add potential grant.");
        }
    };

    return (
        <div className='form-page'>
            <div className='form-tables'>
            <h2>Add Potential Grant</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAddGrant();
            }}>
                <input
                    type="text"
                    name="grantname"
                    value={newGrant.grantname}
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
                    name="duedate"
                    value={newGrant.duedate}
                    onChange={handleInputChange}
                    placeholder="Due Date"
                    required
                />
                <input
                    type="date"
                    name="submitteddate"
                    value={newGrant.submitteddate}
                    onChange={handleInputChange}
                    placeholder="Submitted Date"
                    required
                />
                <button type="submit">Add Potential Grant</button>
                <br></br>
                <button className='goback-btn' onClick={() => navigate('/trackgrantresearch')}>Go Back</button>
            </form>
            {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default AddPotentialGrant;
