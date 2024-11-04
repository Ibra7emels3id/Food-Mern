import { Avatar, Badge, Stack, styled } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartProduct } from '../features/CartSlice';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import { logOutUser } from '../features/UserSlice';
import NavBar from './NavBar';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


const Header = ({ UserData }) => {
    const User = UserData?.user
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
    const { category } = useSelector((state) => state.category)
    const { products } = useSelector((state) => state.Product);
    const [dilogShow, setDilogShow] = useState('hidden');
    const [textSearch, setTextSearch] = useState('');
    const [searchResult, setSearchResult] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const dropdownRef = useRef(null);


    // handle Dropdown Menu
    const handleDropdown = () => {
        setDilogShow(dilogShow === 'hidden' ? 'flex' : 'hidden');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDilogShow('hidden');
                setSearchResult(false);
                setTextSearch('');
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownRef, dilogShow]);


    // handle LogOut 
    const handleLogOut = async () => {
        await dispatch(logOutUser());
        window.location.href = "/";
    }

    // UseEffects
    useEffect(() => {
        dispatch(fetchCartProduct({ User }))
    }, [User]);

    // handle Search Products
    useEffect(() => {
        if (textSearch) {
            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(textSearch.toLowerCase()) ||
                String(product.price).includes(textSearch)
            );
            setCartItems(filteredProducts);
        } else {
            setCartItems([]);
        }
    }, [textSearch])


    return (
        <header ref={dropdownRef} className="shadow-md bg-white font-[sans-serif] tracking-wide relative z-50">
            <section className="flex items-center flex-wrap lg:justify-center gap-4 py-3 sm:px-10 px-4 border-gray-200 border-b min-h-[75px]">
                <div className="left-10 absolute z-50 bg-gray-100 flex px-4 py-3 rounded max-lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192.904 192.904"
                        width="20px"
                        className="cursor-pointer fill-gray-400 mr-6 rotate-90 inline-block"
                    >
                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                    </svg>
                    <input
                        onChange={(e) => {
                            setTextSearch(e.target.value);
                        }}
                        onFocus={() => {
                            setSearchResult(true);
                        }}
                        value={textSearch}
                        type="text"
                        placeholder="Search..."
                        className="outline-none bg-transparent w-full text-sm"
                    />
                    {searchResult && <div className="flex flex-col absolute top-14  left-0 bg-neutral-200 w-full gap-2 p-2">
                        <button onClick={() => {
                            setSearchResult(false);
                            setTextSearch('');
                        }}><svg className='w-12 h-12' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg></button>
                        {cartItems.length > 0 ? cartItems?.map(product => (
                            <div key={product._id} className="flex items-center gap-2 p-2 bg-white hover:bg-gray-100 cursor-pointer">
                                <img
                                    src={`${import.meta.env.VITE_SOME_URL}/Uploads/${product.image}`}
                                    alt={product.title}
                                    className="w-12 h-12"
                                />
                                <span>{product.title}</span>
                            </div>
                        )) :
                            <dev>
                                <span className='text-center py-2 block'>No search results found</span>
                            </dev>}
                    </div>}
                </div>
                <Link to="/" className="shrink-0">
                    <img
                        src="https://themewagon.github.io/FoodMart/images/logo.png"
                        alt="logo"
                        className="md:w-[170px] w-36"
                    />
                </Link>
                <div className="lg:absolute lg:right-10 flex items-center ml-auto space-x-8">
                    <span className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            className="cursor-pointer fill-[#333] hover:fill-yellow inline-block"
                            viewBox="0 0 64 64"
                        >
                            <path
                                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                data-original="#000000"
                            />
                        </svg>
                        <span className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 text-xs text-white">
                            00
                        </span>
                    </span>
                    <Link to={'/cart'}>
                        <span className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20px"
                                height="20px"
                                className="cursor-pointer fill-[#333] hover:fill-yellow inline-block"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                                    data-original="#000000"
                                />
                            </svg>
                            <span className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 text-xs text-white">
                                {cart?.totalQuantity}
                            </span>
                        </span>
                    </Link>
                    <div className="flex items-center  cursor-pointer border-gray-300">
                        {user?.user ? <Dropdown>
                            <MenuButton
                                sx={{ border: 'none', padding: '0', marginLeft: '0', borderRadius: '100%' }}
                                slots={{ root: IconButton }}
                                slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
                            >
                                <Stack direction="row" spacing={2}>
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={`${import.meta.env.VITE_SOME_URL}/Uploads/${user?.user?.image}?timestamp=${new Date().getTime()}`}
                                            alt=""
                                        />
                                        {/* <Avatar sx={{ width: '35px', height: '35px' }} alt="Remy Sharp" src={`${import.meta.env.VITE_SOME_URL}/Uploads/${user?.user?.image}`} /> */}
                                    </StyledBadge>
                                </Stack>
                                {/* <MoreVert /> */}
                            </MenuButton>
                            <Menu sx={{ width: '200px' }}>
                                <MenuItem><Link to={`/account/${user?.user?._id}`}>Profile</Link></MenuItem>
                                <MenuItem><Link to={'/transactions'}>Transactions</Link></MenuItem>
                                <MenuItem>
                                    <button onClick={handleLogOut}>Logout</button>
                                </MenuItem>
                            </Menu>
                        </Dropdown> : <Link to={'/login'}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                className="hover:fill-yellow"
                            >
                                <circle cx={10} cy={7} r={6} data-original="#000000" />
                                <path
                                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                    data-original="#000000"
                                />
                            </svg>
                        </Link>}
                    </div>
                </div>
            </section>
            <div className="flex flex-wrap justify-center px-10 py-3 relative">
                <div
                    id="collapseMenu"
                    className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
                >
                    <button
                        id="toggleClose"
                        className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 fill-black"
                            viewBox="0 0 320.591 320.591"
                        >
                            <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                data-original="#000000"
                            />
                            <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                data-original="#000000"
                            />
                        </svg>
                    </button>
                    <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                        <li className="max-lg:border-b max-lg:pb-4 px-3 lg:hidden">
                            <Link to="/">
                                <img
                                    src="https://readymadeui.com/readymadeui.svg"
                                    alt="logo"
                                    className="w-36"
                                />
                            </Link>
                        </li>
                        <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
                            <Link to="/"
                                className="hover:text-yellow text-yellow font-semibold block text-[15px]"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="group max-lg:border-b max-lg:px-3 max-lg:py-3 relative">
                            <p to="/"
                                className="hover:text-yellow hover:fill-yellow text-gray-600 font-semibold text-[15px] block"
                            >
                                Store
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16px"
                                    height="16px"
                                    className="ml-1 inline-block"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                        data-name={16}
                                        data-original="#000000"
                                    />
                                </svg>
                            </p>
                            <ul className="absolute top-5 max-lg:top-8 left-0 z-50 block space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[250px] group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                                {category?.map((it) => {
                                    return (
                                        <li key={it._id} className="border-b py-3">
                                            <Link to={`/category/${it.category}`} className="hover:text-yellow uppercase hover:fill-yellow text-gray-600 font-semibold text-[15px] block" >
                                                {it.category}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                        <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
                            <Link
                                to="/shop"
                                className="hover:text-yellow text-gray-600 font-semibold text-[15px] block"
                            >
                                Shop
                            </Link>
                        </li>
                        <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
                            <Link
                                to="/blog"
                                className="hover:text-yellow text-gray-600 font-semibold text-[15px] block"
                            >
                                Blog
                            </Link>
                        </li>
                        <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
                            <Link
                                to="/about"
                                className="hover:text-yellow text-gray-600 font-semibold text-[15px] block"
                            >
                                About
                            </Link>
                        </li>
                        <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
                            <Link
                                to="/review"
                                className="hover:text-yellow text-gray-600 font-semibold text-[15px] block"
                            >
                                Review
                            </Link>
                        </li>
                        <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
                            <Link
                                to="/team"
                                className="hover:text-yellow text-gray-600 font-semibold text-[15px] block"
                            >
                                Team
                            </Link>
                        </li>
                        <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
                            <Link
                                to="/contact"
                                className="hover:text-yellow text-gray-600 font-semibold text-[15px] block"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div id="toggleOpen" className="flex ml-auto lg:hidden">
                    <button onClick={handleDropdown} type='button'>
                        <svg
                            className="w-7 h-7"
                            fill="#000"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <NavBar dilogShow={dilogShow} />
        </header>
    );
};

export default React.memo(Header);
