import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <>
            <Header />
            <div className="p-4 font-[sans-serif] py-16">
                <div className="max-w-7xl max-lg:max-w-3xl max-sm:max-w-sm mx-auto">
                    <span className="flex items-center justify-center">
                        <span className="pr-6 text-xl">Stay updated with the latest blog posts.</span>
                        <span className="h-px flex-1 bg-black"></span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-sm:gap-8 my-16">
                        <div className="bg-white rounded overflow-hidden">
                            <img
                                src="https://readymadeui.com/images/food.webp"
                                alt="Blog Post 1"
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">
                                    Lorem Ipsum Dolor
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore...
                                </p>
                                <p className="text-gray-800 text-[13px] font-semibold mt-4">
                                    08 April 2024
                                </p>
                                <Link
                                    to="/"
                                    className="mt-4 w-full text-center inline-block px-4 py-2 rounded tracking-wider bg-yellow hover:bg-purple-700 text-white text-[13px]"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white rounded overflow-hidden">
                            <img
                                src="https://readymadeui.com/images/food11.webp"
                                alt="Blog Post 2"
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">
                                    Consectetur Adipiscing
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore...
                                </p>
                                <p className="text-gray-800 text-[13px] font-semibold mt-4">
                                    08 April 2024
                                </p>
                                <Link
                                    to="/"
                                    className="mt-4 w-full text-center inline-block px-4 py-2 rounded tracking-wider bg-yellow hover:bg-purple-700 text-white text-[13px]"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white rounded overflow-hidden">
                            <img
                                src="https://readymadeui.com/images/food22.webp"
                                alt="Blog Post 3"
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">
                                    Lorem Ipsum Sit Amet
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore...
                                </p>
                                <p className="text-gray-800 text-[13px] font-semibold mt-4">
                                    08 April 2024
                                </p>
                                <Link
                                    to="/"
                                    className="mt-4 w-full text-center inline-block px-4 py-2 rounded tracking-wider bg-yellow hover:bg-purple-700 text-white text-[13px]"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white rounded overflow-hidden">
                            <img
                                src="https://readymadeui.com/images/food33.webp"
                                alt="Blog Post 3"
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">
                                    Lorem Ipsum Sit Amet
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore...
                                </p>
                                <p className="text-gray-800 text-[13px] font-semibold mt-4">
                                    08 April 2024
                                </p>
                                <Link
                                    to="/"
                                    className="mt-4 w-full text-center inline-block px-4 py-2 rounded tracking-wider bg-yellow hover:bg-purple-700 text-white text-[13px]"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white rounded overflow-hidden">
                            <img
                                src="https://readymadeui.com/images/food44.webp"
                                alt="Blog Post 3"
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">
                                    Lorem Ipsum Sit Amet
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore...
                                </p>
                                <p className="text-gray-800 text-[13px] font-semibold mt-4">
                                    08 April 2024
                                </p>
                                <Link
                                    to="/"
                                    className="mt-4 w-full text-center inline-block px-4 py-2 rounded tracking-wider bg-yellow hover:bg-purple-700 text-white text-[13px]"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white rounded overflow-hidden">
                            <img
                                src="https://readymadeui.com/images/food55.webp"
                                alt="Blog Post 3"
                                className="w-full h-52 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-3">
                                    Lorem Ipsum Sit Amet
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore...
                                </p>
                                <p className="text-gray-800 text-[13px] font-semibold mt-4">
                                    08 April 2024
                                </p>
                                <Link
                                    to="/"
                                    className="mt-4 w-full text-center inline-block px-4 py-2 rounded tracking-wider bg-yellow hover:bg-purple-700 text-white text-[13px]"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Blog;
