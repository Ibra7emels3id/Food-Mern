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
    const [loading, setLoading] = React.useState(true);
    const { category, isLoading } = useSelector((state) => state.category)
    const { payments  } = useSelector((state) => state.payments);
    const { user , sLoading } = useSelector((state) => state.user)
    const [open, setOpen] = React.useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState('');
    const [deleteCategoryName, setDeleteCategoryName] = useState('');

    const sortedCartPayment = Array.isArray(payments)
        ? [...payments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];


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
                                                        {it?.status === 'pending' ? (
                                                            <p><button onClick={() => handleConfirmOrder(it._id)} className=' w-[150px] bg-red-500 hover:bg-red-700 text-white h-12 px-6 rounded-x'>out for delivery</button></p>
                                                        ) : it?.status === 'out for delivery' ? (
                                                            <p><button onClick={() => handleConfirmOrder(it._id)} className='bg-blue-500 w-[150px] text-white h-12 px-6 hover:bg-blue-400'>Confirm Order</button></p>
                                                        ) : <p className='text-green-500'>{it?.status}</p>}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div> :
                                <div className='flex flex-col my-10'>
                                    <h3 className="text-center text-xl font-bold">Not Order Payment </h3>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Dialog open={open} handleClose={handleClose} deleteCategoryId={deleteCategoryId} deleteCategoryName={deleteCategoryName} /> */}
        </>
    );
}

export default Order;
