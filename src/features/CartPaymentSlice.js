import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Cart Payment 
export const fetchCartPayment = createAsyncThunk('fetchCartPayment', async (_, { getState }) => {
    const state = getState();
    const userId = state?.user?.user?.user?._id;

    console.log(userId);

    if (!userId) {
        throw new Error("User ID not available");
    }

    try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/get-payment-cart/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart payment:", error);
        throw error;
    }
});


// Create Slice
const cartPaymentSlice = createSlice({
    name: 'cartPayment',
    initialState: {
        cartPayment: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        // fetch cart payment
        builder.addCase(fetchCartPayment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchCartPayment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.cartPayment = action.payload;
        })
        builder.addCase(fetchCartPayment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default cartPaymentSlice.reducer;