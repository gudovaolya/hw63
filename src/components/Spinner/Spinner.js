import React from 'react';
import loader from './loader.gif'
import './Spinner.css';

const Spinner = () => (
    <div className="spinner">
        <img src={loader} alt=""/>
    </div>
);

export default Spinner;