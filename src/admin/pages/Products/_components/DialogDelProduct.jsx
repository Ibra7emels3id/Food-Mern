import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import Loading from '../../../../Components/Loading';
import { DeleteProduct, fetchProducts } from '../../../../features/ProductSlice';


const DialogDelProduct = ({ open, handleClose, deleteproductId, DeleteProductName  }) => {
    const dispatch = useDispatch();
    const [loading , setLoading] = useState(null)


    // Handle Delete Category
    const handleDeleteCategory = async () => {
        setLoading(true);
        await dispatch(DeleteProduct({deleteproductId}))
        dispatch(fetchProducts())
        handleClose();
        setLoading(false);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you Delete Product ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText width={500} fontSize={40} id="alert-dialog-description">
                        {DeleteProductName}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0' }}>
                    <button className='bg-red-600 w-full h-10 text-white hover:bg-red-800' onClick={handleClose}>Cancel</button>
                    <button className='bg-yellow w-full h-10 text-white hover:bg-[#ffb93f]' onClick={handleDeleteCategory} autoFocus>
                        Confirm
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DialogDelProduct;
