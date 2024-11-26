// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/api'; // Import the logout function
import TaskForm from './TaskForm'; // Component to add tasks
import TaskList from './TaskList'; // Component to list tasks

function Home() {
    const navigate = useNavigate(); // Hook to navigate between routes

    // Function to handle logout
    const handleLogout = async () => {
        try {
            await logoutUser(); // Call the logout function
            navigate('/'); // Redirect to login page
        } catch (error) {
            console.error('Logout Error:', error);
            // Even if logout fails, navigate to login page
            navigate('/');
        }
    };

    return (
        <div>
            <h2>Welcome to the TODO List App</h2>
            <button onClick={handleLogout}>Logout</button>
            <hr />
            {/* Include the task form and task list components */}
            <TaskForm />
            <TaskList />
        </div>
    );
}

export default Home;
