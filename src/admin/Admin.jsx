import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Components/Loading';
import RegistrationChart from './pages/_Components/RegistrationChart';
import { fetchUser, getAllUsers } from '../features/UserSlice';
import ProductsChart from './pages/_Components/ProductsChart';
import { fetchProducts } from '../features/ProductSlice';
import { fetchCartPayment, getAllPayments } from '../features/CartPaymentSlice';
import { FetchCategory } from '../features/CategorySlice';

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, sLoading } = useSelector((state) => state.user);
    const { allUsers } = useSelector((state) => state.allUsers);
    const { products } = useSelector((state) => state.Product)
    const { payments } = useSelector((state) => state.payments);
    const { category } = useSelector((state) => state.category)
    const [chartDataUser, setChartDataUser] = useState([]);
    const [chartDataProducts, setchartDataProducts] = useState([]);


    console.log(payments);
    // Set Chart 
    useEffect(() => {
        const dailyRegistrations = {};
        const dailyProducts = {};

        allUsers.forEach(user => {
            const date = new Date(user.createdAt).toISOString().split('T')[0];

            if (dailyRegistrations[date]) {
                dailyRegistrations[date] += 1;
            } else {
                dailyRegistrations[date] = 1;
            }
        });

        const chartDataUsers = Object.keys(dailyRegistrations).map(date => ({
            date,
            count: dailyRegistrations[date]
        }));

        products.forEach(product => {
            const date = new Date(product.createdAt).toISOString().split('T')[0];

            if (dailyProducts[date]) {
                dailyProducts[date] += 1;
            } else {
                dailyProducts[date] = 1;
            }
        });

        const chartDataProducts = Object.keys(dailyProducts).map(date => ({
            date,
            count: dailyProducts[date]
        }));


        setChartDataUser(chartDataUsers);
        setchartDataProducts(chartDataProducts);
    }, [allUsers, products]);



    // Check if user is authenticated and redirect to admin or user page
    if (user) {
        if (user.role === 'admin') {
            navigate('/admin');
        } else if (user.role === 'user') {
            navigate('/');
        }
    } else {
        navigate('/');
    }


    // dispatch 
    useEffect(() => {
        if (dispatch) {
            dispatch(getAllUsers());
        }
        dispatch(fetchProducts())
        dispatch(fetchUser());
        dispatch(getAllPayments());
        dispatch(FetchCategory())
        }, [dispatch]);

    // SetLoading
    if (sLoading) {
        return <Loading />;
    }

    return (
        <div className="flex">
            <Header />
            <div className="flex flex-col ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12 w-full">
                <h1 className='text-4xl'>Dashboard</h1>
                <div className="grid w-full mt-9">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <div className='bg-white h-[200px] flex flex-col items-center justify-center gap-3 shadow-xl'>
                            <h2 className='text-3xl font-bold'>User</h2>
                            <p className='text-4xl font-bold text-yellow'>{allUsers.length}</p>
                        </div>
                        <div className='bg-white h-[200px] flex flex-col items-center justify-center gap-3 shadow-xl'>
                            <h2 className='text-3xl font-bold'>Category</h2>
                            <p className='text-4xl font-bold text-yellow'>{category.length}</p>
                        </div>
                        <div className='bg-white h-[200px] flex flex-col items-center justify-center gap-3 shadow-xl'>
                            <h2 className='text-3xl font-bold'>Products</h2>
                            <p className='text-4xl font-bold text-yellow'>{products.length}</p>
                        </div>
                        <div className='bg-white h-[200px] flex flex-col items-center justify-center gap-3 shadow-xl'>
                            <h2 className='text-3xl font-bold'>Order</h2>
                            <p className='text-4xl font-bold text-yellow'>{payments.length}</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  mt-10 gap-5">
                    <RegistrationChart data={chartDataUser} />
                    <ProductsChart data={chartDataProducts} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(Admin);
