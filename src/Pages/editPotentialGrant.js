import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EditPotentialGrant = ({ grantToEdit }) => {
    const { grantId } = useParams();
    const navigate = useNavigate();

    // Initialize state only if grantToEdit exists, otherwise use default values
    const [grant, setGrant] = useState(grantToEdit || {
        grantName: '',
        type: '',
        category: '',
        dueDate: '',
        submittedDate: '',
        currentGrant: false,
        status: ''
    });

    const [message, setMessage] = useState('');

    // Fetch grant data if it's not provided as a prop
    useEffect(() => {
        if (!grantToEdit) {
            const fetchGrant = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/potential-grants/${grantId}`);
                    if (!response.ok) throw new Error('Failed to fetch grant data');
                    const data = await response.json();
                    setGrant(data);
                } catch (error) {
                    console.error('Error fetching grant:', error);
                    setMessage('Error fetching grant details');
                }
            };
            fetchGrant();
        }
    }, [grantId, grantToEdit]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setGrant(prevGrant => ({
            ...prevGrant,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Save changes
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/potential-grants/${grantId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(grant),
            });
            if (response.ok) {
                setMessage('Grant updated successfully');
                setTimeout(() => navigate('/trackgrantresearch'), 2000);
            } else throw new Error('Failed to update grant');
        } catch (error) {
            console.error('Error updating grant:', error);
            setMessage('Failed to update grant');
        }
    };

    // If the data has not yet loaded, show a loading message
    if (!grant) {
        return <p>Loading grant details...</p>;
    }

    return (
        <div>
            <h2>Edit Potential Grant</h2>
            <form onSubmit={handleSaveChanges}>
                <label>
                    Grant Name:
                    <input type="text" name="grantName" value={grant.grantName} onChange={handleInputChange} required />
                </label>
                <label>
                    Type:
                    <input type="text" name="type" value={grant.type} onChange={handleInputChange} required />
                </label>
                <label>
                    Category:
                    <input type="text" name="category" value={grant.category} onChange={handleInputChange} />
                </label>
                <label>
                    Due Date:
                    <input type="date" name="dueDate" value={grant.dueDate} onChange={handleInputChange} required />
                </label>
                <label>
                    Submitted Date:
                    <input type="date" name="submittedDate" value={grant.submittedDate} onChange={handleInputChange} required />
                </label>
                <label>
                    Current Grant:
                    <input type="checkbox" name="currentGrant" checked={grant.currentGrant} onChange={handleInputChange} />
                </label>
                <label>
                    Status:
                    <input type="text" name="status" value={grant.status} onChange={handleInputChange} />
                </label>
                <button type="submit">Save Changes</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditPotentialGrant;
