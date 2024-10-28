import React from 'react';

const Discount = () => {
    return (
        <>
            <div className=" p-3 md:p-10">
                <div className="bg-gradient-to-r  rounded-xl from-cyan-200 via-gray-50 to-gray-200 py-24 font-[sans-serif]">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 p-4">
                        <div className="w-full flex flex-col gap-5 text-center lg:text-left">
                            <h2 className="text-gray-800 text-5xl font-extrabold mb-6">
                                Get <span className='text-yellow'>25% Discount</span>
                            </h2>
                            <p className="text-5xl md:text-7xl font-bold text-black-600">
                                on your first purchase
                            </p>
                            <p className="text-xm mt-6 font-normal text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst amet, metus, sit massa posuere maecenas. At tellus ut nunc amet vel egestas.
                            </p>
                        </div>
                        <div className="w-full max-lg:max-w-lg">
                            <form className="flex w-full items-center flex-col gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full  text-gray-800 bg-white py-3.5 px-4 text-base border border-[#ddd] border-r-0 rounded-lg outline-none focus:border-yellow"
                                    required=""
                                />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full  text-gray-800 bg-white py-3.5 px-4 text-base border border-[#ddd] border-r-0 rounded-lg outline-none focus:border-yellow"
                                    required=""
                                />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full text-gray-800 bg-white py-3.5 px-4 text-base border border-[#ddd] border-r-0 rounded-lg outline-none focus:border-yellow"
                                    required=""
                                />
                                <button
                                    type="submit"
                                    className="bg-yellow hover:bg-[#ffaa00] w-full text-white text-base font-semibold tracking-wide py-3.5 px-6 border hover:border-[#ffaa00] rounded-lg outline-none"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Discount;
