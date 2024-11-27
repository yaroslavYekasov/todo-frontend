import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/api';
import { format, parseISO } from 'date-fns';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');

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
                                <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );
}

export default TaskList;
