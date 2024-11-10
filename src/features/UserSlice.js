import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


// Login User 
export const loginUser = createAsyncThunk('loginUser', async ({ data }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SOME_URL}/api/users/login`, data)
        if (res.status === 200) {
            toast.success(res.data.message)
            localStorage.setItem('token', res.data.token)
        } else {
            toast.error(res.data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error('Invalid Email or Password')
    }
})

// Fetch the User
export const fetchUser = createAsyncThunk('fetchUser', async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/user`, {
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

// Update User

export const UpdateUserData = createAsyncThunk('UpdateUserData', async ({ formData }, thunkAPI) => {
    const state = thunkAPI.getState();
    const id = state?.user.user.user?._id;
    try {
        const res = await axios.put(`${import.meta.env.VITE_SOME_URL}/api/update-user/${id}`, formData)
        toast.success(res.data.message);
        return res.data;
    } catch (error) {
        console.error('Update user error:', error.response ? error.response.data : error.message);
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

// Get All Users
export const getAllUsers = createAsyncThunk('getAllUsers', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/all/users`)
        return response.data;
    } catch (error) {
        console.error(error);
    }
})

// Blocked User
export const blockUser = createAsyncThunk('blockUser', async (userId) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SOME_URL}/api/user/block/${userId}`);
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        console.error('Block user error:', error.response ? error.response.data : error.message);
        throw error;
    }
});

// Delete the user
export const deleteUser = createAsyncThunk('deleteUser', async (userId) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_SOME_URL}/api/user/delete/${userId}`);
        toast.info(response.data.message);
        return response.data;
    } catch (error) {
        console.error('Delete user error:', error.response ? error.response.data : error.message);
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
        allUsers: [],
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
        // Get All Users
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.sLoading = true;
            state.error = null;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.sLoading = false;
            state.allUsers = action.payload;
        });
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.sLoading = false;
            state.error = action.error.message;
        });
        // Block User
        builder.addCase(blockUser.pending, (state, action) => {
            state.sLoading = true;
            state.error = null;
        });
        builder.addCase(blockUser.fulfilled, (state, action) => {
            state.sLoading = false;
            state.allUsers = state.allUsers.filter(user => user._id !== action.payload.userId);
        });
        builder.addCase(blockUser.rejected, (state, action) => {
            state.sLoading = false;
            state.error = action.error.message;
        });
        // Delete User
        builder.addCase(deleteUser.pending, (state, action) => {
            state.sLoading = true;
            state.error = null;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.sLoading = false;
            state.allUsers = state.allUsers.filter(user => user._id !== action.payload.userId);
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.sLoading = false;
            state.error = action.error.message;
        });
    }
})

export default UserSlice.reducer;