import React, { useState, useEffect, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffers } from '../../../features/BannersSlice';

const AlertOffer = () => {
    const [showAlert, setShowAlert] = useState('hidden');
    const { offers, loading } = useSelector((state) => state.offers);
    const dispatch = useDispatch();

    // Handle Copy Code Offer
    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            toast.success('Copy Code Success', {
                position: 'bottom-center',
                autoClose: 2000,
            });
        });
    };

    useEffect(() => {
        const lastShownTime = localStorage.getItem('alertLastShown');
        const oneHour = 60 * 60 * 1000;

        const fetchData = async () => {
            await dispatch(fetchOffers());
            if (!lastShownTime || Date.now() - lastShownTime > oneHour) {

                const show = setTimeout(() => {
                    setShowAlert(true);
                }, 5000);

                const hide = setTimeout(() => {
                    setShowAlert('hidden');
                    localStorage.setItem('alertLastShown', Date.now());
                }, 20000);

                return () => {
                    clearTimeout(show);
                    clearTimeout(hide);
                }
            }
        };

        fetchData();
    }, [dispatch]);

    const handleClose = useCallback(() => {
        setShowAlert('hidden');
        localStorage.setItem('alertLastShown', Date.now());
    }, []);


    if (!loading && offers.length > 0) {
        return (
            <div className={`flex ${showAlert} fixed items-center justify-center z-[10000] left-0 top-0 w-full h-screen bg-[#000000c2]`}>
                <div className="z-[10000]">
                    <div className="flex flex-col  relative bg-slate-200 h-[550px] w-[350px] md:w-[450px] rounded-3xl">
                        <div
                            onClick={handleClose}
                            className="icon absolute bg-yellow rounded-ss-3xl w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
                        >
                            <CloseIcon className='text-white' sx={{ fontSize: '40px' }} />
                        </div>
                        <div className="flex flex-col mt-20 gap-6">
                            <Link to="/" className="shrink-0 flex items-center justify-center">
                                <img
                                    src="https://themewagon.github.io/FoodMart/images/logo.png"
                                    alt="logo"
                                    className="md:w-[190px] w-36"
                                />
                            </Link>
                            <h2 className='text-center mt-5 font-bold text-yellow text-2xl md:text-4xl'>Discounts up to 30%</h2>
                            <div className="flex flex-col items-center gap-20 mt-10">
                                {offers.slice(0, 2).map((offer, index) => (
                                    <p key={index} className='flex gap-3'>
                                        <span className='text-2xl md:text-3xl font-bold'>{offer.code}</span>
                                        <button onClick={() => handleCopyCode(offer.code)} className='text-yellow'>
                                            <ContentCopyIcon sx={{ marginLeft: '20px', fontSize: '30px' }} />
                                        </button>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default React.memo(AlertOffer);
