import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const FilterCategory = () => {
    const {id} = useParams()
    return (
        <>
            <Header />
            <h3>Category {id}</h3>
            <Footer />
        </>
    );
}

export default FilterCategory;
