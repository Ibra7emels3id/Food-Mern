import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Cart Payment 
export const fetchCartPayment = createAsyncThunk('fetchCartPayment', async (_, { getState }) => {
    const state = getState();
    const userId = state?.user?.user?.user?._id;
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


// Get All Payment
export const getAllPayments = createAsyncThunk('getAllPayments', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/get-all-payments`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all payments:", error);
        throw error;
    }
});

// Confirm Order Payment
export const confirmOrderPayment = createAsyncThunk('confirmOrderPayment', async (id) => {

    try {
        await axios.put(`${import.meta.env.VITE_SOME_URL}/api/confirm-order/${id}`);
        return { message: "Payment confirmed successfully" };
    } catch (error) {
        console.error("Error confirming order payment:", error);
        throw error;
    }
});




// Create Slice
const cartPaymentSlice = createSlice({
    name: 'cartPayment',
    initialState: {
        cartPayment: null,
        loading: false,
        error: null,
        payments: [],
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
        // get all payments
        builder.addCase(getAllPayments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getAllPayments.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.payments = action.payload;
        })
        builder.addCase(getAllPayments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        // confirm order payment
        builder.addCase(confirmOrderPayment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(confirmOrderPayment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            // update the cart payment state
        })
        builder.addCase(confirmOrderPayment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default cartPaymentSlice.reducer;