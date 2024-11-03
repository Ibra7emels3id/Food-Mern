import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Rating } from '@mui/material';
import { AddToCart, fetchCartProduct } from '../../features/CartSlice';
import { fetchProducts } from '../../features/ProductSlice';



const FilterCategory = () => {
    const { id } = useParams()
    const { products } = useSelector((state) => state.Product);
    const filteredProducts = products.filter(product => product.category === id);
    const userId = useSelector((state) => state.user.user?.id);
    const dispatch = useDispatch();
    const [loaderSpiner, setLoaderSpinner] = React.useState(null);


    // Handle Send Data
    const HandleSendData = async (item) => {
        setLoaderSpinner(item._id)
        await dispatch(AddToCart({ userId, item }));
        dispatch(fetchCartProduct({ userId }));
        setLoaderSpinner(null);
    };



    // Items
    const Items = filteredProducts?.map((item) => {
        return (
            <div key={item._id} className="product relative pt-5 px-5 pb-3 bg-white rounded-lg hover:shadow-xl">
                <div className="flex items-center justify-center bg-[#f9f9f9] rounded-lg">
                    <img loading='lazy' className='w-64 h-56' src={`${import.meta.env.VITE_SOME_URL}/Uploads/${item.image}`} alt={item.title} />
                </div>
                <h4 className="mt-2 text-2xl font-medium my-3 h-16">{item.title}</h4>
                <p className="text-gray-500 text-xs flex items-center justify-between">
                    <span>
                        <Rating name="read-only" value={item?.rating} readOnly />
                    </span>
                    <span className='text-sm'>{item.count || 1} count</span>
                </p>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-lg font-bold my-2 ">${item.price}</p>
                    <div className="flex items-center gap-5">
                        <Link to={`/product/details/${item._id}`} className=" text-light hover:text-black">
                            <VisibilityIcon sx={{ fontSize: '30px' }} />
                        </Link>
                        {loaderSpiner === item._id ? (
                            <div className="flex items-center justify-center w-[100px]">
                                <svg  loading='lazy' xmlns="http://www.w3.org/2000/svg" className="w-8 m-auto animate-spin fill-yellow  block mx-auto" viewBox="0 0 24 24">
                                    <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z" />
                                </svg>
                            </div>
                        ) : (
                            <button onClick={() => HandleSendData(item)} className="flex-shrink-0 h-8 hover:text-light text-white w-[100px] bg-yellow rounded-lg text-sm">
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
                <div className=" hidden boxView w-[90%] mt-1 absolute top-2  items-center justify-between">
                    <div className="flex w-[100%] m-auto justify-between items-center">
                        <Link to={`/product/details/${item._id}`} className="text-sm text-blue-500 hover:text-blue-700">
                        </Link>
                        <div >
                            <button className='bg-white p-4 rounded-full'>👍</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    });


    // Fetch products when id changes
    React.useEffect(() => {
        dispatch(fetchProducts());
    }, [id]);


    return (
        <>
            <Header />
            <div className="flex flex-col my-10 px-3">
                <span className="flex items-center ">
                    <span className="pr-6 text-xl">Filter Category</span>
                    <span className="h-px flex-1 bg-black"></span>
                </span>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 my-20 gap-5">
                    {Items}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default FilterCategory;
