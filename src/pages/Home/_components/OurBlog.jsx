import React from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const OurBlog = () => {
    return (
        <>
            <div className="px-2 md:px-5 py-12">
                <div className="title flex justify-between">
                    <h2 className='text-3xl font-bold '>Our Blog</h2>
                    <Link className=' hover:text-black text-light'>Read All Articles <ArrowForwardIcon /></Link>
                </div>
                <div className=" font-[sans-serif] my-4 md:px-10">
                    <div className=" mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16 max-lg:max-w-3xl max-md:max-w-md mx-auto">
                            <div className="bg-white cursor-pointer rounded p-3 overflow-hidden shadow-xl relative top-0 hover:-top-2 transition-all duration-300">
                                <img
                                    src="https://readymadeui.com/Imagination.webp"
                                    alt="Blog Post 1"
                                    className="w-full h-60 object-cover rounded-lg"
                                />
                                <div className="p-6">
                                    <span className="text-sm block text-gray-400 mb-2">
                                        10 FEB 2023 | BY JOHN DOE
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        A Guide to Igniting Your Imagination
                                    </h3>
                                    <hr className="my-4" />
                                    <p className="text-gray-400 text-sm">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                                        accumsan, nunc et tempus blandit, metus mi consectetur felis turpis
                                        vitae ligula.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white cursor-pointer rounded overflow-hidden shadow-xl p-3 relative top-0 hover:-top-2 transition-all duration-300">
                                <img
                                    src="https://readymadeui.com/hacks-watch.webp"
                                    alt="Blog Post 2"
                                    className="w-full h-60 object-cover rounded-lg"
                                />
                                <div className="p-6">
                                    <span className="text-sm block text-gray-400 mb-2">
                                        7 JUN 2023 | BY MARK ADAIR
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        Hacks to Supercharge Your Day
                                    </h3>
                                    <hr className="my-4" />
                                    <p className="text-gray-400 text-sm">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                                        accumsan, nunc et tempus blandit, metus mi consectetur felis turpis
                                        vitae ligula.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white cursor-pointer rounded overflow-hidden shadow-xl p-3 relative top-0 hover:-top-2 transition-all duration-300">
                                <img
                                    src="https://readymadeui.com/prediction.webp"
                                    alt="Blog Post 3"
                                    className="w-full rounded-lg h-60 object-cover"
                                />
                                <div className="p-6">
                                    <span className="text-sm block text-gray-400 mb-2">
                                        5 OCT 2023 | BY SIMON KONECKI
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        Trends and Predictions
                                    </h3>
                                    <hr className="my-4" />
                                    <p className="text-gray-400 text-sm">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                                        accumsan, nunc et tempus blandit, metus mi consectetur felis turpis
                                        vitae ligula.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default OurBlog;
