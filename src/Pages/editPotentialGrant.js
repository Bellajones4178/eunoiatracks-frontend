import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style.css';

export const EditPotentialGrant = ({ grantToEdit }) => {
    useEffect(() => {
        document.title = "Eunoia - Edit Potential Grant"; 
    }, []);

    const { grantId } = useParams();
    const navigate = useNavigate();

    const [grant, setGrant] = useState(grantToEdit || {
        grantname: '',
        type: '',
        category: '',
        duedate: '',
        submitteddate: '',
        currentgrant: false,
        status: ''
    });

    const [message, setMessage] = useState('');

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
        setGrant((prevGrant) => ({
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
            } else {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update grant');
            }
        } catch (error) {
            console.error('Error updating grant:', error);
            setMessage('Failed to update grant');
        }
    };

    if (!grant) {
        return <p>Loading grant details...</p>;
    }

    return (
        <div className="form-page">
            <div className="form-tables">
                <h2>Edit Potential Grant</h2>
                <form onSubmit={handleSaveChanges}>
                    <label>
                        Grant Name:
                        <input
                            type="text"
                            name="grantname"
                            value={grant.grantname}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Type:
                        <input
                            type="text"
                            name="type"
                            value={grant.type}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Category:
                        <input
                            type="text"
                            name="category"
                            value={grant.category}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Due Date:
                        <input
                            type="date"
                            name="duedate"
                            value={grant.duedate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Submitted Date:
                        <input
                            type="date"
                            name="submitteddate"
                            value={grant.submitteddate}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Current Grant:
                        <input
                            type="checkbox"
                            name="currentgrant"
                            checked={grant.currentgrant}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Status:
                        <input
                            type="text"
                            name="status"
                            value={grant.status}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">Save Changes</button>
                    <br />
                    <button
                        type="button"
                        className="goback-btn"
                        onClick={() => navigate('/trackgrantresearch')}
                    >
                        Go Back
                    </button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default EditPotentialGrant;
