import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    {/* Logo & Description */}
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h1 className="text-2xl font-bold mb-2 text-white">QuizMaster</h1>
                        <p className="text-gray-400">
                            QuizMaster is your go-to platform for challenging and fun quizzes. Test your knowledge and track your progress with ease!
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col md:flex-row md:space-x-8 mb-6 md:mb-0">
                        <Link to="/" className="text-gray-300 hover:text-white mb-2 md:mb-0">Home</Link>
                        <Link to="/about" className="text-gray-300 hover:text-white mb-2 md:mb-0">About</Link>
                        <Link to="/createquiz" className="text-gray-300 hover:text-white mb-2 md:mb-0">Create Quiz</Link>
                        <Link to="/quizzes/created" className="text-gray-300 hover:text-white mb-2 md:mb-0">Created Quizzes</Link>
                        <Link to="/quizzes/submitted" className="text-gray-300 hover:text-white">Submitted Quizzes</Link>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex space-x-6">
                        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FaGithub className="w-6 h-6" />
                        </a>
                        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FaLinkedin className="w-6 h-6" />
                        </a>
                        <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <FaTwitter className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="text-center mt-8 border-t border-gray-700 pt-4">
                    <p className="text-gray-500 text-sm">
                        &copy; 2024 QuizMaster. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
