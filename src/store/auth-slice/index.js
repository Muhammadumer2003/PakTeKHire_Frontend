import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Holds the logged-in user's details
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Set the user object
    },
    logout: (state) => {
      state.user = null; // Clear the user object
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
