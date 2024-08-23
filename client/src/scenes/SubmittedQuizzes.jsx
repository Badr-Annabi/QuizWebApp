import React, { useState, useEffect } from 'react';
import ProgressCircle from '../components/ProgressCircle';
import Header from "../components/Header";

const SubmittedQuizzes = () => {
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
                console.log("Submited Quizzes:", data);
                setQuizzes(data);
                setFilteredQuizzes(data);

                const totalResponse = await fetch('http://127.0.0.1:5000/quizzes');
                const totalData = await totalResponse.json();
                console.log("totalData Quizzes:", totalData);
                setTotalQuizzes(totalData.length);
                setSubmittedQuizzes(data.length);
                setPercentage(Math.round((data.length / totalData.length) * 100));
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    useEffect(() => {

        let filtered = quizzes;

        if (filterLevel !== 'all') {
            filtered = filtered.filter(quiz => quiz.level === filterLevel);
        }

        filtered.sort((a, b) => {
            if (filterDate === 'asc') {
                return new Date(a.date_taken) - new Date(b.date_taken);
            } else {
                return new Date(b.date_taken) - new Date(a.date_taken);
            }
        });

        setFilteredQuizzes(filtered);
    }, [filterLevel, filterDate, quizzes]);

    return (
        <div>
            <Header/>
            <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Submitted Quizzes
                    </h1>
                    <div className="flex flex-col md:flex-row items-center md:items-start mb-4">
                        <ProgressCircle percentage={percentage} size={120} strokeWidth={12} />
                        <div className="ml-0 md:ml-6 mt-4 md:mt-0">
                            <p className="text-lg text-gray-800 dark:text-gray-300">
                                {submittedQuizzes} out of {totalQuizzes} quizzes completed
                            </p>
                        </div>
                    </div>
                    <div className="mb-4 flex flex-col md:flex-row items-center">
                        <select
                            value={filterLevel}
                            onChange={(e) => setFilterLevel(e.target.value)}
                            className="p-2 border rounded-lg mr-4 mb-2 md:mb-0 dark:bg-gray-700 dark:text-gray-100"
                        >
                            <option value="all">All Levels</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <select
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>
                </div>
                <table className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                    <thead className="bg-gray-200 dark:bg-gray-700">
                    <tr>
                        <th className="p-4 text-left">Title</th>
                        <th className="p-4 text-left">Description</th>
                        <th className="p-4 text-left">Score</th>
                        <th className="p-4 text-left">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredQuizzes.map((quiz) => (
                        <tr key={quiz.id} className="border-b dark:border-gray-600">
                            <td className="p-4 text-gray-900 dark:text-gray-100">{quiz.title}</td>
                            <td className="p-4 text-gray-900 dark:text-gray-100">{quiz.description}</td>
                            <td className="p-4 text-gray-900 dark:text-gray-100">{quiz.raw_score}</td>
                            <td className="p-4 text-gray-900 dark:text-gray-100">{new Date(quiz.date_taken).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubmittedQuizzes;
