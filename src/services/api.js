// src/services/api.js
import axios from 'axios';

// Base URL for the API
const API_URL = 'https://localhost:7104/api';

// Create an Axios instance with credentials enabled for session management
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Necessary for sending cookies with each request
});

// Function to register a new user
export const registerUser = (userData) => {
    return axiosInstance.post('/Auth/register', {
        Email: userData.email,
        Password: userData.password,
        ConfirmPassword: userData.confirmPassword,
    });
};

// Function to log in a user
export const loginUser = (email, password) => {
    return axiosInstance.post('/Auth/login', { Email: email, Password: password });
};

// Function to log out the user
export const logoutUser = () => {
    return axiosInstance.post('/Auth/logout');
};

export const getTasks = () => {
    return axiosInstance.get('/Tasks');
};

export const addTask = (taskData) => {
    return axiosInstance.post('/Tasks', taskData);
};

export const deleteTask = (id) => {
    return axiosInstance.delete(`/Tasks/${id}`);
};

export const updateTask = (taskId, taskData) => {
    return axiosInstance.put(`/Tasks/${taskId}`, taskData);
};

