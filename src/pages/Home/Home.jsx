import React, { lazy, Suspense } from 'react';
import Discount from './_components/Discount';
import PopularProducts from './_components/PopularProducts';
import JustArrived from './_components/JustArrived';
import Loading from '../../Components/Loading';
import { useSelector } from 'react-redux';

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
const AlertOffer = lazy(() => import('./_components/AlertOffer'));

const Home = () => {
    const { products } = useSelector((state) => state.Product)

    if (!products) return <Loading />;

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Header />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <MainSection />
                <Category />
                <CannedFood />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Products />
                <Offers />
                <SellingProducts />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Discount />
                <PopularProducts />
                <JustArrived />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <OurBlog />
                <ShopApp />
                <Discover />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Footer />
                <AlertOffer />
            </Suspense>
        </>
    );
}

export default React.memo(Home);
