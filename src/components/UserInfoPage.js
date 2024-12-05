import React, { useState, useEffect } from 'react';

function UserInfoPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch the current email of the user (using session or from API)
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('https://localhost:7104/api/Auth/checksession', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.username) {
                    setEmail(data.username);  // Assuming 'username' is the email
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for submission
        const updatedData = {
            email,
            password,
            newPassword,
        };

        try {
            const response = await fetch('https://localhost:7104/api/Auth/updateUserInfo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('User info updated successfully!');
            } else {
                setMessage(data.message || 'Error updating user info.');
            }
        } catch (error) {
            console.error('Error updating user info:', error);
            setMessage('Error updating user info.');
        }
    };

    return (
        <div>
            <h3>Edit User Information</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Current Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Password (if changing):</label><br />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit">Save Changes</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UserInfoPage;
