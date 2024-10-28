import React from 'react';
import bgImage from '../../../assets/images/background-pattern.jpg'
import { Link } from 'react-router-dom';
import imageSeation from '../../../assets/images/product-thumb-1.png'
import bgadd1 from '../../../assets/images/ad-image-1.png'
import bgadd2 from '../../../assets/images/ad-image-2.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



const MainSection = () => {
    return (
        <>
            <div style={{ background: `url(${bgImage})`, backgroundSize: 'cover' }} >
                <div className="grid grid-cols-5 grid-rows-3  gap-6 p-3 md:p-8">
                    <div className="flex bg-bgBlue  col-span-5 xl:col-span-3 row-span-3 rounded-lg ">
                        <div className=" md:flex  items-center justify-center p-6 md:p-12">
                            <div className="flex flex-col gap-4 text-center sm:text-start">
                                <h2 className='text-yellow font-semibold text-3xl font-Garamond'>100% Natural</h2>
                                <h3 className='text-[45px] font-semibold'>Fresh Smoothie & Summer Juice</h3>
                                <p className='text-zinc-400 text-lg font-normal'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.</p>
                                <Link to={'/shop'} className='text-normal m-auto sm:m-0 w-[200px] border flex items-center justify-center border-black rounded-sm h-12 hover:bg-black hover:text-white uppercase '>Shop Collection</Link>
                            </div>
                            <div className="Image block m-auto">
                                <img className='w-[350px] lg:w-[450px] m-auto mt-10 md:mt-0' src={imageSeation} alt="Background Image" />
                            </div>
                        </div>
                    </div>
                    <div className="grid  grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 xl:col-span-2 col-span-5  row-span-3 gap-6">
                        <div className="flex items-center p-12 col-span-1  justify-between row-span-3 bg-bgGreen rounded-lg" style={{ backgroundImage: `url(${bgadd1})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom' }}>
                            <div className="text flex flex-col gap-2">
                                <h2 className=' text-4xl font-Garamond'>20% off</h2>
                                <span className="flex items-center w-32">
                                    <span className="h-[1px] w-[12px] flex-1 bg-black"></span>
                                    <span className="pl-1 font-normal text-sm">SALE</span>
                                </span>
                                <p className='font-bold text-2xl sm:text-4xl'>Fruits & <br /> Vegetables</p>
                                <Link to={'/shop'} className='w-[150px text-stone-600 px-1 hover:text-black py-3'>Shop Collection <ArrowForwardIcon /></Link>
                            </div>
                        </div>

                        <div  className="flex items-center p-12 col-span-1  justify-between row-span-3 bg-bgRed rounded-lg" style={{ backgroundImage: `url(${bgadd2})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom' }}>
                            <div className="text flex flex-col gap-2">
                                <h2 className=' text-4xl font-Garamond'>15% off</h2>
                                <span className="flex items-center w-32">
                                    <span className="h-[1px] w-[12px] flex-1 bg-black"></span>
                                    <span className="pl-1 font-normal text-sm">SALE</span>
                                </span>
                                <p className='font-bold text-2xl sm:text-4xl'>Baked Products</p>
                                <Link to={'/shop'} className='w-[150px text-stone-600 px-1 hover:text-black py-3'>Shop Collection <ArrowForwardIcon /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainSection;
