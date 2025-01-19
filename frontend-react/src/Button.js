// src/Button.js
import React from 'react';
import './Button.css';
import { useNavigate } from 'react-router-dom';

function Button() {
    const navigate = useNavigate();
    
    const handleClick = () => {
        const password = prompt('Enter password:');
        if (password === '1234') {
            navigate(`/messages/1234`);
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <button className="custom-button" onClick={handleClick}>
            zzz
        </button>
    );
}

export default Button;