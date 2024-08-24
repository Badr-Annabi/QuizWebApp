import React, {useEffect, useState} from 'react';
import ProgressCircle from './ProgressCircle'; // Make sure the path is correct


const Popover = ({ user, onClose }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [filterLevel, setFilterLevel] = useState('all');
    const [filterDate, setFilterDate] = useState('desc');
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
                setQuizzes(Array.isArray(data) ? data : []); // Ensure quizzes is an array
                setFilteredQuizzes(Array.isArray(data) ? data : []); // Ensure filteredQuizzes is an array
                // setQuizzes(data);
                // setFilteredQuizzes(data);

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
        <div className="absolute top-0 right-0 m-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 dark:text-gray-400">✕</button>
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">User Info</h2>
            <div className="flex flex-col items-center">
                <p className="text-lg text-gray-800 dark:text-gray-300">Name: {user.firstName} {user.lastName}</p>
                <p className="text-lg text-gray-800 dark:text-gray-300">Email: {user.email}</p>
                <p className="text-lg text-gray-800 dark:text-gray-300">Your Progress:</p>
                <ProgressCircle percentage={percentage} size={100} strokeWidth={8}/>
            </div>
        </div>
    );
};

export default Popover;
