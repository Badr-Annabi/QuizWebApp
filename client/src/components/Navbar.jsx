import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuth } from "./PrivateRoute";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const togglePopover = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = '/';
                logout();
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout', error);
        }
    };



    const handleProfileClick = () => {
        if (user && user.id) {
            navigate(`/users/profile`);
            setIsPopoverOpen(false);
        }
    };

    const handleQuizzesClick = () => {
        navigate('/quizzes/created');
    };

    const handleSubmittedQuizzesClick = () => {
        navigate('/quizzes/submitted');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">Home</Link>
                    </div>
                    <div className="hidden md:flex md:items-center md:space-x-10 text-lg">
                        <Link to="/createquiz" className="hover:text-blue-600 dark:hover:text-blue-400">Build Quiz</Link>
                        <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</Link>
                        <a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={togglePopover}
                                    className="text-gray-900 dark:text-gray-100 focus:outline-none"
                                >
                                    <FaUserCircle size={24} />
                                </button>
                                {isPopoverOpen && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-20">
                                        <button
                                            onClick={handleProfileClick}
                                            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Profile
                                        </button>
                                        <button
                                            onClick={handleQuizzesClick}
                                            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            My Quizzes
                                        </button>
                                        <button
                                            onClick={handleSubmittedQuizzesClick}
                                            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Submitted Quizzes
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsPopoverOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="border-gray-900 dark:border-white border-2 rounded-md hover:rounded-xl hover:bg-amber-50 dark:hover:text-gray-700 transition-all duration-300 ease-in-out p-2 ml-auto"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="border-gray-900 dark:border-white border-2 rounded-md hover:rounded-xl hover:bg-amber-50 dark:hover:text-gray-700 transition-all duration-300 ease-in-out p-2"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className={`text-gray-900 dark:text-gray-100 focus:outline-none transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden transition-transform duration-300 ease-in-out transform bg-white dark:bg-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                        <Link
                            to="/createquiz"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            Build Quiz
                        </Link>
                        <Link
                            to="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            About
                        </Link>
                        <a
                            href="#contact"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            Contact
                        </a>
                        {user ? (
                            <>
                                <button
                                    onClick={handleProfileClick}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={handleQuizzesClick}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    My Quizzes
                                </button>
                                <button
                                    onClick={handleSubmittedQuizzesClick}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Submitted Quizzes
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

