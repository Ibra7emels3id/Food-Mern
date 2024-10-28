import React, { useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartPayment } from '../../features/CartPaymentSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Paper, Rating, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import Loading from '../../Components/Loading';


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


const Transactions = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { cartPayment } = useSelector((state) => state.cartPay);
    const { user , sLoading } = useSelector((state) => state.user);
    const sortedCartPayment = Array.isArray(cartPayment)
        ? [...cartPayment].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];


    console.log(user?.user);


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

    // if (user?.user) {
        return (
            <>
                <Header />
                <div className="title mt-10 mx-4 ">
                    <span className="flex items-center">
                        <span className="pr-6 text-2xl">Transaction</span>
                        <span className="h-px flex-1 bg-black"></span>
                    </span>
                </div>
                <div className="table w-full px-3">
                    {sortedCartPayment?.length > 0 ? <div className="flex w-full my-10">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 900 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Payment ID</StyledTableCell>
                                        <StyledTableCell align="center">Name</StyledTableCell>
                                        <StyledTableCell align="center">Total</StyledTableCell>
                                        <StyledTableCell align="center">Currency</StyledTableCell>
                                        <StyledTableCell align="center">Product</StyledTableCell>
                                        <StyledTableCell align="center">Date</StyledTableCell>
                                        <StyledTableCell align="center">phone</StyledTableCell>
                                        <StyledTableCell align="center">state</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className='overflow-auto'>
                                    {sortedCartPayment?.map((it) => (
                                        <StyledTableRow key={it._id}>
                                            <StyledTableCell>
                                                #{it?.paymentId?.slice(0, 10)}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{it.name}</StyledTableCell>
                                            <StyledTableCell align="center">${it?.subTotal}</StyledTableCell>
                                            <StyledTableCell align="center">{it?.currency}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {it?.items?.map((e) => {
                                                    return (
                                                        <div key={e._id}>
                                                            <h3>{e.title}</h3>
                                                            <p>{e.quantity}</p>
                                                            <Link to={`/product/details/${e._id}`}>View</Link>
                                                        </div>

                                                    )
                                                })}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{new Date(it?.date).toLocaleDateString()}<br />{it?.time?.toLocaleString()}</StyledTableCell>
                                            <StyledTableCell align="center">{it.phone}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {it.status === 'pending' ? <p className='bg-red-700 text-white h-12 flex items-center justify-center rounded-xl'>{it.status}...</p> : <p className='bg-yellow text-white h-12 flex items-center justify-center rounded-xl'>{it.status}</p>}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div> :
                        <div className='flex flex-col my-10'>
                            <h3 className="text-center text-xl font-bold">Not Order Payment </h3>
                            <Link to={'/shop'}>Order Now</Link>
                        </div>}
                </div>
                <Footer />
            </>
        );
    // }
    // return null;
}

export default Transactions;
