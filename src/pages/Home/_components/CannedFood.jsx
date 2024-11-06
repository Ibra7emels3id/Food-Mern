import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import img from "../../../assets/images/product-thumb-11.jpg"
import img2 from "../../../assets/images/product-thumb-12.jpg"
import img3 from "../../../assets/images/product-thumb-13.jpg"
import img4 from "../../../assets/images/product-thumb-14.jpg"



const CannedFood = () => {
    return (
        <>
            <div className=''>
                <h1 className='mx-12 my-12 font-bold md:text-3xl'>Newly Arrived Brands</h1>
                <div className="h-[200px] w-[95%] m-auto  flex items-center">
                    <Swiper

                        slidesPerView={4}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            reverseDirection: true,
                        }}
                        breakpoints={{
                            300:{
                                slidesPerView: 1,
                                spaceBetween: 0
                            },
                            590: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            750: {
                                slidesPerView: 2,
                                spaceBetween: 50
                            },
                            992: {
                                slidesPerView: 3,
                                spaceBetween: 15
                            },
                            1240: {
                                slidesPerView: 4,
                                spaceBetween: 20
                            },
                        }}
                        modules={[FreeMode, Autoplay, Pagination]}
                        className="mySwiper h-full px-3 flex items-center justify-center"
                    >
                        <SwiperSlide className='m-auto rounded-lg shadow-[0px_5px_22px_rgba(0,_0,_0,_0.04)] h-32 hover:shadow-2xl flex items-center justify-center w-full p-4'>
                            <div className="flex items-center justify-center h-full m-auto w-full">
                                <div className="image">
                                    <img  loading='lazy' className='w-[120px]  h-full' src={img} alt="Image" />
                                </div>
                                <div className="text ml-3">
                                    <h3 className=' font-normal  text-light mt-3 font-mono text-lg'>Amber Jar</h3>
                                    <p className='text-1xl text-zinc-600'>Honey best nectar you wish to get</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='m-auto rounded-lg shadow-[0px_5px_22px_rgba(0,_0,_0,_0.04)] h-32 hover:shadow-2xl flex items-center justify-center w-full p-4'>
                            <div className="flex items-center justify-center h-full m-auto w-full">
                                <div className="image">
                                    <img  loading='lazy' className='w-[120px] h-full' src={img2} alt="Image" />
                                </div>
                                <div className="text ml-3">
                                    <h3 className=' font-normal  text-light mt-3 font-mono text-lg'>Amber Jar</h3>
                                    <p className='text-1xl text-zinc-600'>Honey best nectar you wish to get</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='m-auto rounded-lg shadow-[0px_5px_22px_rgba(0,_0,_0,_0.04)] h-32 hover:shadow-2xl flex items-center justify-center w-full p-4'>
                            <div className="flex items-center justify-center h-full m-auto w-full">
                                <div className="image">
                                    <img  loading='lazy' className='w-[120px] h-full' src={img} alt="Image" />
                                </div>
                                <div className="text ml-3">
                                    <h3 className=' font-normal  text-light mt-3 font-mono text-lg'>Amber Jar</h3>
                                    <p className='text-1xl text-zinc-600'>Honey best nectar you wish to get</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='m-auto rounded-lg shadow-[0px_5px_22px_rgba(0,_0,_0,_0.04)] h-32 hover:shadow-2xl flex items-center justify-center w-full p-4'>
                            <div className="flex items-center justify-center h-full m-auto w-full">
                                <div className="image">
                                    <img  loading='lazy' className='w-[120px] h-full' src={img3} alt="Image" />
                                </div>
                                <div className="text ml-3">
                                    <h3 className=' font-normal  text-light mt-3 font-mono text-lg'>Amber Jar</h3>
                                    <p className='text-1xl text-zinc-600'>Honey best nectar you wish to get</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='m-auto rounded-lg shadow-[0px_5px_22px_rgba(0,_0,_0,_0.04)] h-32 hover:shadow-2xl flex items-center justify-center w-full p-4'>
                            <div className="flex items-center justify-center h-full m-auto w-full">
                                <div className="image">
                                    <img  loading='lazy' className='w-[120px] h-full' src={img4} alt="Image" />
                                </div>
                                <div className="text ml-3">
                                    <h3 className=' font-normal  text-light mt-3 font-mono text-lg'>Amber Jar</h3>
                                    <p className='text-1xl text-zinc-600'>Honey best nectar you wish to get</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default CannedFood;
