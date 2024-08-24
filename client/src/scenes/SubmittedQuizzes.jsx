import React, { useState, useEffect } from 'react';
import ProgressCircle from '../components/ProgressCircle';
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';

const SubmittedQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [filterLevel, setFilterLevel] = useState('all');
    const [filterDate, setFilterDate] = useState('desc');
    const [totalQuizzes, setTotalQuizzes] = useState(0);
    const [submittedQuizzes, setSubmittedQuizzes] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const navigate = useNavigate();

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
                setQuizzes(Array.isArray(data) ? data : []); // Ensure quizzes is an array
                setFilteredQuizzes(Array.isArray(data) ? data : []); // Ensure filteredQuizzes is an array

                const totalResponse = await fetch('http://127.0.0.1:5000/quizzes');
                const totalData = await totalResponse.json();
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

    const handleRetakeQuiz = (quizId) => {
        navigate(`/quizzes/${quizId}/submit`);
    };

    return (
        <div>
            <Header />
            <div className="p-6 bg-gray-100 dark:text-gray-100 dark:bg-gray-900 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Submitted Quizzes
                    </h1>
                    <div className="flex flex-col font-bold text-lg md:flex-row items-center md:items-start mb-4">
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
                        <th className="p-4 text-left text-gray-900 dark:text-gray-100">Title</th>
                        <th className="p-4 text-left text-gray-900 dark:text-gray-100">Description</th>
                        <th className="p-4 text-left text-gray-900 dark:text-gray-100">Score</th>
                        <th className="p-4 text-left text-gray-900 dark:text-gray-100">Date</th>
                        <th className="p-4 text-left text-gray-900 dark:text-gray-100">Actions</th> {/* New Actions Column */}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredQuizzes.map((quiz) => (
                        <tr key={quiz.id} className="border-b dark:border-gray-600">
                            <td className="p-4 text-gray-900 dark:text-gray-100">{quiz.title}</td>
                            <td className="p-4 text-gray-900 dark:text-gray-100">{quiz.description}</td>
                            <td className="p-4 text-gray-900 dark:text-gray-100">{quiz.raw_score}</td>
                            <td className="p-4 text-gray-900 dark:text-gray-100">{new Date(quiz.date_taken).toLocaleString()}</td>
                            <td className="p-4">
                                <button
                                    onClick={() => handleRetakeQuiz(quiz.id)}
                                    className="relative inline-flex items-center justify-start px-4 py-2 overflow-hidden font-bold rounded-full group text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white dark:from-blue-400 dark:to-purple-400 dark:text-gray-900"
                                >
                                    <span
                                        className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%] dark:bg-gray-800 dark:opacity-[7%]"></span>
                                    <span
                                        className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8 dark:bg-gray-800 dark:opacity-50"></span>
                                    <span
                                        className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-gray-900 dark:group-hover:text-gray-100">
                                        Retake Quiz
                                    </span>
                                    <span
                                        className="absolute inset-0 border-2 border-white rounded-full dark:border-gray-600"></span>
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubmittedQuizzes;
