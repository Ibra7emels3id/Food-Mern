import { useEffect, useMemo, useState } from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Link, useParams } from 'react-router-dom';
import { AddToCart, fetchCartProduct, RemoveFromCart } from '../../features/CartSlice';
import { fetchProductDetails } from '../../features/ProductSlice';
import { useDispatch, useSelector, } from 'react-redux';
import { Rating } from '@mui/material';
import Loading from '../../Components/Loading';


const DetailsProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const { Product, loading } = useSelector((state) => state.Product)
    const { cart } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
    const [cartIdQuantity, setcartIdQuantity] = useState(null)
    const userId = user?.user?._id

    // Handle Add To Cart
    const HandleSendData = async (item) => {
        // setLoaderSpinner(item._id)
        await dispatch(AddToCart({ userId, item }));
        dispatch(fetchCartProduct({ userId }));
        // setLoaderSpinner(null);
    };

    // Handle Remove To Cart
    const HandleRemoveToCart = async (item) => {
        // setLoaderSpinner(item._id)
        await dispatch(RemoveFromCart({ item }));
        dispatch(fetchCartProduct());
        // setLoaderSpinner(null);
    };



    useEffect(() => {
        if (id) {
            const quantityCart = cart?.cart?.items?.find((it) => it._id === id)
            dispatch(fetchProductDetails(id))
            setcartIdQuantity(quantityCart?.quantity)
        }
    }, [id, cart]);


    return (
        <>
            {/* {loading && <Loading />} */}
            <Header />
            <div className="font-sans w-full md:w-[90%] m-auto tracking-wide max-md:mx-auto my-10">
                <div className="bg-gradient-to-r bg-[#e3e8eb]  grid items-start grid-cols-1 lg:grid-cols-5 md:grid-cols-2">
                    <div className="lg:col-span-3 h-full p-8">
                        <div className="relative h-full flex items-center justify-center lg:min-h-[580px]">
                            <img
                                src={`${import.meta.env.VITE_SOME_URL}/Uploads/${Product?.image}`}
                                alt="Product"
                                className="lg:w-3/5 w-3/4 h-full object-contain max-lg:p-8"
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-gray-100 py-6 px-8 h-full">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{Product?.title}</h2>
                            <div className="flex mt-7">
                                <Rating sx={{ fontSize: '35px' }} name="size-large" value={Product?.rating || 0} readOnly />
                            </div>
                        </div>
                        <div className="mt-8 ">
                            <h3 className="text-lg font-bold text-gray-800">Price</h3>
                            <p className="text-gray-800 text-3xl font-bold mt-4">${Product?.price}</p>
                        </div>
                        <div className="mt-8 ">
                            <h3 className="text-lg font-bold text-gray-800">Total Price</h3>
                            <p className="text-gray-800 text-3xl font-bold mt-4">${Product?.price * cartIdQuantity || 0}</p>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-gray-800">Quantity</h3>
                            <div className="flex divide-x border w-max mt-4 rounded overflow-hidden">
                                <button
                                    onClick={() => {
                                        HandleRemoveToCart(Product)
                                    }}
                                    type="button"
                                    className="bg-gray-100 w-10 h-9 font-semibold flex items-center justify-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3 fill-current inline"
                                        viewBox="0 0 124 124"
                                    >
                                        <path
                                            d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </button>
                                <p
                                    className="bg-transparent w-10 h-9 font-semibold flex items-center justify-center text-gray-800 text-lg"
                                >
                                    {cartIdQuantity || 0}
                                </p>
                                <button
                                    onClick={() => {
                                        HandleSendData(Product)
                                    }}
                                    type="button"
                                    className="bg-gray-800 text-white w-10 h-9 font-semibold flex items-center justify-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3 fill-current inline"
                                        viewBox="0 0 42 42"
                                    >
                                        <path
                                            d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link to="/cart"
                                className="min-w-[200px] text-center px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded"
                            >
                                Check out
                            </Link>
                            <button
                                onClick={() => {
                                    HandleSendData(Product)
                                }}
                                type="button"
                                className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                            >
                                Add to cart
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center text-sm text-gray-800 mt-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-current w-6 mr-3"
                                viewBox="0 0 48 48"
                            >
                                <path d="M15.5 33.3h19.1v2H15.5z" data-original="#000000" />
                                <path
                                    d="M45.2 35.3H43v-2h2.2c.4 0 .8-.4.8-.8v-9.1c0-.4-.3-.6-.5-.7l-3.2-1.3c-.3-.2-.8-.5-1.1-1l-6.5-10c-.1-.2-.4-.3-.7-.3H2.8c-.4 0-.8.4-.8.8v21.6c0 .4.4.8.8.8h3.9v2H2.8C1.3 35.3 0 34 0 32.5V10.9c0-1.5 1.3-2.8 2.8-2.8h31.3c1 0 1.9.5 2.4 1.3l6.5 10 .4.4 2.9 1.2c1.1.5 1.7 1.4 1.7 2.5v9.1c0 1.4-1.3 2.7-2.8 2.7z"
                                    data-original="#000000"
                                />
                                <path
                                    d="M26.5 21H3.9v-9.4h22.6zM5.9 19h18.6v-5.4H5.9zm32.9 2H27.9v-9.4h6.3zm-8.9-2h5.7L33 13.6h-3.1zm-19 20.9c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6zm27.9 9.2c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6z"
                                    data-original="#000000"
                                />
                            </svg>
                            Free delivery on order $100
                        </div>
                    </div>
                </div>
                <div className="mt-8 max-w-2xl px-6">
                    <h3 className="text-lg font-bold text-gray-800">Smartwatch Features</h3>
                    <ul className="grid sm:grid-cols-2 gap-3 mt-4">
                        <li className="flex items-center text-sm text-gray-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={17}
                                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                    data-original="#000000"
                                />
                            </svg>
                            Fitness Tracking
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={17}
                                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                    data-original="#000000"
                                />
                            </svg>
                            Heart Rate Monitoring
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={17}
                                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                    data-original="#000000"
                                />
                            </svg>
                            Sleep Tracking
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={17}
                                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                    data-original="#000000"
                                />
                            </svg>
                            Waterproof Design
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={17}
                                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                    data-original="#000000"
                                />
                            </svg>
                            Notifications
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={17}
                                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                    data-original="#000000"
                                />
                            </svg>
                            Touchscreen Interface
                        </li>
                    </ul>
                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-gray-800">Product Description</h3>
                        <p className="text-sm text-gray-600 mt-4">
                            Enhance your daily routine with our advanced smartwatch. Featuring
                            fitness tracking capabilities, heart rate monitoring, sleep tracking,
                            and a waterproof design, this smartwatch is designed to keep up with
                            your active lifestyle. Receive notifications and stay connected with its
                            touchscreen interface, offering convenience at your fingertips. Upgrade
                            to a smarter way of living with this essential accessory.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DetailsProduct;
