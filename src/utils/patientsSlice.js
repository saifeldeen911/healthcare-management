import { createSlice } from '@reduxjs/toolkit';

export const patientsSlice = createSlice({
    name: 'patients',
    initialState: [],
    reducers: {
        addPatient: (state, action) => {
            state.push(action.payload);
        },
        updatePatient: (state, action) => {
            const index = state.findIndex(patient => patient.id === action.payload.id);
            state[index] = action.payload;
        },
        deletePatient: (state, action) => {
            return state.filter(patient => patient.id !== action.payload.id);
        }
    }
});

export const { addPatient, updatePatient, deletePatient } = patientsSlice.actions;
export default patientsSlice.reducer;
