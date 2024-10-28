// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

const Admin = ({ UserData }) => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);



    
    useEffect(() => {
        const handleUser = async () => {
            if (UserData) {
                if (UserData.role !== 'admin') {
                    Navigate('/');
                } else {
                    setLoading(false);
                }
            }
        };
        handleUser();
    }, [UserData, Navigate]);

    if (loading) {
        return <div>Loading...</div>;
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
