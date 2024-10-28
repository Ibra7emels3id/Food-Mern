import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import imgpanana from '../../../assets/images/thumb-bananas.png'
import { Rating } from '@mui/material';


const PopularProducts = () => {
    return (
        <>
            <div className=" p-5">
                <div className="title flex items-center justify-between w-full">
                    <h2 className='text-3xl font-bold'>Best selling products</h2>
                    <Link to={'/shop'} className='text-lg hover:text-black font-bold text-light'>View All Categories <ArrowForwardIcon /></Link>
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
                    <SwiperSlide className='m-auto  flex items-center justify-center w-full'>
                        <div className="product pt-5 px-5 pb-3 bg-white rounded-lg hover:shadow-xl">
                            <div className="flex bg-[#f9f9f9]  rounded-lg">
                                <img className='w-full' src={imgpanana} alt="" />
                            </div>
                            <h4 className="mt-2 text-2xl font-medium my-2">Sunstar Fresh Melon Juice</h4>
                            <p className="text-gray-500 text-xs flex items-center justify-between">
                                <span>
                                    <Rating name="read-only" value={3} readOnly />
                                </span>
                                <span className='text-sm'>1 Unit</span>
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-lg font-bold my-2 ">$120</p>
                                <button className="flex-shrink-0 h-8 hover:text-light text-white w-[100px] bg-yellow rounded-lg text-sm">Add to Cart</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='m-auto  flex items-center justify-center w-full '>
                        <div className="product pt-5 px-5 pb-3 bg-white rounded-lg hover:shadow-xl">
                            <div className="flex bg-[#f9f9f9]  rounded-lg">
                                <img className='w-full' src={imgpanana} alt="" />
                            </div>
                            <h4 className="mt-2 text-2xl font-medium my-2">Sunstar Fresh Melon Juice</h4>
                            <p className="text-gray-500 text-xs flex items-center justify-between">
                                <span>
                                    <Rating name="read-only" value={3} readOnly />
                                </span>
                                <span className='text-sm'>1 Unit</span>
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-lg font-bold my-2 ">$120</p>
                                <button className="flex-shrink-0 h-8 hover:text-light text-white w-[100px] bg-yellow rounded-lg text-sm">Add to Cart</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='m-auto  flex items-center justify-center w-full'>
                        <div className="product pt-5 px-5 pb-3 bg-white rounded-lg hover:shadow-xl">
                            <div className="flex bg-[#f9f9f9]  rounded-lg">
                                <img className='w-full' src={imgpanana} alt="" />
                            </div>
                            <h4 className="mt-2 text-2xl font-medium my-2">Sunstar Fresh Melon Juice</h4>
                            <p className="text-gray-500 text-xs flex items-center justify-between">
                                <span>
                                    <Rating name="read-only" value={3} readOnly />
                                </span>
                                <span className='text-sm'>1 Unit</span>
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-lg font-bold my-2 ">$120</p>
                                <button className="flex-shrink-0 h-8 hover:text-light text-white w-[100px] bg-yellow rounded-lg text-sm">Add to Cart</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='m-auto  flex items-center justify-center w-full'>
                        <div className="product pt-5 px-5 pb-3 bg-white rounded-lg hover:shadow-xl">
                            <div className="flex bg-[#f9f9f9]  rounded-lg">
                                <img className='w-full' src={imgpanana} alt="" />
                            </div>
                            <h4 className="mt-2 text-2xl font-medium my-2">Sunstar Fresh Melon Juice</h4>
                            <p className="text-gray-500 text-xs flex items-center justify-between">
                                <span>
                                    <Rating name="read-only" value={3} readOnly />
                                </span>
                                <span className='text-sm'>1 Unit</span>
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-lg font-bold my-2 ">$120</p>
                                <button className="flex-shrink-0 h-8 hover:text-light text-white w-[100px] bg-yellow rounded-lg text-sm">Add to Cart</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='m-auto  flex items-center justify-center w-full'>
                        <div className="product pt-5 px-5 pb-3 bg-white rounded-lg hover:shadow-xl">
                            <div className="flex bg-[#f9f9f9]  rounded-lg">
                                <img className='w-full' src={imgpanana} alt="" />
                            </div>
                            <h4 className="mt-2 text-2xl font-medium my-2">Sunstar Fresh Melon Juice</h4>
                            <p className="text-gray-500 text-xs flex items-center justify-between">
                                <span>
                                    <Rating name="read-only" value={3} readOnly />
                                </span>
                                <span className='text-sm'>1 Unit</span>
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-lg font-bold my-2 ">$120</p>
                                <button className="flex-shrink-0 h-8 hover:text-light text-white w-[100px] bg-yellow rounded-lg text-sm">Add to Cart</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='m-auto  flex items-center justify-center w-full'>
                        <div className="product pt-5 px-5 pb-3 bg-white rounded-lg hover:shadow-xl">
                            <div className="flex bg-[#f9f9f9]  rounded-lg">
                                <img className='w-full' src={imgpanana} alt="" />
                            </div>
                            <h4 className="mt-2 text-2xl font-medium my-2">Sunstar Fresh Melon Juice</h4>
                            <p className="text-gray-500 text-xs flex items-center justify-between">
                                <span>
                                    <Rating name="read-only" value={3} readOnly />
                                </span>
                                <span className='text-sm'>1 Unit</span>
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-lg font-bold my-2 ">$120</p>
                                <button className="flex-shrink-0 h-8 hover:text-light text-white w-[100px] bg-yellow rounded-lg text-sm">Add to Cart</button>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </>
    );
}

export default PopularProducts;
