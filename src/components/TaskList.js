// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/api'; // Import functions to get and delete tasks

function TaskList() {
    // State variables for tasks and messages
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');

    // Function to fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            console.log('Tasks data:', response.data);
            setTasks(response.data);
        } catch (error) {
            // Handle errors
            console.error('Error fetching tasks:', error);
            setMessage('Error fetching tasks.');
        }
    };

    // Fetch tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    // Function to handle task deletion
    const handleDelete = async (id) => {
        try {
            await deleteTask(id); // Delete the task
            setMessage('Task deleted successfully!');
            fetchTasks(); // Refresh the task list
        } catch (error) {
            // Handle errors
            console.error('Error deleting task:', error);
            setMessage('Error deleting task.');
        }
    };

    return (
        <div>
            <h3>Your Tasks</h3>
            {message && <p>{message}</p>}
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.Id}>
                            <strong>{task.Title}</strong> ({new Date(task.Date).toLocaleDateString()}) - {task.Subject}
                            <p>{task.Description}</p>
                            <button onClick={() => handleDelete(task.Id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );
}

export default TaskList;
