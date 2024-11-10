import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from '../features/ProductSlice'
import UserSlice from '../features/UserSlice'
import cartSlice from '../features/CartSlice'
import CategorySlice from '../features/CategorySlice'
import cartPaymentSlice from '../features/CartPaymentSlice'
import ReviewSlice from '../features/ReviewSlice'
import BannersSlice from '../features/BannersSlice'


const store = configureStore({
    reducer: {
        Product: ProductSlice,
        cart: cartSlice,
        user: UserSlice,
        category: CategorySlice,
        cartPay: cartPaymentSlice,
        allUsers: UserSlice,
        payments: cartPaymentSlice,
        reviews: ReviewSlice,
        banners: BannersSlice,
        offers: BannersSlice,
        oneOffer : BannersSlice ,
        
    },
})

export default store;