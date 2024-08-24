import React, { useEffect, useState } from 'react';
import ProgressCircle from './ProgressCircle'; // Make sure the path is correct

const Popover = ({ user, onClose }) => {
    // eslint-disable-next-line
    const [quizzes, setQuizzes] = useState([]);
    // eslint-disable-next-line
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [totalQuizzes, setTotalQuizzes] = useState(0);
    const [submittedQuizzes, setSubmittedQuizzes] = useState(0);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/quizzes/submitted', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                const data = await response.json();
                console.log("Submitted Quizzes:", data);
                setQuizzes(Array.isArray(data) ? data : []);
                setFilteredQuizzes(Array.isArray(data) ? data : []);

                const totalResponse = await fetch('http://127.0.0.1:5000/quizzes');
                const totalData = await totalResponse.json();
                console.log("Total Quizzes:", totalData);
                setTotalQuizzes(totalData.length);
                setSubmittedQuizzes(data.length);
                setPercentage(Math.round((data.length / totalData.length) * 100));
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <div className="absolute top-0 right-0 m-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">My Info</h2>
            <div className="flex flex-col items-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-2">Name: {user.firstName} {user.lastName}</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4">Email: {user.email}</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mb-4">Your Progress:</p>
                <div className="flex items-center justify-center mb-4">
                    <ProgressCircle percentage={percentage} size={100} strokeWidth={8}/>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Quizzes: {totalQuizzes}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Submitted Quizzes: {submittedQuizzes}</p>
                </div>
            </div>
        </div>
    );
};

export default Popover;
