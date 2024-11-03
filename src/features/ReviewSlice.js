import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "react-router-dom";
import { toast } from "react-toastify";


// Add Review to server
export const AddReviewClint = createAsyncThunk("AddReviewClint", async ({ formData }) => {
    console.log(formData);
    try {
        const review = await axios.post(`${import.meta.env.VITE_SOME_URL}/api/add-review`, formData);
        toast.success('Review added successfully', {
            position: "top-center",
            autoClose: 2000
        })
        return review;
    } catch (error) {
        toast.error('Failed to add review. Please try again')
        throw error;
    }
});

// fetch Review
export const fetchReview = createAsyncThunk("fetchReview", async () => {
    try {
        const review = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/review`);
        return review.data;
    } catch (error) {
        console.error('Failed to fetch reviews. Please try again', error);
    }
});





const initialState = {
    loading: false,
    error: null,
    reviews: [],
};

const ReviewSlice = createSlice({
    name: 'review',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})
export default ReviewSlice.reducer;