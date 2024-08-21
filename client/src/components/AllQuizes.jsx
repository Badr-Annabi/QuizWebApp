import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import test_img from "../images/test_img.png";

const AllQuizes = () => {
    const [quizzes, setQuizesData] = useState([]);
    const navigate = useNavigate();

    const fetchQuizzes = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/quizzes', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const quizzesData = await response.json();
                console.log("Fetched quizzes:", quizzesData);
                setQuizesData(quizzesData);
            } else {
                console.error('Failed to fetch quizzes');
            }
        } catch (error) {
            console.error('An error occurred while fetching quizzes', error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []); 

    const getBackgroundColor = (level) => {
        switch (level) {
            case 'easy':
                return 'bg-green-200 dark:bg-green-700';
            case 'medium':
                return 'bg-yellow-200 dark:bg-yellow-700';
            case 'hard':
                return 'bg-red-200 dark:bg-red-700';
            default:
                return 'bg-gray-200 dark:bg-gray-700';
        }
    };

    const handleTakeQuiz = (quizId) => {
        navigate(`/quizzes/${quizId}/submit`);
    };
    // console.log(quizzes[1]);

    return (
        <div id="Allquizes" className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <p className='gothic flex flex-col lg:flex-row justify-center text-3xl py-6 dark:text-gray-200'>
                Available Quizzes
            </p>
            <div className='flex flex-col lg:flex-row justify-center'>
                <div className='grid grid-cols-4 gap-4 p-6'>
                    {quizzes && quizzes.map((quiz, index) => (
                        <div key={index} className={`bg-gray-200 dark:bg-indigo-200 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105`}>
                            {/* Image Cover */}
                            <img src={test_img} alt="Quiz Cover" className="w-full h-48 object-cover" />
                            <div className='p-4'>
                                <p className='text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                                    Title: {quiz.title}
                                </p>
                                <p className='text-gray-700 dark:text-gray-300'>Description: {quiz.description}</p>
                                <p className='text-gray-700 dark:text-gray-300'>Level: {quiz.level}</p>
                                
                                {quiz.questions && quiz.questions.length > 0 && (
                                    <button
                                        onClick={() => handleTakeQuiz(quiz.id)}
                                        className="mt-4 inline-block bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                                    >
                                        Take Quiz
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllQuizes;
