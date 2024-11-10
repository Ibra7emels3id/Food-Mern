import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addBanner, fetchOffers, fetchOneOffer, updateBannerId } from '../../../features/BannersSlice';

const UpdateBanner = () => {
    const { id } = useParams()
    const { oneOffer } = useSelector((state) => state.oneOffer);
    const dispatch = useDispatch();
    const Navigator = useNavigate();
    const [product, setProduct] = useState(oneOffer);
    const [ImageUrl, setImageUrl] = useState({});

    console.log(product);

    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e, imageType) => {
        setProduct({ ...product, [imageType]: e.target.files[0] });
        setImageUrl({ ...ImageUrl, [imageType]: e.target.files[0] });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('aboutBig', product?.aboutBig);
            formData.append('titleBig', product?.titleBig);
            formData.append('descriptionBig', product?.descriptionBig);
            formData.append('aboutSmall', product?.aboutSmall);
            formData.append('titleSmall', product?.titleSmall);
            formData.append('descriptionSmall', product?.descriptionSmall);
            formData.append('aboutMedium', product?.aboutMedium);
            formData.append('titleMedium', product?.titleMedium);
            formData.append('descriptionMedium', product?.descriptionMedium);
            formData.append('imageBig', product?.imageBig);
            formData.append('imageSmall', product?.imageSmall);
            formData.append('imageMedium', product?.imageMedium);
            // Dispatch the form data to the server or API here
            await dispatch(updateBannerId({ id, formData })).then(() => {
                // Navigator('/admin/banners');
            })
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    }

    useEffect(() => {
        if (oneOffer) {
            setProduct(oneOffer)
        }
    }, [oneOffer])

    useEffect(() => {
        dispatch(fetchOneOffer({ id }));
    }, [])

    return (
        <div className="flex">
            <Header />
            <div className="flex w-full ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12">
                <div className="flex flex-col w-full md:w-[80%] m-auto">
                    <h2 className="text-2xl font-bold text-center mb-4">Add Banner Big Header</h2>
                    <form onSubmit={handleSubmit} className='w-full'>
                        {/* Banner Big */}
                        <div className="flex flex-col">
                            <h3>Enter Banner Header Big</h3>
                            <div className="form">
                                <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border mt-3' type="text" name="aboutBig" value={product?.aboutBig} placeholder='100% Natural' />
                                <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border mt-3' type="text" name="titleBig" value={product?.titleBig} placeholder='Enter Title' />
                                <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border mt-3' type="text" name="descriptionBig" value={product?.descriptionBig} placeholder='Enter description' />
                                <label htmlFor="uploadFile1" className="flex bg-gray-800 hover:bg-gray-700 w-full text-white text-base px-5 py-3 outline-none mt-4 cursor-pointer mx-auto font-[sans-serif]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
                                        <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                                        <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                                    </svg>
                                    Upload Image
                                    <input onChange={(e) => handleImageChange(e, 'imageBig')} type="file" id="uploadFile1" className="hidden" />
                                </label>
                                <div className="image flex items-center justify-center">
                                    {ImageUrl?.imageBig ? <img className='mt-4 w-52 ' src={URL.createObjectURL(ImageUrl?.imageBig)} alt="Uploaded Image" /> : <img className='mt-4 w-52 ' src={product?.imageBig} alt="Uploaded Image" />}
                                </div>
                            </div>
                        </div>

                        {/* Banner Small */}
                        <div className="flex flex-col mt-10">
                            <h3>Enter Banner Header Small</h3>
                            <div className="form">
                                <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border mt-3' type="text" name="aboutSmall" value={product?.aboutSmall} placeholder='100% Natural' />
                                <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border mt-3' type="text" name="titleSmall" value={product?.titleSmall} placeholder='Enter Title' />
                                <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border mt-3' type="text" name="descriptionSmall" value={product?.descriptionSmall} placeholder='Enter description' />
                                <label htmlFor="uploadFile2" className="flex bg-gray-800 hover:bg-gray-700 w-full text-white text-base px-5 py-3 outline-none mt-4 cursor-pointer mx-auto font-[sans-serif]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
                                        <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                                        <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                                    </svg>
                                    Upload Image
                                    <input onChange={(e) => handleImageChange(e, 'imageSmall')} type="file" id="uploadFile2" className="hidden" />
                                </label>
                                <div className="image flex items-center justify-center">
                                    {ImageUrl.imageSmall ? <img className='mt-4 w-52 ' src={URL.createObjectURL(ImageUrl.imageSmall)} alt="Uploaded Image" /> : <img className='mt-4 w-52 ' src={product?.imageSmall} alt="Uploaded Image" />}
                                </div>
                            </div>
                        </div>

                        {/* Banner Medium */}
                        <div className="flex flex-col mt-10">
                            <h3>Enter Banner Header Medium</h3>
                            <div className="form">
                                <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border mt-3' type="text" name="aboutMedium" value={product?.aboutMedium} placeholder='100% Natural' />
                                <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border mt-3' type="text" name="titleMedium" value={product?.titleMedium} placeholder='Enter Title' />
                                <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border mt-3' type="text" name="descriptionMedium" value={product?.descriptionMedium} placeholder='Enter description' />
                                <label htmlFor="uploadFile3" className="flex bg-gray-800 hover:bg-gray-700 w-full text-white text-base px-5 py-3 outline-none mt-4 cursor-pointer mx-auto font-[sans-serif]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
                                        <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                                        <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                                    </svg>
                                    Upload Image
                                    <input onChange={(e) => handleImageChange(e, 'imageMedium')} type="file" id="uploadFile3" className="hidden" />
                                </label>
                                <div className="image flex items-center justify-center">
                                    {ImageUrl.imageMedium ? <img className='mt-4 w-52 ' src={URL.createObjectURL(ImageUrl.imageMedium)} alt="Uploaded Image" /> : <img className='mt-4 w-52 ' src={product?.imageMedium} alt="Uploaded Image" />}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button type="submit" className="bg-yellow text-white px-4 py-2 rounded w-full mt-5">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default React.memo(UpdateBanner);
