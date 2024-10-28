import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AddProductCart, fetchProducts } from '../../../features/ProductSlice';
import { Rating } from '@mui/material';
import { FetchCategory } from '../../../features/CategorySlice';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState(null);
    const { category } = useSelector((state) => state.category)

    const [product, setProduct] = useState({
        title: '',
        price: '',
        category: '',
        categoryCanned: '',
        categoryFluidclass: '',
        description: '',
        image: '',
        count: '',
        rating: '',
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
            formData.append('title', product.title);
            formData.append('price', product.price);
            formData.append('category', product.category);
            formData.append('categoryCanned', product.categoryCanned);
            formData.append('categoryFluidclass', product.categoryFluidclass);
            formData.append('description', product.description);
            formData.append('image', product.image);
            formData.append('count', product.count);
            formData.append('rating', product.rating);
            const res = await dispatch(AddProductCart({ formData })).unwrap();
            if (res.msg === 'Product added successfully') {
                console.log(res.msg);
                navigate('/admin/products');
                setProduct({
                    title: '',
                    price: '',
                    category: '',
                    categoryCanned: '',
                    categoryFluidclass: '',
                    description: '',
                    image: '',
                    count: '',
                    rating: '',
                });
            }
            dispatch(fetchProducts());
        } catch (error) {
            console.error('Failed to add product:', error);
        }
    }



    // UseEffects
    useEffect(() => {
        dispatch(FetchCategory());
    }, [])



    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[80%] m-auto">
                        <h2 className="text-2xl font-bold text-center mb-4">Add Product Cart</h2>
                        <form onSubmit={handleSubmit} className='w-full'>
                            <input onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border' type="text" name="title" id="title" placeholder='Enter your title' />
                            <input onChange={handleInputChange} className='h-12 px-3 w-full mt-4 outline-none focus:outline-none border' type="number" name="price" id="price" placeholder='Enter your price' />
                            <Rating onChange={handleInputChange} className='mt-5 px-2' name='rating' defaultValue={product.rating || 0} size="large" />
                            <select onChange={handleInputChange} className='h-12 px-3 w-full mt-4 outline-none focus:outline-none border' name="category" id="category">
                                <option value="" hidden>Select a category</option>
                                {category?.map((it) => {
                                    return (
                                        <option key={it._id} value={it.category}>{it.category}</option>
                                    )
                                })}
                            </select>
                            <input onChange={handleInputChange} className='h-12 px-3 w-full mt-4 outline-none focus:outline-none border' type="number" name="count" id="count" placeholder='Enter your count' />
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
                            <textarea onChange={handleInputChange} className='h-32 px-3 py-2 w-full mt-4 outline-none focus:outline-none border' name="description" id="description" placeholder='Enter your description' />
                            <button type='submit' className='w-full h-12 px-6 text-white text-base font-semibold bg-yellow hover:bg-[#dbaa2c] rounded-md mt-8'>Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProduct;
