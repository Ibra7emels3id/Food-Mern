import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../features/ProductSlice';
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../Components/Loading'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FetchCategory } from '../../../features/CategorySlice';
import { confirmOrderPayment, getAllPayments } from '../../../features/CartPaymentSlice';
import ShowDialog from './_Components/Dialog';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Order = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch()
    const { payments } = useSelector((state) => state.payments);
    const { user, sLoading } = useSelector((state) => state.user)
    const [open, setOpen] = React.useState(false);
    const [deleteOrderId, setDeleteOrderId] = useState('');
    const [StateDetailsId, setStateDetailsId] = useState(null);
    const sortedCartPayment = Array.isArray(payments)
        ? [...payments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

    // hANDLE state details
    const handleStateDetails = (id) => {
        if (StateDetailsId === id) {
            setStateDetailsId(null);
        } else {
            setStateDetailsId(id);
        }
        setStateDetailsId('flex');
    };



    // Handle Delete Category 
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Handle Confirm Order
    const handleConfirmOrder = async (id) => {
        await dispatch(confirmOrderPayment(id));
        dispatch(getAllPayments());
    }

    // Check User
    if (!sLoading) {
        if (user?.role !== 'admin') {
            Navigate('/');
        }
    }


    // USe Effect 
    useEffect(() => {
        dispatch(FetchCategory())
        dispatch(getAllPayments());
    }, [user, Navigate, dispatch]);

    if (sLoading) {
        return <Loading />;
    }

    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full overflow-auto ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[100%] m-auto">
                        <span className="flex items-center">
                            <span className="pr-6 text-2xl">All Order Payment</span>
                            <span className="h-px flex-1 bg-black"></span>
                        </span>
                        <div className="table w-full px-3">
                            {sortedCartPayment?.length > 0 ? <div className="flex flex-col gap-4 w-full my-10">
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
                                                <div className="flex flex-col  items-center justify-center px-2 gap-3">
                                                    <button onClick={() => {
                                                        handleStateDetails(item._id)
                                                    }} className='border border-black font-normal text-xl w-[150px] rounded-xl hover:bg-black hover:text-white h-10'>{StateDetailsId ? 'Hide Details' : 'Details'}</button>
                                                </div>
                                                <div className="flex flex-col  items-center justify-center px-2 gap-3">
                                                    {item?.status === 'pending' ? (
                                                        <p><button onClick={() => handleConfirmOrder(item._id)} className=' w-[170px] bg-red-500 hover:bg-red-700 text-white h-12 px-6 rounded-xl'>out for delivery</button></p>
                                                    ) : item?.status === 'out for delivery' ? (
                                                        <p><button onClick={() => handleConfirmOrder(item._id)} className='bg-blue-500 w-[150px] text-white h-12 px-6 hover:bg-blue-400  rounded-xl'>Confirm Order</button></p>
                                                    ) : <p className='text-green-500 w-[150px] flex items-center justify-center'>{item?.status}</p>}
                                                </div>
                                                <div className="flex  gap-3">
                                                    <button onClick={()=>{
                                                        handleClickOpen()
                                                        setDeleteOrderId(item._id)
                                                    }} className="text-sm flex justify-center text-white flex-col items-center font-bold w-[90px] h-10  bg-red-400">Delete</button>
                                                </div>
                                            </div>
                                            <div className={`${StateDetailsId == item._id ? 'flex' : 'hidden'}  transform transition duration-1000 ease flex-col mt-12 border-t-2 p-3`}>
                                                <h2 className='font-bold my-4 text-2xl'>Order Items</h2>
                                                {item.items.map((it) => {
                                                    return (
                                                        <div key={it._id} className="flex items-center justify-between w-full my-2 p-3 border-y-2">
                                                            <div className="flex gap-3">
                                                                <img loading='lazy' className='w-[130px] h-[130px]' src={it.image} alt={it.title} />
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
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
            <ShowDialog open={open} handleClose={handleClose} deleteOrderId={deleteOrderId} />
        </>
    );
}

export default Order;
