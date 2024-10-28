import React from 'react';
import App from '../../../assets/images/app-store.jpg'
import App2 from '../../../assets/images/google-play.jpg'
import phone from '../../../assets/images/phone.png'
import { Link } from 'react-router-dom';



const ShopApp = () => {
    return (
        <>
            <div className="flex relative  py-28 m-auto rounded-2xl">
                <div className="flex flex-col justify-center bg-[#fff9eb] p-5 md:w-[95%] w-[98%] m-auto min-h-[500px] items-center">
                    <div className="image">
                        <img className='lg:w-[370px] top-5 left-10   lg:left-32  md:absolute'  src={phone} alt="Product" />
                    </div>
                    <div className="text text-center md:text-start md:ml-[380px] lg:ml-[500px]">
                        <h3 className='text-4xl font-bold'>Shop faster with foodmart App</h3>
                        <p className='my-9 w-[95%] md:w-[90%] mx-auto font-normal text-light'>Shop faster with foodmart App Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis sed ptibus liberolectus nonet psryroin. Amet sed lorem posuere sit iaculis amet, ac urna. Adipiscing fames semper erat ac in suspendisse iaculis. Amet blandit tortor praesent ante vitae. A, enim pretiummi senectus magna. Sagittis sed ptibus liberolectus non et psryroin.</p>
                        <div className="flex justify-center md:justify-start">
                            <Link to={'/'} className="bg-blue text-white">
                                <img  src={App} alt="" />
                            </Link>
                            <Link to={'/'} className="bg-gray-300 text-gray-800 ml-2">
                                <img src={App2} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopApp;
