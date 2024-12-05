import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/api'; // Assuming you have an updateTask function
import { format, parseISO } from 'date-fns';
import EditTaskForm from './EditTaskForm'; // Add this component

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Track if editing is enabled
    const [currentTask, setCurrentTask] = useState(null); // Store the task to edit

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setMessage('Error fetching tasks.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setMessage('Task deleted successfully!');
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
            setMessage('Error deleting task.');
        }
    };

    const handleEditClick = (task) => {
        setIsEditing(true);
        setCurrentTask(task);
    };

    return (
        <div>
            <h3>Your Tasks</h3>
            {message && <p>{message}</p>}
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task) => {
                        const date = parseISO(task.date);
                        const formattedDate = format(date, 'dd MMMM yyyy');

                        return (
                            <li key={task.id}>
                                <strong>{task.title}</strong> - {formattedDate} - {task.subject}
                                <p>{task.description}</p>
                                <button onClick={() => handleEditClick(task)}>Edit</button>
                                <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No tasks available.</p>
            )}

            {isEditing && currentTask && (
                <EditTaskForm task={currentTask} setIsEditing={setIsEditing} fetchTasks={fetchTasks} />
            )}
        </div>
    );
}

export default TaskList;
