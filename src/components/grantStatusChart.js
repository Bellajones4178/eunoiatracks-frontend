import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

function GrantStatusChart({ statusData }) {
    if (!statusData || Object.keys(statusData).length === 0) {
        return <p>No data available to display</p>;
    }

    const data = {
        labels: Object.keys(statusData),
        datasets: [
            {
                data: Object.values(statusData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    return <Pie data={data} />;
}

export default GrantStatusChart;