import React, { useEffect, useState } from 'react';
import GrantStatusChart from '../components/grantStatusChart';
import Layout from '../components/layout';

function GrantStatusReport() {
    useEffect(() => {
        document.title = "Eunoia - Statistics"; 
      }, []);
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
        <Layout>
        <div>
            <h2 className='center'>Statistics</h2>
            <br />
            <h4 className='description'>
            View up-to-date statistics on your grant processes for a comprehensive overview of your progress.</h4>
            <GrantStatusChart statusData={statusData} />
        </div>
        </Layout>
    );
}

export default GrantStatusReport;