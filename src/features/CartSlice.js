import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Flip, toast } from "react-toastify";

// Add To Cart
export const AddToCart = createAsyncThunk('AddToCart', async ({ item }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state?.user.user.user?._id;
    try {
        const response = await axios.post('http://localhost:3000/api/cart', { userId, item });
        toast.success('add Cart success', {
            position: "bottom-center",
            autoClose: 2000,
            transition: Flip,
        })
        return response.data;
    } catch (error) {
        toast.error('filed to add cart')
        console.error('Error adding product to cart:', error);
        throw error;
    }
});

// remove From Cart
export const RemoveFromCart = createAsyncThunk('RemoveFromCart', async ({ item }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state?.user.user.user?._id;
    try {
        const response = await axios.post('http://localhost:3000/api/cart-remove', { userId, item });
        console.log(response.data);
        toast.warning('Remove Cart success',{
            position: "bottom-center",
            autoClose: 2000,
            transition: Flip,

        })
        return response.data;
    } catch (error) {
        toast.error('filed to remove cart')
        console.error('Error removing product from cart:', error);
        throw error;
    }
});

// Get Cart Product
export const fetchCartProduct = createAsyncThunk('fetchCartProduct', async (_, { getState }) => {
    const state = getState();
    const userId = state?.user.user.user?._id;
    if (!userId) throw new Error("User ID not found");
    try {
        const response = await axios.get('http://localhost:3000/api/cart', {
            params: { userId }
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});


// remove Cart item 
export const RemoveCartItem = createAsyncThunk('RemoveCartItem', async ({ item }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state?.user.user.user?._id;
    try {
        const response = await axios.put('http://localhost:3000/api/cart-delete-item', { userId, item });
        toast.success('Item removed from Cart successfully');
        return response.data;
    } catch (error) {
        toast.error('filed to remove cart')
        console.error('Error removing product from cart:', error);
        throw error;
    }
});


const initialState = {
    loading: false,
    cart: [],
    error: null,
    cartQuantity: 0,
    totalPrice: 0,
}

const CartSlice = createSlice({
    name: 'cart',
    initialState,

    extraReducers: (builder) => {
        // Remove Cart Item
        builder.addCase(RemoveCartItem.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(RemoveCartItem.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = state.cart.filter((item) => item._id !== action.payload._id);
        });
        builder.addCase(RemoveCartItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Get Cart Product
        builder.addCase(fetchCartProduct.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCartProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        });
        builder.addCase(fetchCartProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})
export default CartSlice.reducer;