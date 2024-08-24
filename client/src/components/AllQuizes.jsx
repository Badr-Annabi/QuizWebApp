import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import test_img from "../images/test_img.png";

const AllQuizes = () => {
    const [quizzes, setQuizesData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 });
        fetchQuizzes();
    }, []);

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

    const getBackgroundColor = (level) => {
        switch (level) {
            case 'easy':
                return 'bg-gradient-to-r from-green-300 to-green-500 text-green-900';
            case 'medium':
                return 'bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900';
            case 'hard':
                return 'bg-gradient-to-r from-red-300 to-red-500 text-red-900';
            default:
                return 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900';
        }
    };

    const handleTakeQuiz = (quizId) => {
        navigate(`/quizzes/${quizId}/submit`);
    };

    return (
        <div id="Allquizes" className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <p className='gothic flex flex-col lg:flex-row justify-center text-3xl py-6 dark:text-gray-200'>
                Available Quizzes
            </p>
            <div className='flex flex-col lg:flex-row justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6'>
                    {quizzes && quizzes.map((quiz, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={`${index * 100}`} // Delay the animation based on the index
                            className={`relative bg-gray-300 dark:bg-indigo-300 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 group`}
                        >
                            {/* Image Cover */}
                            <img src={test_img} alt="Quiz Cover" className="w-full h-48 object-cover" />

                            {/* Mirror Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-40 group-hover:opacity-0 transition duration-500"></div>

                            <div className='flex flex-col p-4 relative z-10'>
                                <p className='text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100'>
                                    Title: {quiz.title}
                                </p>
                                <p className='text-gray-700 dark:text-gray-300 mb-4'>Description: {quiz.description}</p>

                                {/* Level Badge */}
                                <div className="flex justify-center mb-4">
                                    <span className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${getBackgroundColor(quiz.level)}`}>
                                        Level: {quiz.level}
                                    </span>
                                </div>

                                {quiz.questions && quiz.questions.length > 0 && (
                                    <button
                                        onClick={() => handleTakeQuiz(quiz.id)}
                                        className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-black transition-transform transform hover:-translate-y-1"
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
