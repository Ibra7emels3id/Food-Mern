import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AddProductCart, fetchProductDetails, fetchProducts, UpdateProductId } from '../../../features/ProductSlice';
import { Rating } from '@mui/material';
import { FetchCategory } from '../../../features/CategorySlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../Components/Loading';
import { fetchUser } from '../../../features/UserSlice';

const UpdateProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState(null);
    const { category } = useSelector((state) => state.category)
    const { Product } = useSelector((state) => state.Product)
    const { user, sLoading } = useSelector((state) => state.user)
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)

    // handle Change event
    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    // Handle Submit Data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
            await dispatch(UpdateProductId({ id, formData }))
                .then(() => {
                    dispatch(fetchProducts());
                    navigate('/admin/products');
                })
                .catch((error) => {
                    console.error('Failed to update product:', error);
                });
            setLoading(false);
        } catch (error) {
            console.error('Failed to add product:', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }


    // Check User
    if (!sLoading) {
        if (user?.role !== 'admin') {
            navigate('/');
        }
    }


    // Ues Effect
    useEffect(() => {
        if (Product) {
            setProduct(Product);
        }
    }, [Product]);

    useEffect(() => {
        if (!Product || Product._id !== id) {
            dispatch(fetchProductDetails(id));
            dispatch(FetchCategory());
        }
    }, [Product, id, dispatch]);


    // Add Loading Page
    if (sLoading) {
        return <Loading />
    }


    return (
        <>
            <div className="flex">
                <Header />
                <div className="flex w-full ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12">
                    <div className="flex flex-col w-full md:w-[80%] m-auto">
                        <h2 className="text-2xl font-bold text-center mb-4">Update Product</h2>
                        <form onSubmit={handleSubmit} className='w-full'>
                            <input value={product.title} onChange={handleInputChange} className='h-12 px-3 w-full outline-none focus:outline-none border' type="text" name="title" id="title" placeholder='Enter your title' />
                            <input value={product.price} onChange={handleInputChange} className='h-12 px-3 w-full mt-4 outline-none focus:outline-none border' type="number" name="price" id="price" placeholder='Enter your price' />
                            <Rating onChange={handleInputChange} className='mt-5 px-2' name='rating' value={product?.rating || 0} size="large" />
                            <select onChange={handleInputChange} className='h-12 px-3 w-full mt-4 outline-none focus:outline-none border' name="category" id="category">
                                <option value="" hidden>Select a category</option>
                                {category?.map((it) => {
                                    return (
                                        <option key={it._id} value={it.category}>{it.category}</option>
                                    )
                                })}
                            </select>
                            <p className='text-3xl px-2 mt-4'>{product?.category}</p>
                            <input value={product.count} onChange={handleInputChange} className='h-12 px-3 w-full mt-4 outline-none focus:outline-none border' type="number" name="count" id="count" placeholder='Enter your count' />
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
                                {imageUrl ? <img className='mt-4 w-52 ' src={URL?.createObjectURL(imageUrl)} alt="Uploaded Image" /> : <img className='mt-4 w-52 ' src={product.image} alt="Uploaded Image" />}
                            </div>
                            <textarea value={product.description} onChange={handleInputChange} className='h-32 px-3 py-2 w-full mt-4 outline-none focus:outline-none border' name="description" id="description" placeholder='Enter your description' />
                            {loading ? <p type='submit' className='flex items-center justify-center w-full h-12 px-6 text-white text-base font-semibold bg-yellow  rounded-md mt-8'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 animate-spin fill-white block mx-auto"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                                        data-original="#000000" />
                                </svg>
                            </p> : <button type='submit' className='w-full h-12 px-6 text-white text-base font-semibold bg-yellow hover:bg-[#dbaa2c] rounded-md mt-8'>Update Product</button>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateProduct;
