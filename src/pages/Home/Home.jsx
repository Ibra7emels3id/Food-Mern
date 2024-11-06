import React, { lazy, Suspense, useEffect, useState } from 'react';
import Discount from './_components/Discount';
import PopularProducts from './_components/PopularProducts';
import JustArrived from './_components/JustArrived';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../features/UserSlice';
import Loading from '../../Components/Loading';

const Home = ({ UserData }) => {
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(fetchUser())
    }, [])


    // 
    const Header = lazy(() => import('../../Components/Header'));
    const MainSection = lazy(() => import('./_components/MainSection'));
    const Category = lazy(() => import('./_components/Category'));
    const CannedFood = lazy(() => import('./_components/CannedFood'));
    const Products = lazy(() => import('./_components/Products'));
    const Offers = lazy(() => import('./_components/Offers'));
    const SellingProducts = lazy(() => import('./_components/SellingProducts'));
    const OurBlog = lazy(() => import('./_components/OurBlog'));
    const ShopApp = lazy(() => import('./_components/ShopApp'));
    const Discover = lazy(() => import('./_components/Discover'));
    const Footer = lazy(() => import('../../Components/Footer'));



    return (
        <>
            <Suspense fallback={<div>
                <Loading />
            </div>}>
                <Header UserData={UserData} />
                <MainSection />
                <Category />
                <CannedFood />
                <Products UserData={UserData} />
                <Offers />
                <SellingProducts />
                <Discount />
                <PopularProducts />
                <JustArrived />
                <OurBlog />
                <ShopApp />
                <Discover />
                <Footer />
            </Suspense>
        </>
    );
}

export default Home;
