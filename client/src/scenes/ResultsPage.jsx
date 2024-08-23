import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";

const ResultPage = () => {
    const { quizId } = useParams();
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/users/${quizId}/result`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setResult(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || 'Failed to fetch result');
                }
            } catch (error) {
                setError('An error occurred while fetching results');
            }
        };

        fetchResult();
    }, [quizId]);

    if (error) return <div className="text-red-500 dark:text-red-400">Error: {error}</div>;

    if (!result) return <div className="text-gray-500 dark:text-gray-400">Loading...</div>;
    const handleButton = () => {
        window.location.href = '/';
    }
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-md w-full animate-fadeIn">
                    <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Quiz Results</h1>
                    <p className="text-gray-800 dark:text-gray-200"><strong>Quiz Title:</strong> {result.quiz_title}</p>
                    <p className="text-gray-800 dark:text-gray-200"><strong>Raw Score:</strong> {result.raw_score}</p>
                    <p className="text-gray-800 dark:text-gray-200"><strong>Total
                        Questions:</strong> {result.total_questions}</p>
                    <p className="text-gray-800 dark:text-gray-200"><strong>Date
                        Taken:</strong> {new Date(result.date_taken).toLocaleDateString()}</p>
                </div>
                <button
                    onClick={handleButton}
                    className="p-4 bg-indigo-400 text-white rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-indigo-500"
                >
                    Go back Home
                </button>
            </div>
        </div>
    );
};

export default ResultPage;
