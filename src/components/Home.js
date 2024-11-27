import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function Home() {
    const [taskListKey, setTaskListKey] = React.useState(0);

    const refreshTaskList = () => {
        setTaskListKey(prevKey => prevKey + 1);
    };

    return (
        <div>
            <h2>Welcome to Your Task Manager</h2>
            <TaskForm onTaskAdded={refreshTaskList} />
            <TaskList key={taskListKey} />
        </div>
    );
}

export default Home;
