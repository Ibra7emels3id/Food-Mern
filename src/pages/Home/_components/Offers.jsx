import React from 'react';
import bgImage from '../../../assets/images/ad-image-3.png'
import bgImage2 from '../../../assets/images/ad-image-4.png'
import { Link } from 'react-router-dom';

const Offers = () => {
    return (
        <>
            <div className="grid md:grid-cols-2 gap-5 px-5 py-28">
                <div className="flex flex-col bg-bgRed p-9 gap-5 justify-center h-[300px] rounded-2xl" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'right', backgroundRepeat: 'no-repeat' }}>
                    <h3 className='text-yellow font-Garamond text-3xl font-semibold '>Upto 25% Off</h3>
                    <p className='text-3xl font-bold '>Luxa Dark Chocolate</p>
                    <p className='text-light '>Very tasty & creamy vanilla flavour creamy muffins.</p>
                    <Link to={'/shop'} className=' uppercase bg-black hover:bg-[#363636] w-[150px] text-white flex items-center justify-center h-12'>Shop Now</Link>
                </div>
                <div className="flex flex-col bg-bgRed p-9 gap-5 justify-center h-[300px] rounded-2xl" style={{ backgroundImage: `url(${bgImage2})`, backgroundPosition: 'right', backgroundRepeat: 'no-repeat' }}>
                    <h3 className='text-yellow font-Garamond text-3xl font-semibold '>Upto 25% Off</h3>
                    <p className='text-3xl font-bold '>Luxa Dark Chocolate</p>
                    <p className='text-light '>Very tasty & creamy vanilla flavour creamy muffins.</p>
                    <Link to={'/shop'} className=' uppercase bg-black hover:bg-[#363636] w-[150px] text-white flex items-center justify-center h-12'>Shop Now</Link>
                </div>
            </div>
        </>
    );
}

export default Offers;
