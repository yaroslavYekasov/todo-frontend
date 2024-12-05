import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function Home() {
    const [taskListKey, setTaskListKey] = useState(0);
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);  // State to check if the user is admin

    const refreshTaskList = () => {
        setTaskListKey(prevKey => prevKey + 1);
    };

    // Fetch the username and role of the logged-in user
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('https://localhost:7104/api/Auth/checksession', {
                    method: 'GET',
                    credentials: 'include', // Make sure to send the session cookie
                });
                const data = await response.json();
                if (data.username) {
                    const userNamePart = data.username.split('@')[0]; // Extract text before '@'
                    setUsername(userNamePart); // Set the username part

                    // Check if the logged-in user is an admin
                    if (data.username === 'admin@gmail.com') {
                        setIsAdmin(true); // Set the admin flag to true
                    }
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div>
            <h2>Welcome, {username}</h2> {/* Show the username before @ */}
            <TaskForm onTaskAdded={refreshTaskList} />
            <TaskList key={taskListKey} />

            {/* Show the "Users" button only if the logged-in user is an admin */}
            {isAdmin && (
                <Link to="/users">
                    <button>Users</button> {/* Button to navigate to the user management page */}
                </Link>
            )}

            {/* Link to the edit user info page */}
            <Link to="/user-info">
                <button>Edit User Info</button>
            </Link>
        </div>
    );
}

export default Home;
