import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/products`)
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

// Details Product
export const fetchProductDetails = createAsyncThunk('fetchProductDetails', async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/products/details/${id}`)
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
})


// Add a new product
export const AddProductCart = createAsyncThunk('AddProductCart', async ({ formData }) => {
    console.log(formData);
    try {
        const response = await axios.post(`${import.meta.env.VITE_SOME_URL}/api/products`, formData);
        // console.log(response.data);
        toast.success('Product added successfully')
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
});

// Update Product
export const UpdateProductId = createAsyncThunk('UpdateProductId', async ({ id, formData }) => {
    console.log(id, formData);
    try {
        await axios.put(`${import.meta.env.VITE_SOME_URL}/api/product/update/${id}`, formData);
        toast.success('Product updated successfully')
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
});

// Delete Product
export const DeleteProduct = createAsyncThunk('DeleteProduct', async ({deleteproductId})=>{
    console.log(deleteproductId);
    try {
        await axios.delete(`${import.meta.env.VITE_SOME_URL}/api/products/delete/${deleteproductId}`);
        toast.success('Delete product successfully')
    } catch (error) {
        console.error('Error deleting products:', error);
        throw error;
    }
})




const ProductSlice = createSlice({
    name: 'ProductsSlice',
    initialState: {
        products: [],
        loading: false,
        error: null,
        Product:{}
    },
    extraReducers: (builder) => {
        // Get Products 
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Add Product
        builder.addCase(AddProductCart.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(AddProductCart.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
        });
        builder.addCase(AddProductCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Update Product
        builder.addCase(UpdateProductId.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(UpdateProductId.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(UpdateProductId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // Details Product
        builder.addCase(fetchProductDetails.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.Product = action.payload;
        });
        builder.addCase(fetchProductDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // Delete Product
        builder.addCase(DeleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(product => product._id!== action.payload);
        });
        builder.addCase(DeleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export default ProductSlice.reducer;