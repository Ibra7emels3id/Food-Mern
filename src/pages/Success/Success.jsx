import { Button, Card, CardContent } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCartPayment } from '../../features/CartPaymentSlice';
import { fetchUser } from '../../features/UserSlice'

const Success = () => {
    const { cartPayment } = useSelector((state) => state.cartPay)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const { id } = useParams()

    const FilterData = cartPayment?.find((it) => it.paymentId === id)

    console.log(FilterData);


    useEffect(() => {
        dispatch(fetchCartPayment())
    }, [])


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 md:p-6">
                <div className="text-center">
                    <div className="flex bg-green-700 h-24 w-24 rounded-full m-auto items-center justify-center">
                        <svg  loading='lazy' xmlns="http://www.w3.org/2000/svg" className="w-16 fill-current text-white" viewBox="0 0 512 512">
                            <ellipse cx="256" cy="256" rx="256" ry="255.832" className="fill-current text-green-700" />
                            <path d="M235.472 392.08L114.432 297.784l34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z" className="fill-current text-white" />
                        </svg>
                    </div>
                    <h1 className="text-3xl my-3 font-bold">Payment successful</h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl md:mx-auto dark:text-gray-400">
                        Your order has been confirmed and is being processed. You will receive an email confirmation shortly.
                    </p>
                </div>
                <Card className="w-full max-w-sm">
                    <CardContent className="p-4">
                        <div className="grid gap-2 text-sm">
                            <div className="flex justify-between">
                                <div>Order number</div>
                                <div className="ml-2 font-medium">#{FilterData?.paymentId}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Date</div>
                                <div className="ml-2 font-medium">{FilterData?.createdAt}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Total</div>
                                <div className="ml-2 font-medium">${FilterData?.subTotal || '0000'}</div>
                            </div>
                        </div>
                    </CardContent>
                    <div className="flex gap-3 p-3 text-center">
                        <Link to="/" className="w-full bg-yellow h-10 flex text-white py-3 justify-center" style={{ height: "inherit" }} prefetch={false}>
                            Home
                        </Link>
                        <Link to="/transactions" className="w-full h-10 py-3 text-white flex bg-green-600  justify-center" style={{ height: "inherit" }} prefetch={false}>
                            Order
                        </Link>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Success;
