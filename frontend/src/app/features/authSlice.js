import { createSlice } from '@reduxjs/toolkit';

const oSlice = createSlice({
    name: 'o',
    initialState: {
        token: null,
        user: null,
        loading: true
    },
    reducers: {
        // 1. Reducer to update state upon login
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        // 2. Reducer to clear state and local storage upon logout
        logout: (state) => {
            state.token = "";
            state.user = null;
            localStorage.removeItem('token');
        },
        // 3. Reducer to manage the global loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

// Exporting actions to be used in components
export const { login, logout, setLoading } = oSlice.actions;

// Exporting the reducer to be registered in store.js
export default oSlice.reducer;