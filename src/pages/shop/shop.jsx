import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Products from './_Components/Products';
import { useSelector } from 'react-redux';
import Loading from '../../Components/Loading';

const Shop = () => {
    const { sLoading} = useSelector((state)=> state.user)

    if(sLoading) {
        return <Loading/>
    }


    return (
        <>
            <Header />
            <Products />
            <Footer />
        </>
    );
}

export default Shop;
