import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from './patientsSlice';
import appointmentsReducer from './appointmentsSlice';
import staffReducer from './staffSlice';

export const store = configureStore({
    reducer: {
        patients: patientsReducer,
        appointments: appointmentsReducer,
        staff: staffReducer
    }
});
