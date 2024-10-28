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
import Dialog from './_components/ShowDialog';

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

const Category = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true);
    const { category, isLoading } = useSelector((state) => state.category)
    const { user } = useSelector((state) => state.user)
    const [open, setOpen] = React.useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState('');
    const [deleteCategoryName, setDeleteCategoryName] = useState('');


    // Handle Delete Category 
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // USe Effect 
    useEffect(() => {
        const handleUser = async () => {
            if (user) {
                if (user.role !== 'admin') {
                    Navigate('/');
                } else {
                    setLoading(false);
                }
            }
        };
        handleUser();
        dispatch(FetchCategory())
    }, [user, Navigate, dispatch]);

    if (loading) return <Loading />;

    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full overflow-auto ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[100%] m-auto">
                        <h2 className="text-2xl font-bold text-center mb-4">All Category</h2>
                        <div className="btn flex flex-wrap justify-around my-3 gap-3">
                            <button onClick={() => {
                                Navigate('/admin/category/add-category')
                            }} className=' bg-yellow w-[200px] h-10 hover:bg-[#e4be42]'>Add Category</button>
                            <button className=' bg-yellow w-[200px] h-10 hover:bg-[#e4be42]'>Add Category</button>
                            <button className=' bg-yellow w-[200px] h-10 hover:bg-[#e4be42]'>Add Category</button>
                        </div>
                        {category.length > 0 ? <div className="flex w-full my-10">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell width={300} align="center">image</StyledTableCell>
                                            <StyledTableCell align="center">Category</StyledTableCell>
                                            <StyledTableCell align="center">Update</StyledTableCell>
                                            <StyledTableCell align="center">Delete</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {category.map((it) => (
                                            <StyledTableRow key={it._id}>
                                                <StyledTableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} component="th" scope="row">
                                                    <img className='w-52' src={`${import.meta.env.VITE_SOME_URL}/Uploads/${it.image}`} alt="" />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{it.category}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <button onClick={() => {
                                                        Navigate(`/admin/category/edit-category/${it._id}`)
                                                    }} className='bg-green-700 text-white font-semibold hover:bg-green-800 px-5 h-10'>Update</button>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <button onClick={() => {
                                                        handleClickOpen()
                                                        setDeleteCategoryId(it._id)
                                                        setDeleteCategoryName(it.category)
                                                    }} className='bg-red-700 text-white font-semibold hover:bg-red-800 px-5 h-10'>Delete</button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div> :
                            <div className='flex flex-col my-10'>
                                <h3 className="text-center text-xl font-bold">No Category Found</h3>
                                <Link className='text-red-600 my-5 text-center bg-slate-400 py-2' to={'/admin/category/add-category'}>Add To Category</Link>
                            </div>}
                    </div>
                </div>
            </div>
            <Dialog open={open} handleClose={handleClose} deleteCategoryId={deleteCategoryId} deleteCategoryName={deleteCategoryName} />
        </>
    );
}

export default Category;
