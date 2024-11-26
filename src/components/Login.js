// src/components/Login.js
import React, { useState } from 'react';
import { loginUser } from '../services/api'; // Import the login function
import { Link, useNavigate } from 'react-router-dom'; // For navigation

function Login() {
    // State variables for email, password, and messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Hook to navigate between routes

    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            // Attempt to log in the user
            await loginUser(email, password);
            setMessage('Login successful!');
            navigate('/home'); // Redirect to the home page
        } catch (error) {
            // Handle errors
            console.error('Login Error:', error);

            if (error.response && error.response.data) {
                // Extract error message from response
                const errorData = error.response.data;
                let errorMessage = '';

                if (typeof errorData === 'string') {
                    errorMessage = errorData;
                } else if (errorData.message) {
                    errorMessage = errorData.message;
                } else if (errorData.title) {
                    errorMessage = errorData.title;
                } else {
                    errorMessage = 'An error occurred during login.';
                }

                setMessage(errorMessage);
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
            {/* Login form */}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email} // Bind input value to state
                        onChange={(e) => setEmail(e.target.value)} // Update state on change
                        required
                    />
                </div>
                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password} // Bind input value to state
                        onChange={(e) => setPassword(e.target.value)} // Update state on change
                        required
                    />
                </div><br />
                <button type="submit">Login</button>
            </form>
            {/* Display message */}
            {message && <p>{message}</p>}
            <p>
                Don't have an account? <Link to="/register">Register Here</Link>
            </p>
        </div>
    );
}

export default Login;
