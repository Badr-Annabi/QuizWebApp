import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        bio: 'A passionate developer.',
        profileImage: '/path/to/image.jpg'
    });

    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user quizzes (replace with your API call)
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/users/quizzes', {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error('Error fetching quizzes', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleModify = (field) => {
        // Logic to modify user information
        alert(`Modify ${field}`);
    };

    const handleDeleteUser = () => {
        // Logic to delete user
        alert('User deleted');
        navigate('/');
    };

    const handleModifyQuiz = (quizId) => {
        // Logic to modify quiz
        alert(`Modify quiz ${quizId}`);
    };

    const handleDeleteQuiz = (quizId) => {
        // Logic to delete quiz
        alert(`Quiz ${quizId} deleted`);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
            <div className="container mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-300">Profile</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <img
                            src={user.profileImage}
                            alt="Profile"
                            className="w-full rounded-xl shadow-lg"
                        />
                        <button
                            onClick={() => handleModify('profileImage')}
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Modify Profile Image
                        </button>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Name</h2>
                            <p className="text-lg text-gray-500 dark:text-gray-400">{user.name}</p>
                            <button
                                onClick={() => handleModify('name')}
                                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Modify
                            </button>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Email</h2>
                            <p className="text-lg text-gray-500 dark:text-gray-400">{user.email}</p>
                            <button
                                onClick={() => handleModify('email')}
                                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Modify
                            </button>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Bio</h2>
                            <p className="text-lg text-gray-500 dark:text-gray-400">{user.bio}</p>
                            <button
                                onClick={() => handleModify('bio')}
                                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Modify
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-6">Your Quizzes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {quizzes.map((quiz) => (
                            <div key={quiz.id} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                                    {quiz.title}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">
                                    {quiz.description}
                                </p>
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        onClick={() => handleModifyQuiz(quiz.id)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleDeleteQuiz(quiz.id)}
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end mt-12">
                    <button
                        onClick={handleDeleteUser}
                        className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
