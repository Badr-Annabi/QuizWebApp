import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/index.css';
import Header from "../components/Header";

const QuizPage = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/quizzes/${quizId}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const quizData = await response.json();
                    setQuiz(quizData);
                } else {
                    console.error('Failed to fetch quiz');
                }
            } catch (error) {
                console.error('An error occurred while fetching the quiz', error);
            }
        };

        fetchQuiz();
    }, [quizId]);

    const handleOptionChange = (option) => {
        if (!quiz) return;

        setSelectedOption(option);

        const updatedAnswers = [...answers];
        const existingAnswerIndex = updatedAnswers.findIndex(
            (answer) => answer.questionId === quiz.questions[currentQuestionIndex].id
        );

        if (existingAnswerIndex !== -1) {
            updatedAnswers[existingAnswerIndex] = {
                questionId: quiz.questions[currentQuestionIndex].id,
                selectedOption: option
            };
        } else {
            updatedAnswers.push({
                questionId: quiz.questions[currentQuestionIndex].id,
                selectedOption: option
            });
        }

        setAnswers(updatedAnswers);
    };

    const handleSubmit = async () => {
        if (!quiz) return;

        if (answers.length === quiz.questions.length) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/quizzes/${quizId}/submit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ answers })
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('Quiz completed!');
                    navigate(`/quizzes/${quizId}/result`);
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || 'Failed to submit quiz');
                }
            } catch (error) {
                console.error('An error occurred while submitting the quiz', error);
                alert('An error occurred while submitting the quiz');
            }
        } else {
            alert('Please answer all questions before submitting.');
        }
    };

    const handlePreviousQuestion = () => {
        if (!quiz) return;

        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(
                answers.find((ans) => ans.questionId === quiz.questions[currentQuestionIndex - 1]?.id)?.selectedOption || null
            );
        }
    };

    const handleNextQuestion = () => {
        if (!quiz) return;

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(
                answers.find((ans) => ans.questionId === quiz.questions[currentQuestionIndex + 1]?.id)?.selectedOption || null
            );
        }
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    return (
        <div>
            <Header />
            <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl w-full mx-4">
                    <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-500 dark:text-white tracking-tight">
                        {quiz.questions?.[currentQuestionIndex]?.text || "Loading question..."}
                    </h1>
                    <ul className="text-xl text-center mb-8">
                        {quiz.questions?.[currentQuestionIndex]?.answers?.map((option, index) => (
                            <li key={index} className="my-2">
                                <button
                                    onClick={() => handleOptionChange(option.text)}
                                    className={`py-3 px-6 w-full rounded-lg transition-colors dark:text-blue-400 duration-500 ease-in-out ${
                                        selectedOption === option.text
                                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg dark:text-orange-400"
                                            : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300'
                                    } hover:bg-indigo-600 hover:text-white backdrop-blur-md`}
                                >
                                    {option.text}
                                </button>
                            </li>
                        )) || <li>Loading options...</li>}
                    </ul>
                    <div className="flex justify-between items-center space-x-4">
                        <button
                            onClick={handlePreviousQuestion}
                            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        {isLastQuestion ? (
                            <button
                                onClick={handleSubmit}
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Submit
                            </button>
                        ) : (
                            <button
                                onClick={handleNextQuestion}
                                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuizPage;
