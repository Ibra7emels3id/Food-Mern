import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { AddToCart, fetchCartProduct, RemoveCartItem, RemoveFromCart } from '../../features/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffers } from '../../features/BannersSlice';

const Cart = () => {
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    const cartProducts = useSelector(state => state.cart);
    const {offers} = useSelector((state) => state.offers)
    const User = useSelector(state => state.user);
    const user = User?.user?.user
    const [ setLoaderSpinner] = useState(null)
    const [discount, setDiscount] = useState(null)
    const [PromoCode, setPromoCode] = useState(null)
    const [valueCode, setValueCode] = useState(null)

    // Handle Discount Promo Code 
    const HandleCodeDiscount = () => {
        let found = offers?.find(code => code?.code === PromoCode);
        setValueCode(found?.discount)
        if (found) {
            let discountAmount = (found?.discount / 100) * discount;
            let newTotal = discount - discountAmount;
            setDiscount(newTotal);
        } else {
            setDiscount(cartProducts?.cart?.totalPrice);
        }
    }



    // Handle Add to Cart
    const HandleAddToCart = async (item) => {
        setLoaderSpinner(item._id)
        await dispatch(AddToCart({ item }));
        dispatch(fetchCartProduct());
        setLoaderSpinner(null);
    };

    // Handle Remove To Cart
    const HandleRemoveToCart = async (item) => {
        setLoaderSpinner(item._id)
        await dispatch(RemoveFromCart({ item }));
        dispatch(fetchCartProduct());
        setLoaderSpinner(null);
    };

    // Handle Dalete Item
    const handleDaleteItem = async (item) => {
        setLoaderSpinner(item._id)
        dispatch(RemoveCartItem({ item }));
        setLoaderSpinner(null);
        dispatch(fetchCartProduct());
        window.location.reload();
    };


    const ItemCart = cartProducts?.cart?.cart?.items?.map((it) => {
        return (
            <div key={it._id} className="grid grid-cols-3 items-center gap-4">
                <div className="col-span-2 flex items-center gap-4">
                    <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                        <img
                            loading='lazy'
                            src={it.image}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-800">
                            {it.title}
                        </h3>
                        <button onClick={() => {
                            handleDaleteItem(it)
                        }} className="text-xs text-red-500 cursor-pointer mt-0.5">
                            Remove
                        </button>
                        <div className="flex gap-4 mt-4">

                            <div>
                                <div
                                    className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                                >
                                    <button onClick={() => {
                                        HandleRemoveToCart(it)
                                    }} className=' hover:text-yellow'>
                                        <svg
                                            loading='lazy'
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-2.5 fill-current"
                                            viewBox="0 0 124 124"
                                        >
                                            <path
                                                d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </button>
                                    <span className="mx-2.5">{it.quantity}</span>
                                    <button onClick={() => {
                                        HandleAddToCart(it)
                                    }} className=' hover:text-yellow'>
                                        <svg
                                            loading='lazy'
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-2.5 fill-current"
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
                        </div>
                    </div>
                </div>
                <div className="ml-auto">
                    <h4 className="text-base font-bold text-gray-800">${it.price}</h4>
                    <p>${it.price * it.quantity}</p>
                </div>
            </div >
        )
    })



    // useEffect
    useEffect(() => {
        dispatch(fetchCartProduct());
        dispatch(fetchOffers())
    }, [dispatch]);


    useEffect(() => {
        if (cartProducts?.cart) {
            setDiscount(cartProducts?.cart?.totalPrice)
        }
    }, [cartProducts?.cart])
    

    return (
        <>
            <Header />
            {user ? cartProducts?.cart?.cart?.items.length > 0 ? <div className="font-sans md:max-w-6xl max-md:max-w-xl mx-auto bg-white my-10 py-4 px-4">
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
                        <h2 className="text-2xl font-bold text-gray-800">To Cart</h2>
                        <hr className="border-gray-300 mt-4 mb-8" />
                        <div className="space-y-4">
                            {ItemCart}
                        </div>
                    </div>
                    <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
                        <div className="flex border border-yellow overflow-hidden rounded-md">
                            <input
                                onChange={(e) => {
                                    setPromoCode(e.target.value)
                                }}
                                type="text"
                                placeholder="Promo code Discount"
                                className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
                            />
                            <button
                                onClick={HandleCodeDiscount}
                                type="button"
                                className="flex items-center justify-center font-semibold tracking-wide bg-yellow hover:bg-[#dabe45] px-4 text-sm text-white"
                            >
                                Apply
                            </button>
                        </div>
                        <ul className="text-gray-800 mt-8 space-y-4">
                            <li className="flex flex-wrap gap-4 text-base">
                                Discount <span className="ml-auto font-bold">%{valueCode || 0}</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-base">
                                Shipping <span className="ml-auto font-bold">${cartProducts?.cart?.totalPrice}</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-base">
                                Tax <span className="ml-auto font-bold">$4.00</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-base font-bold">
                                Total <span className="ml-auto">${discount + 4}</span>
                            </li>
                        </ul>
                        <div className="mt-8 space-y-2">
                            <button
                                onClick={() => {
                                    Navigate(`/cart/checkout/${discount + 4}/discount/${valueCode || 0}/tex/${3}`)
                                }}
                                type="button"
                                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-yellow hover:bg-[#cfa33c] text-white rounded-md"
                            >
                                Checkout
                            </button>
                            <button
                                onClick={() => {
                                    Navigate('/shop')
                                }}
                                type="button"
                                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div> : <Link className='my-40 flex items-center justify-center w-36 m-auto bg-yellow h-12 text-white' to={'/shop'} >Shoping Please</Link> : <Link className='my-40 flex items-center justify-center w-36 m-auto bg-red-600 h-12 text-white' to={'/login'} >Login Please</Link>}
            <Footer />
        </>
    );
}

export default Cart;
