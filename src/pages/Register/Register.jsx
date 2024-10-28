import React, { useState } from 'react';
import Header from '../../Components/Header';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer';
import { toast } from 'react-toastify';



const register = () => {
    const Navigate = useNavigate()
    const User = true
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })

    console.log(data);

    // HandleChange events
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    // Send Data User To Server
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const json = await response.json()
            if(json.status === 201) {
                toast.success('User Registration Successful')
                setData({ name: '', email: '', password: '' })
            }else{
                toast.error('Failed to Register User')
            }
            Navigate('/login')
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
            setLoading(false)
        } finally {
            setLoading(false)
        }

    }




    // Set The Loading Dom
    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin text-4xl text-blue-500 mr-4"></div>
            <p className="text-gray-600">Loading...</p>
        </div>
    }


    if (User) {
        return (
            <>
                <Header />
                <div className="bg-gray-50 font-[sans-serif]">
                    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                        <div className="max-w-md w-full">
                            <Link to="/">
                                <img
                                    src="https://themewagon.github.io/FoodMart/images/logo.png"
                                    alt="logo"
                                    className="w-40 mb-8 mx-auto block"
                                />
                            </Link>
                            <div className="p-8 rounded-2xl bg-white shadow">
                                <h2 className="text-gray-800 text-center text-2xl font-bold">
                                    Sign Up
                                </h2>
                                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                                    <div>
                                        <label className="text-gray-800 text-sm mb-2 block">
                                            Name
                                        </label>
                                        <div className="relative flex items-center">
                                            <input
                                                onChange={handleChange}
                                                name="name"
                                                type="name"
                                                required="true"
                                                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                                placeholder="Enter Your name"
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
                                        <label className="text-gray-800 text-sm mb-2 block">
                                            Email
                                        </label>
                                        <div className="relative flex items-center">
                                            <input
                                                onChange={handleChange}
                                                name="email"
                                                type="email"
                                                required="true"
                                                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
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
                                                onChange={handleChange}
                                                name="password"
                                                type="password"
                                                required="true"
                                                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                                placeholder="Enter Your password"
                                            />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="#bbb"
                                                stroke="#bbb"
                                                className="w-4 h-4 absolute right-4 cursor-pointer"
                                                viewBox="0 0 128 128"
                                            >
                                                <path
                                                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                                    data-original="#000000"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor="remember-me"
                                                className="ml-3 block text-sm text-gray-800"
                                            >
                                                <Link to='/'>
                                                    Remember me
                                                </Link>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="!mt-8">
                                        {loading ? <p
                                            className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                        >
                                            Loading...
                                        </p> : <button
                                            type="submit"
                                            className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                        >
                                            Sign in
                                        </button>}
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
    } else {
        Navigate('/')
    }
}

export default register;

