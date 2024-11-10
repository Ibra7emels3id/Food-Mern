import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../features/ProductSlice';
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Paper, Rating, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import Loading from '../../../Components/Loading';
import { fetchBanners, fetchOffers } from '../../../features/BannersSlice';
import ShowDialog from './_components/ShowDialog';



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

const Banner = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch()

    const { user, sLoading } = useSelector((state) => state.user)
    const { banners } = useSelector((state) => state.banners)
    const { offers } = useSelector((state) => state.offers);
    const [open, setOpen] = React.useState(false);
    const [deleteOfferId, setDeleteOfferId] = useState(null);



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
        dispatch(fetchBanners())
        dispatch(fetchOffers())
    }, [Navigate, dispatch]);

    if (sLoading) return <Loading />;


    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full overflow-auto ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[100%] m-auto">
                        <h2 className="text-2xl font-bold text-center mb-4">Banner Header</h2>
                        <div className="btn flex flex-wrap justify-around my-3 gap-3">
                            {banners?.length > 0 ? <button onClick={() => {
                                Navigate(`/admin/banner/update-banner/${banners[0]?._id}`)
                            }} className=' bg-yellow w-[250px] h-10 hover:bg-[#e4be42]'>Update banner Header</button> : <button onClick={() => {
                                Navigate('/admin/banner/Addbannerheader')
                            }} className=' bg-yellow w-[250px] h-10 hover:bg-[#e4be42]'>Add banner Header</button>}
                            <button onClick={() => {
                                Navigate('/admin/banner/Offer')
                            }} className=' bg-yellow w-[250px] h-10 hover:bg-[#e4be42]'>Add banner Offer</button>
                            <button onClick={() => {
                                Navigate('/admin/products/addproduct')
                            }} className=' bg-yellow w-[250px] h-10 hover:bg-[#e4be42]'>Add banner Header</button>
                        </div>
                        {banners?.length > 0 ? <div className="flex w-full my-10">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 900 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell width={200} align="center">ImageBig</StyledTableCell>
                                            <StyledTableCell align="center">TitleBit</StyledTableCell>
                                            <StyledTableCell align="center">DescriptionBig</StyledTableCell>
                                            <StyledTableCell width={200} align="center">ImageMedium</StyledTableCell>
                                            <StyledTableCell width={200} align="center">TitleMedium</StyledTableCell>
                                            <StyledTableCell width={200} align="center">DescriptionMedium</StyledTableCell>
                                            <StyledTableCell width={200} align="center">ImageSmall</StyledTableCell>
                                            <StyledTableCell width={200} align="center">TitleSmall</StyledTableCell>
                                            <StyledTableCell width={200} align="center">DescriptionSmall</StyledTableCell>
                                            <StyledTableCell align="center">Update</StyledTableCell>
                                            <StyledTableCell align="center">Delete</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {banners.map((it) => (
                                            <StyledTableRow key={it._id}>
                                                <StyledTableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} component="th" scope="row">
                                                    <img className='w-52' src={it.imageBig} alt={it.title} />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{it.titleBig}</StyledTableCell>
                                                <StyledTableCell align="center">{it.descriptionBig}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <img className='w-52' src={it.imageSmall} alt="" />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{it.titleSmall}</StyledTableCell>
                                                <StyledTableCell align="center">{it.descriptionSmall}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <img className='w-52' src={it.imageMedium} alt="" />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{it.titleMedium}</StyledTableCell>
                                                <StyledTableCell align="center">{it.descriptionMedium}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <button onClick={() => {
                                                        Navigate(`/admin/banner/update-banner/${it?._id}`)
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
                                <h3 className="text-center text-xl font-bold">No Banner Header Found</h3>
                            </div>}
                        {offers?.length > 0 ? <div className="flex w-full my-10">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 900 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell width={200} align="center">Image</StyledTableCell>
                                            <StyledTableCell align="center">Code</StyledTableCell>
                                            <StyledTableCell align="center">Discount</StyledTableCell>
                                            <StyledTableCell align="center">Delete</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {offers.map((it) => (
                                            <StyledTableRow key={it._id}>
                                                <StyledTableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} component="th" scope="row">
                                                    <img className='w-52' src={it.image} alt={it.title} />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{it.code}</StyledTableCell>
                                                <StyledTableCell align="center">{it?.discount}%</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <button onClick={() => {
                                                        handleClickOpen()
                                                        setDeleteOfferId(it._id)
                                                    }} className='bg-red-700 text-white font-semibold hover:bg-red-800 px-5 h-10'>Delete</button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div> :
                            <div className='flex flex-col my-10'>
                                <h3 className="text-center text-xl font-bold">No Banner Header Found</h3>
                            </div>}
                    </div>
                </div>
            </div>
            <ShowDialog open={open} handleClose={handleClose} deleteOfferId={deleteOfferId} />
        </>
    );
}

export default React.memo(Banner);
