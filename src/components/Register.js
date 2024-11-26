// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Initialize navigate here

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ email, password });
            setMessage('User registered successfully!');
            navigate('/home'); // Redirect to the homepage
        } catch (error) {
            console.error('Registration Error:', error);

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
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Register;
