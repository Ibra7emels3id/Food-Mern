import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Fetch the User
export const fetchUser = createAsyncThunk('fetchUser', async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get('http://localhost:3000/api/user', {
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
            credentials: 'include',
        })
        return res.data;
    } catch (error) {
        console.error(error);
    }
})

// LogOut user
export const logOutUser = createAsyncThunk('logOutUser', async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SOME_URL}/api/user/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        localStorage.removeItem('token');
        return response.data
    } catch (error) {
        console.error('Logout error:', error.response ? error.response.data : error.message);
        throw error;
    }
});


// User slice

const UserSlice = createSlice({
    name: 'User',
    initialState: {
        user: null,
        sLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        // get user
        builder.addCase(fetchUser.pending, (state, action) => {
            state.sLoading = true;
            state.error = null;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.sLoading = false;
            state.user = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.sLoading = false;
            state.error = action.error.message;
        });
        // log out user
        builder.addCase(logOutUser.pending, (state, action) => {
            state.sLoading = true;
            state.error = null;
        });
        builder.addCase(logOutUser.fulfilled, (state, action) => {
            state.sLoading = false;
            state.user = action.payload.user;
        });
        builder.addCase(logOutUser.rejected, (state, action) => {
            state.sLoading = false;
            state.error = action.error.message;
        });
    }
})

export default UserSlice.reducer;