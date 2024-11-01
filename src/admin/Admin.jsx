// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import Loading from '../Components/Loading';

const Admin = ({ UserData }) => {
    const Navigate = useNavigate();
    const { user, sLoading } = useSelector((state) => state.user)
    // const [loading, setLoading] = useState(true);




    // Check User
    if (!sLoading) {
        if (user?.role !== 'admin') {
            Navigate('/');
        }
    }


    if (sLoading) {
        return <Loading />;
    }

    return (
        <div className="flex">
            <Header />
            <div className="flex ml-[50px] md:ml-[250px] mt-[70px] p-2 md:p-12">
                <h1>Admin Dashboard</h1>
            </div>
        </div>
    );
};

export default Admin;
