import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../features/ProductSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AddToCart, fetchCartProduct } from '../../../features/CartSlice';
import { FetchCategory } from '../../../features/CategorySlice';

const Products = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.Product);
    const { category } = useSelector((state) => state.category);
    const [loaderSpiner, setLoaderSpinner] = useState(null);
    const { user } = useSelector((state) => state.user);
    const userId = user?.user?._id;
    const [searchText, setSearchText] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState({ from: 0, to: 600 });

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(FetchCategory());
    }, [dispatch]);

    // Handle Send Data
    const HandleSendData = async (item) => {
        setLoaderSpinner(item._id);
        await dispatch(AddToCart({ userId, item }));
        dispatch(fetchCartProduct({ userId }));
        setLoaderSpinner(null);
    };

    // Filtered Items
    const filteredItems = products?.filter((item) => {
        const isCategoryMatch = selectedCategory ? item.category === selectedCategory : true;
        const isPriceMatch = item.price >= priceRange.from && item.price <= priceRange.to;
        const isSearchMatch = item?.title?.toLowerCase()?.includes(searchText.toLowerCase()) || String(item?.price).includes(searchText.toLowerCase());
        return isCategoryMatch && isPriceMatch && isSearchMatch;
    });

    return (
        <div className="flex flex-col gap-5 p-5 ">
            <span className="flex items-center my-10">
                <span className="pr-6">Shop</span>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <div className="btn w-[98%] md:w-[80%] m-auto mt-5">
                <input onChange={(e) => {
                    setSearchText(e.target.value);
                }} className='w-full h-12 border outline-none focus:outline-none px-3 ' type="search" name="title" id="title" placeholder='Enter Your Title or Price Search' />
            </div>
            <div className="title w-full m-auto justify-around md:hidden items-center gap-5">
                <select
                    className='md:w-[200px] w-full h-12 outline-none border px-2'
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All</option>
                    {category?.map((cat) => (
                        <option key={cat._id} value={cat._category}>
                            {cat.category}
                        </option>
                    ))}
                </select>
                <div className="relative mt-4 md:mt-0 ">
                    <details className="group border h-12 outline-none md:w-[200px] w-full">
                        <summary className="flex border h-12 outline-none md:w-[200px] full justify-around cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900">
                            <span className="text-sm font-medium"> Price </span>
                            <span className="transition group-open:-rotate-180">
                                <ArrowForwardIcon />
                            </span>
                        </summary>
                        <div className="z-50 group-open:absolute group-open:mt-2">
                            <div className="w-96 rounded border bg-white p-4">
                                <header className="flex items-center justify-between">
                                    <span className="text-sm">Highest price: $600</span>
                                    <button type="button" onClick={() => setPriceRange({ from: 0, to: 600 })} className="text-sm text-gray-900 underline">
                                        Reset
                                    </button>
                                </header>
                                <div className="border-t p-4">
                                    <div className="flex gap-4">
                                        <input
                                            type="number"
                                            placeholder="From"
                                            className="w-full outline-none border h-10 px-2 rounded-md border-gray-200"
                                            value={priceRange.from}
                                            onChange={(e) => setPriceRange({ ...priceRange, from: +e.target.value })}
                                        />
                                        <input
                                            type="number"
                                            placeholder="To"
                                            className="w-full outline-none border h-10 px-2 rounded-md border-gray-200"
                                            value={priceRange.to}
                                            onChange={(e) => setPriceRange({ ...priceRange, to: +e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </details>
                </div>
            </div>
            <div className="flex gap-5">
                <div className="md:flex hidden flex-col md:w-[300px]">
                    <div className="flex flex-col gap-5">
                        <h2 className="text-2xl font-bold">Filter by Price</h2>
                        <input
                            type="number"
                            placeholder="From"
                            className="w-full outline-none border h-10 px-2 rounded-md border-gray-200"
                            value={priceRange.from}
                            onChange={(e) => setPriceRange({ ...priceRange, from: +e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="To"
                            className="w-full outline-none border h-10 px-2 rounded-md border-gray-200"
                            value={priceRange.to}
                            onChange={(e) => setPriceRange({ ...priceRange, to: +e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-5 mt-5">
                        <button onClick={() => {
                            setSelectedCategory("")
                        }} type='submit' className={`text-sm uppercase py-2 px-3 rounded-lg bg-white h-16 text-gray-500 hover:text-gray-700`}>All</button>
                        {category?.map((it) => {
                            return (
                                <button key={it._id} onClick={() => setSelectedCategory(it.category)} className={`text-sm uppercase py-2 px-3 rounded-lg bg-white h-16 text-gray-500 hover:text-gray-700 ${selectedCategory === it.category ? 'bg-yellow' : ''}`}>
                                    {it.category}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="grid m-auto sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 my-20 gap-5">
                    {filteredItems?.map((item) => {
                        return (
                            <div key={item._id} className="product h-[410px] relative pt-5 px-5 pb-3 bg-white rounded-lg hover:shadow-xl">
                                <div className="flex items-center justify-center bg-[#f9f9f9] rounded-lg">
                                    <img loading='lazy' className='w-64 h-56' src={`${import.meta.env.VITE_SOME_URL}/Uploads/${item.image}`} alt={item.title} />
                                </div>
                                <h4 className="mt-2 text-2xl font-medium my-3 h-16">{item.title}</h4>
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
                                                <svg  loading='lazy' xmlns="http://www.w3.org/2000/svg" className="w-8 m-auto animate-spin fill-yellow  block mx-auto" viewBox="0 0 24 24">
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
                                <div className=" hidden boxView w-[90%] mt-1 absolute top-2  items-center justify-between">
                                    <div className="flex w-[100%] m-auto justify-between items-center">
                                        <Link to={`/product/details/${item._id}`} className="text-sm text-blue-500 hover:text-blue-700">
                                        </Link>
                                        <div >
                                            <button className='bg-white p-4 rounded-full'>👍</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Products;
