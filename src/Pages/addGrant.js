import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function AddGrant() {
    const [newGrant, setNewGrant] = useState({
        grantName: "",
        grantor: "",
        subGrantor: "",
        type: "",
        startDate: "",
        endDate: "",
        description: "",
        status: "To Do"
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGrant({ ...newGrant, [name]: value });
    };

    // Function to add the grant
    const handleAddGrant = async () => {
        const uniqueId = uuidv4();
        const grantWithId = { ...newGrant, id: uniqueId, grantID: uniqueId, currentGrant: true };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/grants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(grantWithId)
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Grant added successfully');
                setTimeout(() => navigate('/grantdetails'), 2000);  // Redirect after 2 seconds
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
            <h2>Add New Grant</h2>
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
                    name="grantor"
                    value={newGrant.grantor}
                    onChange={handleInputChange}
                    placeholder="Grantor"
                    required
                />
                <input
                    type="text"
                    name="subGrantor"
                    value={newGrant.subGrantor}
                    onChange={handleInputChange}
                    placeholder="SubGrantor"
                />
                <input
                    type="text"
                    name="type"
                    value={newGrant.type}
                    onChange={handleInputChange}
                    placeholder="Type"
                />
                <input
                    type="date"
                    name="startDate"
                    value={newGrant.startDate}
                    onChange={handleInputChange}
                    placeholder="Start Date"
                    required
                />
                <input
                    type="date"
                    name="endDate"
                    value={newGrant.endDate}
                    onChange={handleInputChange}
                    placeholder="End Date"
                    required
                />
                <textarea
                    name="description"
                    value={newGrant.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                ></textarea>
                <button type="submit">Add Grant</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddGrant;