// src/components/EditUser.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';  // Import necessary hooks

function EditUser() {
    const { id } = useParams();
    const history = useHistory();
    const [userData, setUserData] = useState({ email: '', password: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://localhost:7104/api/Users/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                setUserData({ email: data.email, password: '' });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://localhost:7104/api/Users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                credentials: 'include',
            });

            if (response.ok) {
                history.push('/users'); // Redirect to the users page
            } else {
                console.error('Error updating user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        required
                    />
                </label>
                <br />
                <label>Password:
                    <input
                        type="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    />
                </label>
                <br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditUser;
