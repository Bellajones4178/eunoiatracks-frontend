import React, { useState, useEffect } from 'react';

function GrantTable() {
    const [grants, setGrants] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchGrants();
    }, []);

    const fetchGrants = async () => {
        try {
            const response = await fetch('http://localhost:5000/grants');
            const data = await response.json();
            setGrants(data);
        } catch (error) {
            console.error("Error fetching grants:", error);
            setMessage("Failed to load grants.");
        }
    };

    const fetchGrantFiles = async (grantId) => {
        try {
            const response = await fetch(`http://localhost:5000/grants/${grantId}/files`);
            const files = await response.json();
            return files;
        } catch (error) {
            console.error("Error fetching grant files:", error);
            return [];
        }
    };

    const handleFileUpload = async (event, grantId) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`http://localhost:5000/grants/${grantId}/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                setMessage(data.error || 'Failed to upload file.');
            } else {
                setMessage(`File uploaded successfully for Grant ID: ${grantId}`);
                fetchGrants(); // Refresh grants to show the new file link
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Failed to upload file.');
        }
    };

    return (
        <div className="page-container">
            <div className="grant-table-container">
                <h2>Current Grants</h2>
                <p className="message">{message}</p>
                <table className="grant-table">
                    <thead>
                        <tr>
                            <th>Grant ID</th>
                            <th>Grant Name</th>
                            <th>Grantor</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Documents</th>
                            <th>Upload Document</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grants.map((grant) => (
                            <tr key={grant.id}>
                                <td>{grant.id}</td>
                                <td>{grant.grantname}</td>
                                <td>{grant.grantor}</td>
                                <td>{grant.type}</td>
                                <td>{grant.description}</td>
                                <td>
                                    <button
                                        className="view-files-btn"
                                        onClick={async () => {
                                            const files = await fetchGrantFiles(grant.id);
                                            if (files.length > 0) {
                                                files.forEach(file => window.open(file.file_url, '_blank'));
                                            } else {
                                                alert("No documents available for this grant.");
                                            }
                                        }}
                                    >
                                        View Files
                                    </button>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        className="upload-input"
                                        onChange={(event) => handleFileUpload(event, grant.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
}

export default GrantTable;
