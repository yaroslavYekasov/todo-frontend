// src/services/api.js
import axios from 'axios';

const API_URL = 'https://localhost:7104/api/Auth'; // Ensure this matches your backend URL

export const registerUser = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (email, password) => {
    return axios.get(
        `${API_URL}/login/${encodeURIComponent(email)}/${encodeURIComponent(password)}`
    );
};
