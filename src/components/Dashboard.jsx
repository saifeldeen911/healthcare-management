import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const patients = useSelector(state => state.patients);
    const appointments = useSelector(state => state.appointments);

    const data = {
        labels: ['Patients', 'Appointments'],
        datasets: [
            {
                label: ['Healthcare Metrics'],
                data: [patients.length, appointments.length],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)']
            }
        ]
    };

    return (
        <div className='container'>
            <h2>Dashboard</h2>
            <Bar data={data} />
        </div>
    );
};

export default Dashboard;
