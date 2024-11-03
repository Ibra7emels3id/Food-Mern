import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartPayment } from '../../features/CartPaymentSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Paper, Rating, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import Loading from '../../Components/Loading';


const Transactions = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [stateDetails, setStateDetails] = useState('hidden')
    const [StateDetailsId, setStateDetailsId] = useState(null);
    const { cartPayment } = useSelector((state) => state.cartPay);
    const { user, sLoading } = useSelector((state) => state.user);
    const sortedCartPayment = Array.isArray(cartPayment)
        ? [...cartPayment].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

    // hANDLE state details
    const handleStateDetails = (id) => {
        if (StateDetailsId === id) {
            setStateDetailsId(null);
        } else {
            setStateDetailsId(id);
        }
        setStateDetails('flex');
    };


    // UseEffect
    useEffect(() => {
        dispatch(fetchCartPayment())
    }, [])


    // Check if user is logged in or not
    if (!sLoading && !user?.user) {
        Navigate('/');
    }



    // Loading
    if (sLoading) {
        return <Loading />
    };


    return (
        <>
            <Header />
            <div className="flex flex-col overflow-auto">
                <div className="title mt-10 mx-4 ">
                    <span className="flex items-center">
                        <span className="pr-6 text-2xl">Orders</span>
                        <span className="h-px flex-1 bg-black"></span>
                    </span>
                </div>
                <div className="table w-full px-3 ">
                    {sortedCartPayment?.length > 0 ? <div className="flex  flex-col gap-5 my-10">
                        {sortedCartPayment.map((item) => {
                            return (
                                <div key={item._id} className="border min-w-[1200px]  border-yellow md:w-[90%] m-auto p-4">
                                    <div className=" flex  justify-between m-auto w-full items-center">
                                        <div className="flex flex-col gap-3">
                                            <span className="text-sm font-bold">Order ID: {item?.paymentId?.slice(0, 15)}...</span>
                                            <p className="text-sm font-bold flex items-center justify-center">Payment Method: <span className='bg-green-600 ml-2 flex items-center justify-center text-white w-[50px] h-6 rounded-3xl'>Paid</span> </p>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <span className="text-sm font-bold">Currency: {item.currency}</span>
                                            <span className="text-sm font-bold">Total Amount: {item.subTotal}</span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <span className="text-sm font-bold">Quantity: {item?.items?.length}</span>
                                            <span className="text-sm font-bold">Order Date: {item.createdAt}</span>
                                        </div>
                                        <div className="flex  gap-3">
                                            <p className="text-sm flex items-center font-bold">Status: <span className={`${item.status.toLowerCase() === 'pending' && 'bg-yellow'} ${item.status.toLowerCase() === 'out for delivery' && 'bg-lime-900'} ${item.status.toLowerCase() === 'complete' && 'bg-green-600'} ${item.status === 'pending' && 'bg-yellow'} w-[130px] ml-2 text-white rounded-3xl h-8 flex items-center justify-center`}>{item.status}</span></p>
                                        </div>
                                        <div className="flex flex-col  items-center justify-center px-2 gap-3">
                                            <button onClick={() => {
                                                handleStateDetails(item._id)
                                            }} className='border border-black font-normal text-xl w-[150px] rounded-xl hover:bg-black hover:text-white h-10'>{StateDetailsId ? 'Hide Details' : 'Details'}</button>
                                        </div>
                                    </div>
                                    <div className={`${StateDetailsId == item._id ? 'flex' : 'hidden'}  transform transition duration-1000 ease flex-col mt-12 border-t-2 p-3`}>
                                        <h2 className='font-bold my-4 text-2xl'>Order Items</h2>
                                        {item.items.map((it) => {
                                            return (
                                                <div key={it._id} className="flex items-center justify-between w-full my-2 p-3 border-y-2">
                                                    <div className="flex gap-3">
                                                        <img className='w-[130px] h-[130px]' src={`${import.meta.env.VITE_SOME_URL}/Uploads/${it.image}`} alt={it.title} />
                                                    </div>
                                                    <div className="flex flex-col gap-3">
                                                        <p className="text-sm font-bold">Customer Name: {it.title}</p>
                                                        <p className="text-sm font-bold">Quantity: {it.quantity}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-3">
                                                        <p className="text-sm font-bold">Price: {it.price}$</p>
                                                    </div>
                                                    <div className="flex gap-3 px-4">
                                                        <p className="text-sm font-bold">SubTotal: {it.quantity * it.price}$</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div> :
                        <div className='flex flex-col my-10'>
                            <h3 className="text-center text-xl font-bold">Not Order Payment </h3>
                            <Link to={'/shop'} className='text-center'>Order Now</Link>
                        </div>}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Transactions;
