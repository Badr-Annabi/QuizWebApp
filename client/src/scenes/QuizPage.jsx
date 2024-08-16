import React, { useState } from 'react';
import '../styles/index.css';
import Header from "../components/Header";

const QuizPage = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (selectedOption !== null) {
            alert(`You selected: ${selectedOption}`);
        } else {
            alert('Please select an option before submitting.');
        }
    };

    return (
        <div>
            <Header />
            <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl w-full mx-4">
                    <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-500 dark:text-white tracking-tight">Question</h1>
                    <ul className="text-xl text-center mb-8">
                        {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option, index) => (
                            <li key={index} className="my-2">
                                <button
                                    onClick={() => handleOptionChange(option)}
                                    className={`py-3 px-6 w-full rounded-lg transition-colors dark:text-blue-400 duration-500 ease-in-out ${
                                        selectedOption === option
                                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg  dark:text-orange-400"
                                            : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300'
                                    } hover:bg-indigo-600 hover:text-white backdrop-blur-md`}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-center items-center space-x-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuizPage;

