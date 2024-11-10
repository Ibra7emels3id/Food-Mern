import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Add Banner to Server

export const addBanner = createAsyncThunk('addBanner', async ({ formData }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SOME_URL}/api/add-banner`, formData)
        toast.success('Successfully added banner', {
            position: "top-right",
            autoClose: 2000,
        })
        return res.data;
    } catch (error) {
        console.log('Failed to add banner', error);
    }
})


// Get Banners
export const fetchBanners = createAsyncThunk('fetchBanners', async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/banners`)
        return res.data;
    } catch (error) {
        console.log('Failed to get banners', error);
    }
})

// Add Offers
export const addBannerOffer = createAsyncThunk('addBannerOffer', async ({ formData }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_SOME_URL}/api/add-offer`, formData)
        toast.success('Successfully added offer', {
            position: "top-right",
            autoClose: 2000,
        })
        return res.data;
    } catch (error) {
        console.log('Failed to add offer', error);
    }
})

// Get Offers
export const fetchOffers = createAsyncThunk('fetchOffers', async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/offers`)
        return res.data;
    } catch (error) {
        console.log('Failed to get offers', error);
    }
})

// DElete Offers
export const DeleteOffer = createAsyncThunk('DeleteOffer', async (id) => {
    try {
        await axios.delete(`${import.meta.env.VITE_SOME_URL}/api/delete-offer/${id}`)
        toast.success('Successfully deleted offer', {
            position: "top-right",
            autoClose: 2000,
        })
    } catch (error) {
        console.log('Failed to delete offer', error);
    }
})

// get One offer
export const fetchOneOffer = createAsyncThunk('fetchOneOffer', async ({ id }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SOME_URL}/api/offer/${id}`)
        return res.data;
    } catch (error) {
        console.log('Failed to get offer', error);
    }
})

// Update Banner 
export const updateBannerId = createAsyncThunk('updateBannerId', async ({ id, formData }) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_SOME_URL}/api/update-banner/${id}`, formData)
        toast.success('Successfully updated banner', {
            position: "top-right",
            autoClose: 2000,
        })
        return res.data;
    } catch (error) {
        console.log('Failed to update banner', error);
    }
})



const initialState = {
    loading: false,
    error: null,
    banners: [],
    offers: [],
    oneOffer: null
};

const BannersSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addBanner.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addBanner.fulfilled, (state, action) => {
            state.loading = false;
            state.banners.push(action.payload);
        });
        builder.addCase(addBanner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // Get Data Banners
        builder.addCase(fetchBanners.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchBanners.fulfilled, (state, action) => {
            state.loading = false;
            state.banners = action.payload;
        });
        builder.addCase(fetchBanners.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // Update banner
        builder.addCase(updateBannerId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateBannerId.fulfilled, (state, action) => {
            state.loading = false;
            state.banners = state.banners.map((banner) => banner._id === action.payload._id? action.payload : banner);
        });
        builder.addCase(updateBannerId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // Add Offer
        builder.addCase(addBannerOffer.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        // Get Offers
        builder.addCase(fetchOffers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchOffers.fulfilled, (state, action) => {
            state.loading = false;
            state.offers = action.payload;
        });
        builder.addCase(fetchOffers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        // delete offers
        builder.addCase(DeleteOffer.fulfilled, (state, action) => {
            state.offers = state.offers.filter((offer) => offer._id !== action.payload);
        });
        // get one offer
        builder.addCase(fetchOneOffer.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchOneOffer.fulfilled, (state, action) => {
            state.loading = false;
            state.oneOffer = action.payload;
        });
        builder.addCase(fetchOneOffer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        
    },
})
export default BannersSlice.reducer;