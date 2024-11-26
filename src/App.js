// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the components we'll use for each route
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <div>
                {/* Define routes for the application */}
                <Routes>
                    <Route path="/" element={<Login />} />            {/* Login page */}
                    <Route path="/register" element={<Register />} /> {/* Registration page */}
                    <Route path="/home" element={<Home />} />         {/* Home page after login */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
