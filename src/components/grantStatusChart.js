import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function GrantStatusChart({ statusData }) {
    if (!statusData || Object.keys(statusData).length === 0) {
        return <p>No data available to display</p>;
    }

    const data = {
        labels: Object.keys(statusData),
        datasets: [
            {
                data: Object.values(statusData),
                backgroundColor: [
                    '#54C2CC', // Viking
                    '#20525C', // Astronaut Blue
                    '#DFE667', // Mindaro
                    '#7EA310', // Christi
                    '#213502', // Dark Green
                ],
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Potential Grant Status',
                font: {
                    size: 18,
                    fontFamily: 'Roboto',
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <Pie data={data} options={options} />
        </div>
    );
}

export default GrantStatusChart;
