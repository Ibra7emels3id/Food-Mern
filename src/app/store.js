import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from '../features/ProductSlice'
import UserSlice from '../features/UserSlice'
import cartSlice from '../features/CartSlice'
import CategorySlice from '../features/CategorySlice'
import cartPaymentSlice from '../features/CartPaymentSlice'



const store = configureStore({
    reducer: {
        Product: ProductSlice,
        cart: cartSlice,
        user: UserSlice,
        category: CategorySlice,
        cartPay: cartPaymentSlice
    },
})

export default store;