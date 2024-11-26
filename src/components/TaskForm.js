// src/components/TaskForm.js
import React, { useState } from 'react';
import { addTask } from '../services/api'; // Import the function to add tasks

function TaskForm() {
    // State variables for task fields and messages
    const [date, setDate] = useState('');
    const [subject, setSubject] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create a task object with the input data
        const taskData = {
            date,
            subject,
            title,
            description,
        };

        try {
            // Attempt to add the task
            await addTask(taskData);
            setMessage('Task added successfully!');

            // Clear the form fields
            setDate('');
            setSubject('');
            setTitle('');
            setDescription('');
        } catch (error) {
            // Handle errors
            console.error('Error adding task:', error);
            setMessage('Error adding task.');
        }
    };

    // Render the form
    return (
        <div>
            <h3>Add New Task</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label><br />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Subject:</label><br />
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Title:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label><br />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div><br />
                <button type="submit">Add Task</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default TaskForm;
