import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Header from "../components/Header";

const NewQuizz = () => {
    const [questions, setQuestions] = useState([
        { question: '', answers: [''], correctAnswer: '' }
    ]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('easy'); // Default level is '1'

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (qIndex, aIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers[aIndex] = value;
        setQuestions(newQuestions);
    };

    const addAnswer = (qIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers.push('');
        setQuestions(newQuestions);
    };

    const removeAnswer = (qIndex, aIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers.splice(aIndex, 1);
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (qIndex, answer) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctAnswer = answer;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', answers: [''], correctAnswer: '' }]);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const quizData = {
            title,
            description,
            level,
            questions,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(quizData),
            });

            if (response.ok) {
                console.log('Quiz submitted successfully');
            } else {
                console.error('Failed to submit quiz');
            }
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const levelColors = {
        easy: 'bg-green-500 text-white',
        medium: 'bg-yellow-500 text-black',
        hard: 'bg-red-500 text-white',
    };

    return (
        <div>
            <Header/>
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-60 h-60 bg-indigo-500 opacity-50 blur-3xl"></div>
                    <div className="absolute top-1/4 right-0 w-80 h-80 bg-yellow-500 opacity-60 transform rotate-45 blur-3xl"></div>
                    <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-pink-500 opacity-40 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500 opacity-30 transform rotate-12 blur-3xl"></div>
                </div>

                <div className="relative z-10 bg-gray-50 dark:bg-gray-800 dark:text-gray-200 text-black p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl w-full mx-4 mt-10">
                    <h1 className="text-4xl font-extrabold mb-6 text-center tracking-tight">
                        <PlusIcon className="w-10 h-10 inline-block mr-2"/> Create a New Quiz
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label htmlFor="title" className="block text-lg font-medium">Quiz Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-gray-900 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter quiz title"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-lg font-medium">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="text-gray-900 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter quiz description"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium">Difficulty Level</label>
                            <div className="flex space-x-4 mt-2">
                                {["easy", "medium", "hard"].map((lvl) => (
                                    <button
                                        key={lvl}
                                        type="button"
                                        onClick={() => setLevel(lvl)}
                                        className={`${level === lvl ? levelColors[lvl] : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} p-2 rounded-lg focus:outline-none`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {questions.map((q, qIndex) => (
                            <div key={qIndex} className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor={`question-${qIndex}`} className="block text-lg font-medium">Question {qIndex + 1}</label>
                                    <div className="flex space-x-2">
                                        {questions.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeQuestion(qIndex)}
                                                className="text-red-500 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800 transition-all"
                                            >
                                                <TrashIcon className="w-5 h-5"/>
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={addQuestion}
                                            className="text-green-500 p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-800 transition-all"
                                        >
                                            <PlusIcon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    id={`question-${qIndex}`}
                                    value={q.question}
                                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                    className="text-gray-900 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your question"
                                    required
                                />
                                <div className="mt-4 space-y-4">
                                    {q.answers.map((answer, aIndex) => (
                                        <div key={aIndex} className="flex items-center space-x-4">
                                            <input
                                                type="text"
                                                value={answer}
                                                onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                                                className="text-gray-900 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder={`Answer ${aIndex + 1}`}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeAnswer(qIndex, aIndex)}
                                                className="text-red-500 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800 transition-all"
                                            >
                                                <TrashIcon className="w-5 h-5"/>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleCorrectAnswerChange(qIndex, answer)}
                                                className={`p-1 rounded-full ${q.correctAnswer === answer ? 'text-green-500 bg-green-100 dark:bg-green-800' : 'text-gray-500 hover:text-green-500 hover:bg-green-100 dark:hover:bg-green-800 transition-all'}`}
                                            >
                                                {q.correctAnswer === answer ? '✔️' : 'Set as Correct'}
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addAnswer(qIndex)}
                                        className="flex flex-row items-center text-white p-2 bg-indigo-400 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all mt-2"
                                    >
                                        <PlusIcon className="w-5 h-5"/> Add Answer
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full text-center py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all"
                        >
                            Submit Quiz
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewQuizz;
