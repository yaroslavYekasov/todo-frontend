import React, { useState } from 'react';
import { addTask } from '../services/api';

function TaskForm({ onTaskAdded }) {
    const [date, setDate] = useState('');
    const [subject, setSubject] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            date,
            subject,
            title,
            description,
        };

        try {
            await addTask(taskData);
            setMessage('Task added successfully!');
            setDate('');
            setSubject('');
            setTitle('');
            setDescription('');
            onTaskAdded(); // Callback to refresh the task list
        } catch (error) {
            console.error('Error adding task:', error);
            setMessage('Error adding task.');
        }
    };

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
