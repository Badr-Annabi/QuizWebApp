import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">Home</Link>
                    </div>
                    <div className="hidden md:flex md:space-x-10 text-lg">
                        <Link to="/Quizz" className="hover:text-blue-600 dark:hover:text-blue-400">Start Now</Link>
                        <Link to="/createQuizz" className="hover:text-blue-600 dark:hover:text-blue-400">Build Quiz</Link>
                        <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</Link>
                        <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
                        <Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 ml-auto">Login</Link>
                        <Link to="/register" className="hover:text-blue-600 dark:hover:text-blue-400">Sign Up</Link>
                    </div>
                    <div className="flex md:hidden">
                        <button onClick={toggleMenu} className="text-gray-900 dark:text-gray-100 focus:outline-none">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/Quizz" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">Start Now</Link>
                        <Link to="/createQuizz" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">Build Quiz</Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">About</Link>
                        <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
                        <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">Login</Link>
                        <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">Sign Up</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
