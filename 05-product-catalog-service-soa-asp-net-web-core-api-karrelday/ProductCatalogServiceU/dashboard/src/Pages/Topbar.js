import React from 'react';
import '../CSS/Topbar.css';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/Info';

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="topbar-logo">
                <h1>Welcome</h1>
            </div>
            <div className="topbar-links">
                <a href="/" className="topbar-link">
                    <HomeIcon className="icon" /> Home
                </a>
                <a href="/products" className="topbar-link">
                    <CategoryIcon className="icon" /> Products
                </a>
                <a href="/about" className="topbar-link">
                    <InfoIcon className="icon" /> About
                </a>
            </div>
        </div>
    );
};

export default Topbar;
