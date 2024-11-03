import React, { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../features/ProductSlice';
import { AddToCart, fetchCartProduct } from '../../../features/CartSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';


const SellingProducts = () => {
    const { products } = useSelector((state) => state.Product)
    const { user } = useSelector((state) => state.user)
    const [filterData, setFilterData] = useState([])
    const [loaderSpinner, setLoaderSpinner] = useState(null)
    const dispatch = useDispatch()


    // Handle Send Data
    const HandleSendData = async (item) => {
        setLoaderSpinner(item._id)
        await dispatch(AddToCart({ userId: user?.user?._id, item }));
        dispatch(fetchCartProduct({ userId: user?.user?._id }));
        setLoaderSpinner(null);
    };

    // UseEffects
    useEffect(() => {
        const data = products.filter((it) => {
            return it.category === 'vegetables'
        })
        setFilterData(data)
    }, [products])


    // fetch products
    useEffect(() => {
        dispatch(fetchProducts())
    }, [])



    return (
        <>
            <div className=" p-5">
                <div className="title flex items-center justify-between w-full">
                    <h2 className='text-sm md:text-3xl font-bold uppercase'>Vegetable products</h2>
                    <Link to={`/category/vegetables`} className='md:text-lg hover:text-black font-bold text-light'>View All Categories <ArrowForwardIcon /></Link>
                </div>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        150: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        540: {
                            slidesPerView: 2,
                        },
                        700: {
                            slidesPerView: 3,
                        },
                        992: {
                            slidesPerView: 4,
                            spaceBetween: 15
                        },
                        1240: {
                            slidesPerView: 5,
                            spaceBetween: 30
                        },
                    }}
                    modules={[FreeMode, Autoplay, Pagination]}
                    className="mySwiper h-full flex py-5 items-center justify-center"
                >
                    {filterData?.map((it) => {
                        return (
                            <SwiperSlide key={it._id} className='m-auto  flex items-center justify-center w-full'>
                                <div className="product pt-5 px-5 pb-3 bg-white rounded-lg hover:shadow-xl">
                                    <div className="flex bg-[#f9f9f9]  rounded-lg">
                                        <img  loading='lazy' className='w-full' src={`${import.meta.env.VITE_SOME_URL}/Uploads/${it.image}`} alt="" />
                                    </div>
                                    <h4 className="mt-2 text-2xl font-medium my-2 h-16">{it.title}</h4>
                                    <p className="text-gray-500 text-xs flex items-center justify-between">
                                        <span>
                                            <Rating name="read-only" value={it.rating} readOnly />
                                        </span>
                                        <span className='text-sm'>{it.count} Unit</span>
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500 text-lg font-bold my-2 ">${it.price}</p>
                                        <div className="flex items-center gap-5">
                                            <Link to={`/product/details/${it._id}`} className=" text-light hover:text-black">
                                                <VisibilityIcon sx={{ fontSize: '30px' }} />
                                            </Link>
                                            {loaderSpinner === it._id ? (
                                                <div className="flex items-center justify-center w-[100px]">
                                                    <svg  loading='lazy' xmlns="http://www.w3.org/2000/svg" className="w-8 m-auto animate-spin fill-yellow  block mx-auto" viewBox="0 0 24 24">
                                                        <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <button onClick={() => HandleSendData(it)} className="flex-shrink-0 h-8 hover:text-light text-white w-[100px] bg-yellow rounded-lg text-sm">
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </>
    );
}

export default React.memo(SellingProducts)
