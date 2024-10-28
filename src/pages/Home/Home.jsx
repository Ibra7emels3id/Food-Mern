import React, { useState } from 'react';
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import MainSection from './_components/MainSection';
import Category from './_components/Category';
import CannedFood from './_components/CannedFood';
import Products from './_components/Products';
import Offers from './_components/Offers';
import SellingProducts from './_components/SellingProducts';
import Discount from './_components/Discount';
import PopularProducts from './_components/PopularProducts';
import JustArrived from './_components/JustArrived';
import OurBlog from './_components/OurBlog';
import ShopApp from './_components/ShopApp';
import Discover from './_components/Discover';

const Home = ({UserData}) => {
    const [loading, setLoading] = useState(false)


    if (loading) {
        // return <Loader />
    }

    return (
        <>
            <Header UserData={UserData} />
            <MainSection />
            <Category />
            <CannedFood/>
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
        </>
    );
}

export default Home;
