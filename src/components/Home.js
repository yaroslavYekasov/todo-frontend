// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication state if implemented
        navigate('/'); // Redirect to login page
    };

    return (
        <div>
            <h2>Welcome to the TODO List App</h2>
            <p>You have successfully logged in or registered.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
