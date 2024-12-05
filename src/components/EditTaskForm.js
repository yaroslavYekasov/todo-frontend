import React, { useState, useEffect } from 'react';
import { updateTask } from '../services/api'; // Assuming you have an updateTask function

function EditTaskForm({ task, setIsEditing, fetchTasks }) {
    const [date, setDate] = useState('');
    const [subject, setSubject] = useState(task.subject);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [message, setMessage] = useState('');

    // Use useEffect to set the date when the component mounts
    useEffect(() => {
        // Ensure the date is in 'YYYY-MM-DD' format adjusted to local time
        const taskDate = new Date(task.date);
        
        // Adjust for local timezone
        const localDate = new Date(taskDate.getTime() - taskDate.getTimezoneOffset() * 60000); // Adjust for timezone offset
        const formattedDate = localDate.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    
        setDate(formattedDate);
    }, [task.date]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTask = {
            date,
            subject,
            title,
            description,
        };

        try {
            await updateTask(task.id, updatedTask);
            setMessage('Task updated successfully!');
            setIsEditing(false);
            fetchTasks(); // Refresh task list after update
        } catch (error) {
            console.error('Error updating task:', error);
            setMessage('Error updating task.');
        }
    };

    return (
        <div>
            <h3>Edit Task</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label><br />
                    <input
                        type="date"
                        value={date} // Bind the date state to the input value
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
                <button type="submit">Update Task</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default EditTaskForm;
