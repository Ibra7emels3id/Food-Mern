import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/images/boy.png';

const NavBar = ({ dilogShow }) => {
    const { user } = useSelector((state) => state.user)
    return (
        <>
            <nav className={`bg-white ${dilogShow}  shadow-xl h-screen fixed top-0 left-0 z-[100] min-w-[250px] py-6 font-[sans-serif] overflow-auto`}>
                <div className="relative flex flex-col h-full w-full">
                    <Link to="/" className="text-center">
                        <img
                            src="https://themewagon.github.io/FoodMart/images/logo.png"
                            alt="logo"
                            className="w-[160px] inline"
                        />
                    </Link>
                    <ul className="space-y-3 my-8 flex-1 w-full">
                        <li>
                            <Link
                                to="/"
                                className="text-sm flex items-center text-yellow border-r-[5px] border-yellow bg-gray-100 px-8 py-4 transition-all"
                            >
                                <svg className='w-[18px]  h-[18px text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                                </svg>
                                <span className='ml-3'>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/shop"
                                className="text-black text-sm flex items-center hover:text-yellow hover:border-r-[5px] border-yellow hover:bg-gray-100 px-8 py-4 transition-all"
                            >
                                <svg className='w-[18px]  h-[18px text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path d="M36.8 192l566.3 0c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0L121.7 0c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224l0 160 0 80c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-80 0-160-64 0 0 160-192 0 0-160-64 0zm448 0l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32l0-256-64 0z" />
                                </svg>
                                <span className='ml-3'>Shop</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/blog"
                                className="text-black text-sm flex items-center hover:text-yellow hover:border-r-[5px] border-yellow hover:bg-gray-100 px-8 py-4 transition-all"
                            >
                                <svg className='w-[18px]  h-[18px text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M446.6 222.7c-1.8-8-6.8-15.4-12.5-18.5-1.8-1-13-2.2-25-2.7-20.1-.9-22.3-1.3-28.7-5-10.1-5.9-12.8-12.3-12.9-29.5-.1-33-13.8-63.7-40.9-91.3-19.3-19.7-40.9-33-65.5-40.5-5.9-1.8-19.1-2.4-63.3-2.9-69.4-.8-84.8 .6-108.4 10C45.9 59.5 14.7 96.1 3.3 142.9 1.2 151.7 .7 165.8 .2 246.8c-.6 101.5 .1 116.4 6.4 136.5 15.6 49.6 59.9 86.3 104.4 94.3 14.8 2.7 197.3 3.3 216 .8 32.5-4.4 58-17.5 81.9-41.9 17.3-17.7 28.1-36.8 35.2-62.1 4.9-17.6 4.5-142.8 2.5-151.7zm-322.1-63.6c7.8-7.9 10-8.2 58.8-8.2 43.9 0 45.4 .1 51.8 3.4 9.3 4.7 13.4 11.3 13.4 21.9 0 9.5-3.8 16.2-12.3 21.6-4.6 2.9-7.3 3.1-50.3 3.3-26.5 .2-47.7-.4-50.8-1.2-16.6-4.7-22.8-28.5-10.6-40.8zm191.8 199.8l-14.9 2.4-77.5 .9c-68.1 .8-87.3-.4-90.9-2-7.1-3.1-13.8-11.7-14.9-19.4-1.1-7.3 2.6-17.3 8.2-22.4 7.1-6.4 10.2-6.6 97.3-6.7 89.6-.1 89.1-.1 97.6 7.8 12.1 11.3 9.5 31.2-4.9 39.4z" /></svg>
                                <span className='ml-3'>Blog</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="text-black text-sm flex items-center hover:text-yellow hover:border-r-[5px] border-yellow hover:bg-gray-100 px-8 py-4 transition-all"
                            >
                                <svg className='w-[18px]  h-[18px text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M224 32c13.5 0 26.3 5.6 35.4 15.6l176 192c12.9 14 16.2 34.3 8.6 51.8S419 320 400 320L48 320c-19 0-36.3-11.2-43.9-28.7s-4.3-37.7 8.6-51.8l176-192C197.7 37.6 210.5 32 224 32zM0 432c0-26.5 21.5-48 48-48l352 0c26.5 0 48 21.5 48 48s-21.5 48-48 48L48 480c-26.5 0-48-21.5-48-48z" />
                                </svg>
                                <span className='ml-3'>About</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/review"
                                className="text-black text-sm flex items-center hover:text-yellow hover:border-r-[5px] border-yellow hover:bg-gray-100 px-8 py-4 transition-all"
                            >
                                <svg className='w-[18px]  h-[18px text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3 0 289.2zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z" />
                                </svg>
                                <span className='ml-3'>Review</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/team"
                                className="text-black text-sm flex items-center hover:text-yellow hover:border-r-[5px] border-yellow hover:bg-gray-100 px-8 py-4 transition-all"
                            >
                                <svg className='w-[18px]  h-[18px text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z" /></svg>
                                <span className='ml-3'>Team</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-black text-sm flex items-center hover:text-yellow hover:border-r-[5px] border-yellow hover:bg-gray-100 px-8 py-4 transition-all"
                            >
                                <svg className='w-[18px]  h-[18px text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
                                <span className='ml-3'>Contact</span>
                            </Link>
                        </li>
                        {user?.user && <li>
                            <Link
                                to="/transactions"
                                className="text-black text-sm flex items-center hover:text-yellow hover:border-r-[5px] border-yellow hover:bg-gray-100 px-8 py-4 transition-all"
                            >
                                <svg className='w-[18px]  h-[18px text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm64 320l-64 0 0-64c35.3 0 64 28.7 64 64zM64 192l0-64 64 0c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64l0 64-64 0zm64-192c-35.3 0-64-28.7-64-64l64 0 0 64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" /></svg>
                                <span className='ml-3'>Order</span>
                            </Link>
                        </li>}
                    </ul>
                    {user?.user && <Link to={`/account/${user?.user?._id}`} className="flex flex-wrap items-center cursor-pointer border-t border-gray-300 px-4 py-4">
                        {user?.user?.image ? <img
                            src={user?.user?.image}
                            className="w-9 h-9 rounded-full border-white"
                        /> : <img className='w-10 h-10 rounded-full' src={logo} alt="Profile Picture" />}
                        <div className="ml-4">
                            <p className="text-sm text-black">{user?.user?.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Active free account</p>
                        </div>
                    </Link>}
                </div>
            </nav>
        </>
    );
}

export default NavBar;
