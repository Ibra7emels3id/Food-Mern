import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import img from "../../../assets/images/icon-bread-baguette.png"
import { useDispatch, useSelector } from 'react-redux';
import { FetchCategory } from '../../../features/CategorySlice';


const Category = () => {
    const dispatch = useDispatch()
    const { category } = useSelector((state) => state.category)


    // UseEffects 
    useEffect(() => {
        dispatch(FetchCategory())
    }, [])

    return (
        <>
            <div className='h-[400px]'>
                <h1 className='mx-12 my-12 font-bold text-3xl'>Category </h1>
                <div className="h-[300px] w-[95%] m-auto  flex items-center">
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
                        className="mySwiper h-full flex items-center justify-center"
                    >
                        {category?.map((it) => {
                            return (
                                <SwiperSlide key={it._id} className='m-auto  hover:-translate-y-2 transition-transform ease-in-out duration-300  shadow-[0px_5px_22px_rgba(0,_0,_0,_0.04)] h-48 hover:shadow-2xl flex items-center justify-center w-full p-4'>
                                    <div className="flex h-full m-auto w-full  flex-col items-center justify-center">
                                        <img className='w-44 m-auto max-h-[150px] bg-cover' loading='lazy' src={`${import.meta.env.VITE_SOME_URL}/Uploads/${it.image}`} alt="Image" />
                                        <h3 className=' text-black mt-3 font-mono font-semibold text-3xl'>{it.category}</h3>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default Category;
