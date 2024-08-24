import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Header from "../components/Header";

const EditQuiz = () => {
    const { quizId } = useParams(); // Get quizId from URL parameters
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('easy'); // Default level is 'easy'
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch quiz data based on quizId
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/quizzes/${quizId}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const quiz = await response.json();
                    setTitle(quiz.title);
                    setDescription(quiz.description);
                    setLevel(quiz.level);
                    setQuestions(quiz.questions);
                } else {
                    console.error('Failed to fetch quiz');
                }
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchQuiz();
    }, [quizId]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: '', answers: [] }]);
    };

    const handleRemoveQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuestions = questions.map((q, i) =>
            i === index ? { ...q, [name]: value } : q
        );
        setQuestions(updatedQuestions);
    };

    // const handleAddAnswer = (index) => {
    //     const updatedQuestions = questions.map((q, i) =>
    //         i === index ? { ...q, answers: [...q.answers, ''] } : q
    //     );
    //     setQuestions(updatedQuestions);
    // };

    const handleAddAnswer = (qIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers.push({ text: '', isCorrect: false });
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (qIndex, aIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers.forEach((ans, index) => {
            ans.isCorrect = index === aIndex;
        });
        setQuestions(newQuestions);
    };


    const handleRemoveAnswer = (qIndex, aIndex) => {
        const updatedQuestions = questions.map((q, i) =>
            i === qIndex ? { ...q, answers: q.answers.filter((_, j) => j !== aIndex) } : q
        );
        setQuestions(updatedQuestions);
    };
    // const removeAnswer = (qIndex, aIndex) => {
    //     const newQuestions = [...questions];
    //     newQuestions[qIndex].answers.splice(aIndex, 1);
    //     setQuestions(newQuestions);
    // };


    const handleAnswerChange = (qIndex, aIndex, e) => {
        const { value } = e.target;
        const updatedQuestions = questions.map((q, i) =>
            i === qIndex ? {
                ...q, answers: q.answers.map((a, j) => j === aIndex ? { ...a, text: value } : a)
            } : q
        );
        setQuestions(updatedQuestions);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedQuizData = {
            title,
            description,
            level,
            questions: questions.map((q) => ({
                text: q.text,
                answers: q.answers,
            })),
        };

        try {
            const response = await fetch(`http://127.0.0.1:5000/quizzes/${quizId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(updatedQuizData),
            });

            if (response.ok) {
                console.log('Quiz updated successfully');
                navigate('/');
            } else {
                console.error('Failed to update quiz');
            }
        } catch (error) {
            console.error('Error updating quiz:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900 overflow-hidden">
                <div className="relative z-10 bg-gray-50 dark:bg-gray-800 dark:text-gray-200 text-black p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl w-full mx-4 mt-10">
                    <h1 className="text-4xl font-extrabold mb-6 text-center tracking-tight">
                        <PlusIcon className="w-10 h-10 inline-block mr-2" /> Edit Quiz
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quiz Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Level</label>
                            <select
                                id="level"
                                name="level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <div>
                            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">Questions</h2>
                            {questions.map((question, qIndex) => (
                                <div key={qIndex} className="mt-4">
                                    <label htmlFor={`question-${qIndex}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Question {qIndex + 1}</label>
                                    <input
                                        type="text"
                                        id={`question-${qIndex}`}
                                        name="text"
                                        value={question.text}
                                        onChange={(e) => handleQuestionChange(qIndex, e)}
                                        className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        required
                                    />
                                    <div className="mt-2">
                                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Answers</h3>
                                        {question.answers.map((answer, aIndex) => (
                                            <div key={aIndex} className="flex items-center mt-2">
                                                <input
                                                    type="text"
                                                    value={answer.text}
                                                    onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                                                    className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveAnswer(qIndex, aIndex)}
                                                    className="ml-2 p-2 text-red-600 hover:text-red-800"
                                                >
                                                    <TrashIcon className="w-5 h-5"/>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCorrectAnswerChange(qIndex, aIndex)}
                                                    className={`p-1 rounded-full ${answer.isCorrect ? 'text-green-500 bg-green-100 dark:bg-green-800' : 'text-gray-500 hover:text-green-500 hover:bg-green-100 dark:hover:bg-green-800 transition-all'}`}
                                                >
                                                    {answer.isCorrect ? '✔️' : 'Set as Correct'}
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => handleAddAnswer(qIndex)}
                                            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Add Answer
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveQuestion(qIndex)}
                                        className="mt-2 p-2 text-red-600 hover:text-red
                                                                                hover:text-red-800"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Add Question
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditQuiz;
