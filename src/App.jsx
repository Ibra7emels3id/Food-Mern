import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Admin from './admin/Admin';
import AddProduct from './admin/pages/Products/AddProduct';
import Products from './admin/pages/Products/Products';
import { fetchCartProduct } from './features/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './pages/Cart/Cart';
import Header from './Components/Header';
import DetailsProduct from './pages/View/DetailsProduct';
import { fetchUser } from './features/UserSlice';
import Category from './admin/pages/Category/Category';
import AddCategory from './admin/pages/Category/AddCategory';
import Checkout from './pages/Checkout.jsx/Checkout';
import Success from './pages/Success/Success';
import { fetchCartPayment } from './features/CartPaymentSlice';
import Shop from './pages/shop/shop';
import Transactions from './pages/Transactions/Transactions';

function App() {
    const token = localStorage.getItem('token');
    const [UserData, setUserData] = useState(null);
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.user);
    const userId = user?.user?._id;
    const [isUserLoading, setIsUserLoading] = useState(true);

    // Check Token
    useEffect(() => {
        if (!token) {
            toast.error('Please log in first');
        }
    }, [token]);

    // Get Data From Api
    useEffect(() => {
        const fetchData = async () => {
            setIsUserLoading(true);
            await dispatch(fetchUser());
            setIsUserLoading(false);
        };

        fetchData();
    }, [dispatch]);


    useEffect(() => {
        const getUserCart = async () => {
            if (userId) {
                await dispatch(fetchCartProduct());
                await dispatch(fetchCartPayment())
            }
        };
        if (userId) {
            getUserCart();
        }
    }, [dispatch, userId, token]);

    return (
        <>
            <BrowserRouter basename="/">
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product/details/:id" element={<DetailsProduct />} />
                    <Route path="/cart/checkout/:id/discount/:discount/tex/:tex" element={<Checkout />} />
                    <Route path="/cart/checkout/payment/success/:id" element={<Success />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/transactions" element={<Transactions />} />


                    


                    <Route path="/admin" element={<Admin UserData={user} />} />
                    <Route path="/admin/products/addproduct" element={<AddProduct UserData={user} />} />
                    <Route path="/admin/products" element={<Products UserData={user} />} />
                    <Route path="/admin/category" element={<Category UserData={user} />} />
                    <Route path="/admin/category/add-category" element={<AddCategory/>} />
                    
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
