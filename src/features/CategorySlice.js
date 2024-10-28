import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";





// Add Category to Server
export const AddToCategory = createAsyncThunk('AddToCategory', async ({ formData }) => {
    console.log(formData);
    try {
        const res = await axios.post(`${import.meta.env.VITE_SOME_URL}/api/category`, formData)
        toast.success('Add category successfully', {
            position: "top-center",
            autoClose: 3000,
        })
        return res.data;
    } catch (error) {
        toast.error('Failed to add category', {
            position: "top-center",
            autoClose: 3000,
        })
        throw error;
    }
})

// get Category from Server
export const FetchCategory = createAsyncThunk('FetchCategory', async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/category`)
        return res.data;
    } catch (error) {
        console.log(error);
    }
})

// Category Delete from Server
export const DeleteCategory = createAsyncThunk('DeleteCategory', async (id) => {
    console.log(id);
    try {
        await axios.delete(`${import.meta.env.VITE_SOME_URL}/api/category/${id}`)
        toast.info('Delete category successfully', {
            position: "top-center",
            autoClose: 3000,
        })
    } catch (error) {
        toast.error('Failed to delete category', {
            position: "top-center",
            autoClose: 3000,
        })
        throw error;
    }
})




const initialState = {
    loading: false,
    error: null,
    category: [],
};
const category = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) => {
        // add Category
        builder
            .addCase(AddToCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(AddToCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = [...state.category, action.payload];
            })
            .addCase(AddToCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            // Get Category
            builder
            .addCase(FetchCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(FetchCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(FetchCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
            // Delete Category
            builder
            .addCase(DeleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = state.category.filter((c) => c._id!== action.payload);
            })
            .addCase(DeleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export default category.reducer;