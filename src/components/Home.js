// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function Home() {
    const [taskListKey, setTaskListKey] = useState(0);
    const [username, setUsername] = useState('');

    const refreshTaskList = () => {
        setTaskListKey(prevKey => prevKey + 1);
    };

    // Fetch the username of the logged-in user
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('https://localhost:7104/api/Auth/checksession', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.username) {
                    const userNamePart = data.username.split('@')[0]; // Extract text before '@'
                    setUsername(userNamePart); // Set the username part
                }
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        fetchUsername();
    }, []);

    return (
        <div>
            <h2>Welcome, {username}</h2> {/* Show the username before @ */}
            <TaskForm onTaskAdded={refreshTaskList} />
            <TaskList key={taskListKey} />

            {/* Link to the edit user info page */}
            <Link to="/user-info">
                <button>Edit User Info</button>
            </Link>
        </div>
    );
}

export default Home;
