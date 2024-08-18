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
                window.location.href = '/';  // Redirect to login page after logout
                logout();  // Clear user state using the logout function from the context
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout', error);
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">Home</Link>
                    </div>
                    <div className="hidden md:flex md:space-x-10 text-lg">
                        <Link to="/quizz" className="hover:text-blue-600 dark:hover:text-blue-400">Start Now</Link>
                        <Link to="/createquiz" className="hover:text-blue-600 dark:hover:text-blue-400">Build Quiz</Link>
                        <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</Link>
                        <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={togglePopover}
                                    className="text-gray-900 dark:text-gray-100 focus:outline-none"
                                >
                                    <FaUserCircle size={24} />
                                </button>
                                {isPopoverOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-20">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => setIsPopoverOpen(false)}
                                        >
                                            Profile
                                        </Link>
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
                                    className="border-gray-900 dark:border-white border-2 rounded-md hover:rounded-xl hover:bg-amber-50 transition-all duration-300 ease-in-out p-4 ml-auto"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="border-gray-900 dark:border-white border-2 rounded-md hover:rounded-xl hover:bg-amber-50 transition-all duration-300 ease-in-out p-4"
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
                            to="/quizz"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            Start Now
                        </Link>
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
                                <Link
                                    to="/profile"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    Profile
                                </Link>
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
