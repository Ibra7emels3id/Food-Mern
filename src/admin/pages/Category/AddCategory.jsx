import  { useState } from 'react';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import { AddToCategory } from '../../../features/CategorySlice';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const dispatch = useDispatch();
    const Navigator = useNavigate()
    const [imageUrl, setImageUrl] = useState(null);
    const [product, setProduct] = useState({
        category: '',
        image: '',
    })

    // handle Change event
    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    // Handle Submit Data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('category', product.category);
            formData.append('image', product.image);
            const response = await dispatch(AddToCategory({ formData })).unwrap();
            if (response && response.message === 'Category added successfully') {
                setProduct({ category: '', image: '' });
                Navigator('/admin/category')
            }
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    }



    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[80%] m-auto">
                        <h2 className="text-2xl font-bold text-center mb-4">Add Category</h2>
                        <form onSubmit={handleSubmit} className='w-full'>
                            <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border' type="text" name="category" id="category" placeholder='Enter your category' />
                            <label
                                htmlFor="uploadFile1"
                                className="flex bg-gray-800 hover:bg-gray-700 w-full text-white text-base px-5 py-3 outline-none mt-4 cursor-pointer mx-auto font-[sans-serif]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 mr-2 fill-white inline"
                                    viewBox="0 0 32 32"
                                >
                                    <path
                                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                        data-original="#000000"
                                    />
                                    <path
                                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                        data-original="#000000"
                                    />
                                </svg>
                                Upload Image
                                <input onChange={(e) => {
                                    setProduct({ ...product, image: e.target.files[0] })
                                    setImageUrl(e.target.files[0])
                                }} type="file" id="uploadFile1" className="hidden" />
                            </label>
                            <div className="image flex items-center justify-center">
                                {imageUrl && <img className='mt-4 w-52 ' src={URL.createObjectURL(imageUrl)} alt="Uploaded Image" />}
                            </div>
                            <button type='submit' className='w-full h-12 px-6 text-white text-base font-semibold bg-yellow hover:bg-[#dbaa2c] rounded-md mt-8'>Add Category</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCategory;
