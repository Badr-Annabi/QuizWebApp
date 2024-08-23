import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CreatedQuizzesPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user's quizzes using the API
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/user-quizzes', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setQuizzes(data.quizzes);
                }
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    const handleEditQuiz = (quizId) => {
        navigate(`/edit-quiz/${quizId}`);
    };

    const handleDeleteQuiz = async (quizId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/quizzes/${quizId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
            } else {
                console.error('Failed to delete quiz');
            }
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-gray-200 dark:bg-gray-900 p-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-200">My Quizzes</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">{quiz.title}</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">{quiz.description}</p>
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => handleEditQuiz(quiz.id)}
                                    className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                >
                                    <PencilIcon className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => handleDeleteQuiz(quiz.id)}
                                    className="text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                                >
                                    <TrashIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatedQuizzesPage;
