import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addAppointment, updateAppointment, deleteAppointment } from '../state/appointmentsSlice';
import { v4 as uuidv4 } from 'uuid';
import './styles/AppointmentManagementComponent.css';

const AppointmentManagement = () => {
    const appointments = useSelector(state => state.appointments);
    const patients = useSelector(state => state.patients);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editingAppointmentId, setEditingAppointmentId] = useState(null);

    const initialValues = {
        patientId: '',
        date: '',
        time: '',
        reason: '',
    };

    const validationSchema = Yup.object({
        patientId: Yup.string().required('Patient ID is required'),
        date: Yup.string().required('Date is required'),
        time: Yup.string().required('Time is required'),
        reason: Yup.string().required('Reason is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        const patientExists = patients.some(patient => patient.id.toString() === values.patientId);

        if (!patientExists) {
            alert('Patient does not exist. Please enter a valid Patient ID.');
            return;
        }

        if (isEditing) {
            dispatch(updateAppointment({ ...values, id: editingAppointmentId }));
            setIsEditing(false);
            setEditingAppointmentId(null);
        } else {
            dispatch(addAppointment({ ...values, id: uuidv4() }));
        }

        resetForm();
    };

    const handleDelete = (id) => {
        console.log('Deleting appointment with ID:', id); // Debugging log
        dispatch(deleteAppointment(id));
    };

    return (
        <div className='container appointment-management'>
            <h2>Appointment Management</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}  // This ensures that the form is reinitialized when editing
            >
                {({ setFieldValue, resetForm }) => (
                    <>
                        <Form className="appointment-form">
                            <div className="form-group">
                                <label htmlFor="patientId">Patient ID</label>
                                <Field name="patientId" type="text" />
                                <ErrorMessage name="patientId" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <Field name="date" type="date" />
                                <ErrorMessage name="date" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Time</label>
                                <Field name="time" type="time" />
                                <ErrorMessage name="time" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reason">Reason</label>
                                <Field name="reason" type="text" />
                                <ErrorMessage name="reason" component="div" className="error-message" />
                            </div>
                            <button type="submit">{isEditing ? 'Update' : 'Schedule'}</button>
                        </Form>

                        <h3>Appointment History</h3>
                        <ul>
                            {appointments.map((appointment) => (
                                <li key={appointment.id}>
                                    {appointment.date} - {appointment.time} with Patient ID {appointment.patientId} for {appointment.reason}
                                    <button onClick={() => {
                                        setIsEditing(true);
                                        setEditingAppointmentId(appointment.id);
                                        setFieldValue('patientId', appointment.patientId);
                                        setFieldValue('date', appointment.date);
                                        setFieldValue('time', appointment.time);
                                        setFieldValue('reason', appointment.reason);
                                    }}>
                                        Reschedule
                                    </button>
                                    <button onClick={() => {
                                        handleDelete(appointment.id);
                                        resetForm();
                                    }}>
                                        Cancel
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default AppointmentManagement;
