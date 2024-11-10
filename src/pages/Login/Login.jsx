import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer';
import { toast } from 'react-toastify';
import axios from 'axios'
import Loading from '../../Components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, loginUser } from '../../features/UserSlice';


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [CheckPass, setCheckPass] = useState('password')
    const [data, setData] = useState({})
    const { user, sLoading } = useSelector((state) => state.user)


    // Handle Change Events
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    

    // Handle Submit Data to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(loginUser({ data })).unwrap();
        dispatch(fetchUser())
        setLoading(false);
    };

    // Fetch Data Login     
    useEffect(() => {
        dispatch(fetchUser());
    }, [])

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }
    }, [user, navigate]);


    // Add Loading 
    if (sLoading) {
        return <Loading />
    }


    return (
        <>
            <Header />
            <div className="bg-gray-50 font-[sans-serif]">
                <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                    <div className="max-w-md w-full">
                        {<Link to="/">
                            <img
                                src="https://themewagon.github.io/FoodMart/images/logo.png"
                                alt="logo"
                                className="w-40 mb-8 mx-auto block"
                            />
                        </Link> || ''}
                        <div className="p-8 rounded-2xl bg-white shadow">
                            <h2 className="text-gray-800 text-center text-2xl font-bold">
                                Sign in
                            </h2>
                            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">
                                        Email
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            value={data.email}
                                            onChange={handleChange}
                                            name="email"
                                            type="email"
                                            required="true"
                                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-yellow"
                                            placeholder="Enter Your Email"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#bbb"
                                            stroke="#bbb"
                                            className="w-4 h-4 absolute right-4"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle cx={10} cy={7} r={6} data-original="#000000" />
                                            <path
                                                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                    <div className="relative flex items-center">
                                        <input
                                            value={data.password}
                                            onChange={handleChange}
                                            name="password"
                                            type={CheckPass}
                                            required="true"
                                            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-yellow"
                                            placeholder="Enter Your password"
                                        />
                                        <svg onClick={() => {
                                            if (CheckPass === 'password') {
                                                setCheckPass('text')
                                            } else {
                                                setCheckPass('password')
                                            }
                                        }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#bbb"
                                            stroke="#bbb"
                                            className="w-5 h-5 absolute right-4 cursor-pointer "
                                            viewBox="0 0 128 128"
                                        >
                                            <path
                                                d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="!mt-8">
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-yellow hover:bg-[#edb43a] focus:outline-none"
                                    >
                                        Sign in
                                    </button>
                                </div>
                                <p className="text-gray-800 text-sm !mt-8 text-center">
                                    Dont have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                                    >
                                        Register here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default React.memo(Login);
