import React, { useEffect, useState } from 'react';
import GrantStatusChart from '../components/grantStatusChart';

function GrantStatusReport() {
    const [statusData, setStatusData] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/reports/grant-status')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then(data => setStatusData(data))
            .catch(error => console.error('Error fetching status data:', error));
    }, []);

    return (
        <div>
            <h2>Grant Status Report</h2>
            <GrantStatusChart statusData={statusData} />
        </div>
    );
}

export default GrantStatusReport;