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
import DetailsProduct from './pages/View/DetailsProduct';
import { fetchUser } from './features/UserSlice';
import Category from './admin/pages/Category/Category';
import AddCategory from './admin/pages/Category/AddCategory';
import Checkout from './pages/Checkout.jsx/Checkout';
import Success from './pages/Success/Success';
import { fetchCartPayment } from './features/CartPaymentSlice';
import Shop from './pages/shop/shop';
import Transactions from './pages/Transactions/Transactions';
import Audience from './admin/pages/Audience/Audience';
import Order from './admin/pages/Order/Order';
import UpdateProduct from './admin/pages/Products/UpdateProduct';
import UpdateCategory from './admin/pages/Category/UpdateCategory';
import Account from './pages/Account/Account';
import FilterCategory from './pages/FilterCategory/FilterCategory';
import Blog from './pages/Blog/Blog';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Review from './pages/Review/Review';
import Team from './pages/Team/Team';
import Banner from './admin/pages/Banner/Banners';
import AddBannerHeader from './admin/pages/Banner/AddBannerHeader';
import UpdateBanner from './admin/pages/Banner/UpdateBanner';
import AddOffer from './admin/pages/Banner/AddOffer';

function App() {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.user);
    const userId = user?.user?._id;
    const [isUserLoading, setIsUserLoading] = useState(true);

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
                    <Route path="/account/:id" element={<Account />} />
                    <Route path="/category/:id" element={<FilterCategory />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/review" element={<Review />} />
                    <Route path="/team" element={<Team />} />








                    <Route path="/admin" element={<Admin UserData={user} />} />
                    <Route path="/admin/products/addproduct" element={<AddProduct UserData={user} />} />
                    <Route path="/admin/products" element={<Products UserData={user} />} />
                    <Route path="/admin/category" element={<Category UserData={user} />} />
                    <Route path="/admin/category/add-category" element={<AddCategory />} />
                    <Route path="/admin/category/edit-category/:id" element={<UpdateCategory />} />
                    <Route path="/admin/audience" element={<Audience />} />
                    <Route path="/admin/order" element={<Order />} />
                    <Route path="/admin/product/edit-product/:id" element={<UpdateProduct />} />
                    <Route path="/admin/banners" element={<Banner />} />
                    <Route path="/admin/banner/Addbannerheader" element={<AddBannerHeader />} />
                    <Route path="/admin/banner/update-banner/:id" element={<UpdateBanner />} />
                    <Route path="/admin/banner/Offer" element={<AddOffer />} />



                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
