import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../components/PrivateRoute";
import Header from "../components/Header";

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const [editableUser, setEditableUser] = useState({ ...user });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUser({ ...editableUser, [name]: value });
        // console.log("edit:", editableUser);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(editableUser),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update user information');
            }

            const data = await response.json();
            alert('User information updated successfully');
            console.log('Updated user:', data);

            // Optionally, update the user context with the new user data
            // e.g., updateUserContext(data.user);

        } catch (error) {
            console.error('Error updating user:', error);
            alert(`Failed to update user: ${error.message}`);
        }
    };

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/users/profile`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete user');
            }
            window.location.href = '/';
            logout();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
                <div className="container mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-300">Profile</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">First Name</h2>
                                <input
                                    name="firstName"
                                    value={editableUser.firstName}
                                    onChange={handleInputChange}
                                    className="mt-2 p-2 border rounded-lg w-full"
                                />
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Last Name</h2>
                                <input
                                    name="lastName"
                                    value={editableUser.lastName}
                                    onChange={handleInputChange}
                                    className="mt-2 p-2 border rounded-lg w-full"
                                />
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Email</h2>
                                <input
                                    name="email"
                                    value={editableUser.email}
                                    onChange={handleInputChange}
                                    className="mt-2 p-2 border rounded-lg w-full"
                                />
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Bio</h2>
                                <textarea
                                    name="bio"
                                    value={editableUser.bio}
                                    onChange={handleInputChange}
                                    className="mt-2 p-2 border rounded-lg w-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-12 space-x-4">
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleDeleteUser}
                            className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
