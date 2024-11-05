import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../features/ProductSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AddToCart, fetchCartProduct } from '../../../features/CartSlice';

const Products = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.Product);
    const sortProduct = Array.isArray(products)
    ? [...products].sort(() => Math.random() - 0.5)
    : [];
    const { cart } = useSelector((state) => state.cart);
    const [loaderSpiner, setLoaderSpinner] = useState(null)
    const { user } = useSelector((state) => state.user)
    const userId = user?.user?._id;

    // Handle Send Data
    const HandleSendData = async (item) => {
        setLoaderSpinner(item._id)
        await dispatch(AddToCart({ userId, item }));
        dispatch(fetchCartProduct({ userId }));
        setLoaderSpinner(null);
    };



    const Items = sortProduct?.slice(0, 10).map((item) => {
        return (
            <div key={item._id} className="product relative pt-5 px-5 pb-3 bg-white rounded-lg hover:shadow-xl">
                <div className="flex items-center justify-center bg-[#f9f9f9] rounded-lg">
                    <img loading='lazy' className='w-64 h-56' src={item.image} alt={item.title} />
                </div>
                <h4 className="mt-2 text-2xl font-medium my-3 pt-1 h-14 flex items-center uppercase">{item.title}</h4>
                <p className="text-gray-500 text-xs flex items-center justify-between">
                    <span>
                        <Rating name="read-only" value={item?.rating} readOnly />
                    </span>
                    <span className='text-sm'>{item.count || 1} count</span>
                </p>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-lg font-bold my-2 ">${item.price}</p>
                    <div className="flex items-center gap-5">
                        <Link to={`/product/details/${item._id}`} className=" text-light hover:text-black">
                            <VisibilityIcon sx={{ fontSize: '30px' }} />
                        </Link>
                        {loaderSpiner === item._id ? (
                            <div className="flex items-center justify-center w-[100px]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 m-auto animate-spin fill-yellow  block mx-auto" viewBox="0 0 24 24">
                                    <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z" />
                                </svg>
                            </div>
                        ) : (
                            <button onClick={() => HandleSendData(item)} className="flex-shrink-0 h-8 hover:text-light text-white w-[100px] bg-yellow rounded-lg text-sm">
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch, userId, cart]);


    return (
        <div className="p-5 md:p-10">
            <div className="title flex justify-between items-center">
                <h3 className='font-bold text-sm md:text-3xl uppercase'>All Products</h3>
                <Link to={'/shop'} id='shop' className='text-light hover:text-black'>View All Products <ArrowForwardIcon /></Link>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 my-20 gap-5">
                {Items}
            </div>
        </div>
    );
};

export default Products;
