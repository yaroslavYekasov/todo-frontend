// src/components/Login.js
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Initialize navigate here

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            setMessage('Login successful!');
            navigate('/home'); // Redirect to the homepage
        } catch (error) {
            console.error('Login Error:', error);

            if (error.response && error.response.data) {
                setMessage(error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
                setMessage('No response received from server. Please check your network connection.');
            } else {
                console.error('Error:', error.message);
                setMessage(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label><br/>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label><br/>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div><br/>
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
            <p>
                Don't have an account? <Link to="/register">Register Here</Link>
            </p>
        </div>
    );
}

export default Login;
