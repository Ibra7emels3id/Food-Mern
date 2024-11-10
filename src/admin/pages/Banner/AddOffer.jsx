import { useState } from 'react';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBannerOffer } from '../../../features/BannersSlice';

const AddOffer = () => {
    const dispatch = useDispatch();
    const Navigator = useNavigate();
    const [product, setProduct] = useState({});

    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e, imageType) => {
        setProduct({ ...product, [imageType]: e.target.files[0] });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('code', product.code);
            formData.append('discount', product.discount);
            formData.append('image', product.image);


            // Dispatch the form data to the server or API here
            dispatch(addBannerOffer({ formData })).then(() => {
                Navigator('/admin/banners');
                setProduct({
                    code: '',
                    discount: '',
                    image: null,
                    errors: {}
                })
            })
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    }

    return (
        <div className="flex">
            <Header />
            <div className="flex w-full ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12">
                <div className="flex flex-col w-full md:w-[80%] m-auto">
                    <h2 className="text-2xl font-bold text-center mb-4">Add Offer</h2>
                    <form onSubmit={handleSubmit} className='w-full'>
                        <div className="flex flex-col">
                            <div className="form">
                                <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border mt-3' type="text" name="code" placeholder='Enter Code' />
                                <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border mt-3' type="text" name="discount" placeholder='Enter discount' />
                                <label htmlFor="uploadFile1" className="flex bg-gray-800 hover:bg-gray-700 w-full text-white text-base px-5 py-3 outline-none mt-4 cursor-pointer mx-auto font-[sans-serif]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
                                        <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                                        <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                                    </svg>
                                    Upload Image
                                    <input onChange={(e) => handleImageChange(e, 'image')} type="file" id="uploadFile1" className="hidden" />
                                </label>
                                <div className="image flex items-center justify-center">
                                    {product.image && <img className='mt-4 w-52 ' src={URL.createObjectURL(product.image)} alt="Uploaded Image" />}
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

export default AddOffer;
