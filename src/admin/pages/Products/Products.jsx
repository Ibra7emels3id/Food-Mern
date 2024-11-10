import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../features/ProductSlice';
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import {  Paper, Rating, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import DialogDelProduct from './_components/DialogDelProduct';
import Loading from '../../../Components/Loading';



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

const Products = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.Product)
    const sortProduct = Array.isArray(products)
    ? [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];
    const { user , sLoading } = useSelector((state) => state.user)
    const [open, setOpen] = React.useState(false);
    const [deleteproductId, setDeleteProductId] = useState(null);
    const [DeleteProductName, setDeleteProductName] = useState(null);


    // Handle Delete product 
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // Check User
    if (!sLoading) {
        if (user?.role !== 'admin') {
            Navigate('/');
        }
    }


    useEffect(() => {
        dispatch(fetchProducts())
    }, [ Navigate, dispatch]);

    if (sLoading) return <Loading />;

    

    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full overflow-auto ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[100%] m-auto">
                        <h2 className="text-2xl font-bold text-center mb-4">All Products</h2>
                        <div className="btn flex flex-wrap justify-around my-3 gap-3">
                            <button onClick={() => {
                                Navigate('/admin/products/addproduct')
                            }} className=' bg-yellow w-full h-10 hover:bg-[#e4be42]'>Add product</button>
                        </div>
                        {sortProduct?.length > 0 ? <div className="flex w-full my-10">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 900 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell width={200} align="center">Image</StyledTableCell>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Description</StyledTableCell>
                                            <StyledTableCell align="center">Category</StyledTableCell>
                                            <StyledTableCell align="center">Price</StyledTableCell>
                                            <StyledTableCell align="center">Rating</StyledTableCell>
                                            <StyledTableCell align="center">Update</StyledTableCell>
                                            <StyledTableCell align="center">Delete</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((it) => (
                                            <StyledTableRow key={it._id}>
                                                <StyledTableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} component="th" scope="row">
                                                    {/* <img className='w-52' src={`${import.meta.env.VITE_SOME_URL}/Uploads/${it.image}`} alt="" /> */}
                                                    <img className='w-52' src={it.image} alt={it.title} />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{it.title}</StyledTableCell>
                                                <StyledTableCell align="center">{it?.description?.slice(0, 50)}...</StyledTableCell>
                                                <StyledTableCell align="center">{it.category}</StyledTableCell>
                                                <StyledTableCell align="center">${it.price}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Rating name="read-only" value={it?.rating} readOnly />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <button onClick={() => {
                                                        Navigate(`/admin/product/edit-product/${it._id}`)
                                                    }} className='bg-green-700 text-white font-semibold hover:bg-green-800 px-5 h-10'>Update</button>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <button onClick={() => {
                                                        handleClickOpen()
                                                        setDeleteProductId(it._id)
                                                        setDeleteProductName(it.title)
                                                    }} className='bg-red-700 text-white font-semibold hover:bg-red-800 px-5 h-10'>Delete</button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div> :
                            <div className='flex flex-col my-10'>
                                <h3 className="text-center text-xl font-bold">No Product Found</h3>
                                <Link className='text-red-600 my-5 text-center bg-slate-400 py-2' to={'/admin/products/addproduct'}>Add To product</Link>
                            </div>}
                    </div>
                </div>
            </div>
            <DialogDelProduct open={open} handleClose={handleClose} deleteproductId={deleteproductId} DeleteProductName={DeleteProductName} />
        </>
    );
}

export default Products;
