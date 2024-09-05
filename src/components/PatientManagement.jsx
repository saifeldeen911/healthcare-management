import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addPatient } from '../state/patientsSlice';
import './styles/PatientManagementComponent.css'

const PatientManagement = () => {
    const dispatch = useDispatch();
    const patients = useSelector(state => state.patients);
    const initialValues = {
        name: '',
        age: '',
        gender: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        age: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
        gender: Yup.string().required('Gender is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        dispatch(addPatient({ ...values, id: patients.length + 1 }));
        resetForm();
    };

    return (
        <div className="container patient-management">
            <h2>Patient Registration</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {() => (
                    <Form className="patient-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field name="name" type="text" />
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <Field name="age" type="number" />
                            <ErrorMessage name="age" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <Field name="gender" as="select">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="error-message" />
                        </div>

                        <button type="submit">Register Patient</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PatientManagement;
