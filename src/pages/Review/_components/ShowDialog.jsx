import { Rating } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AddReviewClint } from '../../../features/ReviewSlice';



const ShowDialog = ({ open, handleClose }) => {
    const [formDataAll, setFormData] = useState({});
    const { user, sLoading } = useSelector((state) => state?.user)
    const dispatch = useDispatch();

    // Handle Cheng events
    const handleChange = (e) => {
        setFormData({ ...formDataAll, [e.target.name]: e.target.value });
    }

    // Handle Submit Data Reviews
    const HandleSubmitData = async () => {
        // Send data to server
        try {
            const formData = new FormData();
            formData.append('name', formDataAll.name);
            formData.append('email', formDataAll.email);
            formData.append('description', formDataAll.description);
            formData.append('rating', formDataAll.rating);
            formData.append('image', formDataAll.image);

            await dispatch(AddReviewClint({ formData }))
            handleClose()
        } catch (error) {
            console.error('Failed to add review, please try again later.', error);
        }
    }


    // UseEffects
    useEffect(() => {
        if (user?.user) {
            setFormData({ ...formDataAll, name: user?.user?.name, email: user?.user?.email, image: user?.user?.image });
        }
    }, [user?.user])


    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move', fontSize: '30px', margin: '10px 0' }} id="draggable-dialog-title">
                    Add a review about our work
                </DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4 w-full md:w-[500px]">
                        <input value={formDataAll?.name} className='w-full h-12 border p-3 focus:outline-none ' type="text" name="name" id="name" placeholder='Enter Your Name' />
                        <input value={formDataAll?.email} className='w-full h-12 border p-3 focus:outline-none ' type="text" name="email" id="email" placeholder='Enter Your Email' />
                        <textarea onChange={handleChange} className='w-full h-28 border p-3 focus:outline-none ' name="description" id="description" placeholder='Enter Your Description'></textarea>
                        <div className="flex gap-4">
                            <Rating onChange={handleChange} name="rating" defaultValue={formDataAll.rating} />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className="flex w-full my-5 px-10 gap-6">
                        <button className='w-full bg-yellow hover:bg-yellow-500 h-12 text-white' autoFocus onClick={handleClose}>
                            Cancel
                        </button>
                        <button className='w-full h-12 bg-violet-600 hover:bg-violet-800 text-white' onClick={HandleSubmitData}>Confirm</button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ShowDialog;