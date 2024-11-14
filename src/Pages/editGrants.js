import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditGrant() {
    const { grantId } = useParams(); // Get the grant ID from the URL
    const navigate = useNavigate();

    // State to hold grant details
    const [grant, setGrant] = useState({
        grantname: '',
        grantor: '',
        subgrantor: '',
        type: '',
        startdate: '',
        enddate: '',
        description: '',
        status: ''
    });
    const [message, setMessage] = useState('');

    // Fetch the grant details when the component mounts
    useEffect(() => {
        const fetchGrant = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/grants/${grantId}`);
                if (!response.ok) throw new Error('Failed to fetch grant data');
                
                const data = await response.json();
                setGrant(data);
            } catch (error) {
                console.error('Error fetching grant:', error);
                setMessage('Error fetching grant details');
            }
        };

        fetchGrant();
    }, [grantId]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGrant(prevGrant => ({
            ...prevGrant,
            [name]: value
        }));
    };

    // Save the changes to the backend
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/grants/${grantId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(grant)
            });

            if (!response.ok) throw new Error('Failed to update grant');

            setMessage('Grant updated successfully');
            setTimeout(() => navigate('/grants'), 2000); // Redirect back to the grants list after 2 seconds
        } catch (error) {
            console.error('Error updating grant:', error);
            setMessage('Failed to update grant');
        }
    };

    return (
        <div>
            <h2>Edit Grant</h2>
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
                    Grantor:
                    <input
                        type="text"
                        name="grantor"
                        value={grant.grantor}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    SubGrantor:
                    <input
                        type="text"
                        name="subgrantor"
                        value={grant.subgrantor}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Type:
                    <input
                        type="text"
                        name="type"
                        value={grant.type}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startdate"
                        value={grant.startdate}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        name="enddate"
                        value={grant.enddate}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={grant.description}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Status:
                    <select
                        name="status"
                        value={grant.status}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="In Progress">In Progress</option>
                    </select>
                </label>
                <button type="submit">Save Changes</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default EditGrant;
