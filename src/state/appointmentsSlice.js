import { createSlice } from '@reduxjs/toolkit';

export const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: [],
    reducers: {
        addAppointment: (state, action) => {
            state.push(action.payload);
        },
        updateAppointment: (state, action) => {
            const index = state.findIndex(appointment => appointment.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteAppointment: (state, action) => {
            console.log("Deleting appointment:", action.payload); // Debugging log
            return state.filter(appointment => appointment.id !== action.payload);
        }
    }
});

export const { addAppointment, updateAppointment, deleteAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
