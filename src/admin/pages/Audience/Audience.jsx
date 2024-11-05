import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../features/ProductSlice';
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Paper, Rating, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
// import DialogDelProduct from './_components/DialogDelProduct';
import Loading from '../../../Components/Loading';
import { blockUser, getAllUsers } from '../../../features/UserSlice';
import DialogDelUser from './_components/DialogDelUser';



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

const Audience = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch()
    const { user, sLoading } = useSelector((state) => state.user)
    const [open, setOpen] = React.useState(false);
    const [deleteUserId, setdeleteUserId] = useState(null);
    const [DeleteUserName, setDeleteUserName] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const { allUsers } = useSelector((state) => state.allUsers)



    // Handle Delete product 
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // HAndle Block User
    const handleBlockUser = async (id) => {
        await dispatch(blockUser(id));
        dispatch(getAllUsers())
    };

    // Check User
    if (!sLoading) {
        if (user?.role !== 'admin') {
            Navigate('/');
        }
    }



    // Use Effect 
    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(getAllUsers())
    }, [Navigate, dispatch, searchTerm]);



    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full overflow-auto ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[100%] m-auto">
                        <div className="btn flex flex-wrap items-center justify-between my-3 gap-3">
                            <h2 className="text-2xl font-bold text-center">All Users</h2>
                            <input className='h-10 border outline-none focus:outline-none px-2 w-72' onChange={(e) => {
                                setSearchTerm(e.target.value)
                            }} placeholder='search email or name ' type="search" name="email" id="email" />
                        </div>
                        {allUsers.length > 0 ? <div className="flex w-full my-10">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 900 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell width={200} align="center">Image</StyledTableCell>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">email</StyledTableCell>
                                            <StyledTableCell align="center">Update</StyledTableCell>
                                            <StyledTableCell align="center">Delete</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(searchTerm ?
                                            allUsers.filter((it) => it?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) || it?.email?.toLowerCase().includes(searchTerm?.toLowerCase()))
                                            : allUsers
                                        ).map((it) => (
                                            <StyledTableRow key={it._id}>
                                                <StyledTableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} component="th" scope="row">
                                                    <img className='w-52' src={it.image} alt="" />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{it.name}</StyledTableCell>
                                                <StyledTableCell align="center">{it.email}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <button onClick={() => {
                                                        handleBlockUser(it._id)
                                                    }} className={`bg-green-700 w-[100px] ${it?.isBlock === true ? 'bg-black text-white' : 'bg-yellow text-white'} text-white font-semibold px-5 h-10`}>{it?.isBlock === true ? 'Unblock' : 'Block'}</button>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <button onClick={() => {
                                                        handleClickOpen()
                                                        setdeleteUserId(it._id)
                                                        setDeleteUserName(it.name)
                                                    }} className='bg-red-700 text-white font-semibold hover:bg-red-800 px-5 h-10'>Delete</button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div> : <Loading />}
                    </div>
                </div>
            </div>
            <DialogDelUser open={open} handleClose={handleClose} deleteUserId={deleteUserId} DeleteUserName={DeleteUserName} />
        </>
    );
}

export default Audience;
