import { createSlice } from '@reduxjs/toolkit';

export const staffSlice = createSlice({
    name: 'staff',
    initialState: [],
    reducers: {
        addStaffMember: (state, action) => {
            state.push(action.payload);
        },
        updateStaffMember: (state, action) => {
            const index = state.findIndex(staff => staff.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteStaffMember: (state, action) => {
            return state.filter(staff => staff.id !== action.payload.id);
        }
    }
});

export const { addStaffMember, updateStaffMember, deleteStaffMember } = staffSlice.actions;
export default staffSlice.reducer;
