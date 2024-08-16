import React from 'react';
import '../styles/index.css'; // Ensure this file contains the animation CSS
import {useNavigate} from "react-router-dom";


const HeroSection = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/createquizz');
    }

    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div
                className="bg-gray-50 dark:bg-gray-800 dark:text-gray-200 text-black p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl w-full mx-4 transform transition-transform duration-700 ease-in-out hover:scale-105 animate-bounce-infinite"
                // style={{ animation: 'bounceInfinite 2s infinite' }}
            >
                <h1 className="text-5xl font-extrabold mb-6 text-center tracking-tight">Welcome to QuizMaster</h1>
                <p className="text-xl text-center mb-8 text-gray-700 dark:text-gray-300">
                    Challenge yourself with our diverse range of quizzes and track your progress over time.
                    Are you ready to test your knowledge and become a quiz master?
                </p>
                <div className="flex justify-center items-center space-x-4">
                    <button
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        Start Quiz
                    </button>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Or</span>
                    <button
                        onClick={handleClick}
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Create Quiz
                    </button>

                </div>
            </div>
        </section>
    );
}

export default HeroSection;

//
//
// const HeroSection = () => {
//     return (
//         <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
//             <div
//                 className="bg-gray-50 dark:bg-gray-800 dark:text-gray-200 text-black p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl w-full mx-4 transform transition-transform duration-700 ease-in-out hover:scale-105"
//                 style={{ animation: 'fadeInUp 1s ease-in-out' }}
//             >
//                 <h1 className="text-5xl font-extrabold mb-6 text-center tracking-tight">Welcome to QuizMaster</h1>
//                 <p className="text-xl text-center mb-8 text-gray-700 dark:text-gray-300">
//                     Challenge yourself with our diverse range of quizzes and track your progress over time.
//                     Are you ready to test your knowledge and become a quiz master?
//                 </p>
//                 <div className="flex justify-center items-center space-x-4">
//                     <button
//                         className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
//                         Start Quiz
//                     </button>
//                     <span className="text-gray-600 dark:text-gray-400 font-medium">Or</span>
//                     <button
//                         className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
//                         Create Quiz
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// }
//
// export default HeroSection;

