import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUser, UpdateUserData } from '../../features/UserSlice';
import Loading from '../../Components/Loading';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;


const Account = () => {
    const { user, sLoading } = useSelector((state) => state.user)
    const [UserData, setUserData] = useState({})
    const [ImageUrl, setImageUrl] = useState('');
    const { id } = useParams()
    const dispatch = useDispatch();
    const Navigate = useNavigate()



    // Handle Cheng Events
    const HandleUpdateUser = (e) => {
        setUserData({ ...UserData, [e.target.name]: e.target.value });
    }



    // Handle Form Submit
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', UserData.name);
        formData.append('image', UserData.image);
        formData.append('address', UserData.address);
        formData.append('city', UserData.city)
        formData.append('country', UserData.country);
        formData.append('zip', UserData.zip);
        await dispatch(UpdateUserData({ formData, id }))
        dispatch(fetchUser())
    }


    // Check User Data
    if (!sLoading && !user?.user) {
        Navigate('/')
    }


    // Use Effect
    useEffect(() => {
        setUserData(user?.user)
    }, [user?.user]);



    // Set Loading
    if (sLoading) {
        return <Loading />
    }

    return (
        <>
            <Header />
            <div className="flex min-h-screen pb-10">
                <div className="flex flex-col items-center w-full mt-10">
                    <form action="" className='w-full flex flex-col items-center'>
                        <div className="image">
                            {ImageUrl ? <img className='w-[170px] rounded-full' src={URL.createObjectURL(ImageUrl)} alt="Profile Picture" /> : <img className='w-[170px] rounded-full' src={`${import.meta.env.VITE_SOME_URL}/Uploads/${UserData?.image}`} alt="Profile Picture" />}
                        </div>
                        <div className="flex mt-6">
                            <Button
                                type='button'
                                component="label"
                                role={undefined}
                                tabIndex={-1}
                                variant="outlined"
                                color="neutral"
                                startDecorator={
                                    <SvgIcon>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                            />
                                        </svg>
                                    </SvgIcon>
                                }
                                onChange={(e) => {
                                    setUserData({ ...UserData, image: e.target.files[0] })
                                    setImageUrl(e.target.files[0])
                                }}
                            >
                                Upload a file
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </div>
                        <div className="details mt-8 grid md:grid-cols-2 grid-cols-1 md:w-[90%] w-full p-3 m-auto gap-5">
                            <input onChange={HandleUpdateUser} className='h-12 border outline-none px-2' type="text" name="name" id="name" value={UserData?.name} placeholder='Enter name' />
                            <p className='h-12 bg-white border outline-none px-2 flex items-center' type="email" name="name" id="name" >{UserData?.email}</p>
                            <input onChange={HandleUpdateUser} className='h-12 border outline-none px-2' type="text" name="phone" id="phone" value={UserData?.phone} placeholder='Enter phone' />
                            <p className='h-12 bg-white border outline-none px-2 flex items-center uppercase' type="text" name="name" id="name" >{UserData?.status}</p>
                            <input onChange={HandleUpdateUser} className='h-12 border outline-none px-2' type="text" name="address" id="address" value={UserData?.address} placeholder='Enter address' />
                            <input onChange={HandleUpdateUser} className='h-12 border outline-none px-2' type="text" name="city" id="city" value={UserData?.city} placeholder='Enter city' />
                            <input onChange={HandleUpdateUser} className='h-12 border outline-none px-2' type="text" name="country" id="country" value={UserData?.country} placeholder='Enter country' />
                            <input onChange={HandleUpdateUser} className='h-12 border outline-none px-2' type="text" name="zip" id="zip" value={UserData?.zip} placeholder='Enter zip' />
                            <p className='h-12 bg-white border outline-none px-2 flex items-center' type="text" name="name" id="name" >{UserData?.createdAt}</p>
                            <p className='h-12 bg-white border outline-none px-2 flex items-center' type="text" name="name" id="name">{UserData?.lastLogin}</p>
                            <div className="flex justify-center md:col-span-2 col-span-1 mt-5">
                                <button onClick={HandleSubmit} type='submit' className='bg-yellow w-full hover:bg-orange text-white font-bold py-2 px-4 rounded'>Update Data</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default React.memo(Account);
