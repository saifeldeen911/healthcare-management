import React from 'react';
import { useSelector } from 'react-redux';
import './styles/RecordReconciliation.css'; // Importing the new CSS

const RecordReconciliation = () => {
    const patients = useSelector(state => state.patients);
    const appointments = useSelector(state => state.appointments);

    const reconciledRecords = React.useMemo(() => {
        return patients.map(patient => {
            const patientAppointments = appointments.filter(app => app.patientId.toString() === patient.id.toString());
            const totalAppointments = patientAppointments.length;
            const lastAppointment = patientAppointments.length > 0 ? patientAppointments[patientAppointments.length - 1].date : 'No appointments';

            return {
                ...patient,
                totalAppointments,
                lastAppointmentDate: lastAppointment,
            };
        });
    }, [patients, appointments]);

    return (
        <div className='container record-reconciliation'>
            <h2>Record Reconciliation</h2>
            <ul className='reconciliation-list'>
                {reconciledRecords.map(record => (
                    <li key={record.id} className='reconciliation-item'>
                        <div className='record-details'>
                            <h3>{record.name}</h3>
                            <p>ID: {record.id}</p>
                            <p>Gender: {record.gender}</p>
                        </div>
                        <div className='appointment-details'>
                            <p>Total Appointments: {record.totalAppointments}</p>
                            <p>Last Appointment: {record.lastAppointmentDate}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecordReconciliation;
