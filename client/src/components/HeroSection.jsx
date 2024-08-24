import React, { useState } from 'react';
import '../styles/index.css'; // Ensure this file contains the animation CSS
import { useNavigate } from "react-router-dom";
import Popover from "./Popover"
import {useAuth} from "./PrivateRoute";

const HeroSection = () => {
    const { user } = useAuth()
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [showPopover, setShowPopover] = useState(false);


    const handleStartQuizClick = () => {
        const element = document.getElementById("Allquizes");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    const handleClick = () => {
        navigate('/createquiz');
    }

    return (
        <section className="relative flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
            {user && showPopover && <Popover user={user} onClose={() => setShowPopover(false)} />}

            {user && (
                <button
                    className="absolute top-16 left-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-full shadow-lg"
                    style={{ zIndex: 10 }}
                    onClick={() => setShowPopover(!showPopover)}
                >
                    My Info
                </button>
            )}
            {/* Animated Stars */}
            <div className="floating-stars">
                {[...Array(50)].map((_, index) => (
                    <div
                        key={index}
                        className="star"
                        style={{
                            width: `${Math.random() * 5 + 2}px`,
                            height: `${Math.random() * 5 + 2}px`,
                            top: `${Math.random() * 100}vh`,
                            left: `${Math.random() * 100}vw`,
                            animationDuration: `${Math.random() * 10 + 5}s`,
                            animationDelay: `${Math.random() * 10}s`,
                            filter: `blur(${Math.random() * 2}px)`,
                        }}
                    ></div>
                ))}
            </div>

            <div
                className={`bg-gray-50 dark:bg-gray-800 dark:text-gray-200 text-black p-8 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl w-full mx-4 ${isHovered ? '' : 'animate-bounce-infinite'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <h1 className="text-5xl font-extrabold mb-6 text-center tracking-tight">Welcome to QuizMaster</h1>
                <p className="text-xl text-center mb-8 text-gray-700 dark:text-gray-300">
                    Challenge yourself with our diverse range of quizzes and track your progress over time.
                    Are you ready to test your knowledge and become a quiz master?
                </p>
                <div className="flex justify-center items-center space-x-4">
                    <button
                        onClick={handleStartQuizClick}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
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
