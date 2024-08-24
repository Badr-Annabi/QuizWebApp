import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:justify-between items-center space-y-8 md:space-y-0">
                    {/* Logo & Description */}
                    <div className="text-center md:text-left md:w-1/2">
                        <h1 className="text-2xl font-bold mb-2 text-white">QuizMaster</h1>
                        <p className="text-gray-400">
                            QuizMaster is your go-to platform for challenging and fun quizzes. Test your knowledge and track your progress with ease!
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col items-center md:items-start space-y-8">
                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-300 mb-4">Quick Links</h2>

                        {/* Links */}
                        <div className="flex flex-col space-y-2">
                            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                            <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
                            <Link to="/createquiz" className="text-gray-300 hover:text-white">Create Quiz</Link>
                            <Link to="/quizzes/created" className="text-gray-300 hover:text-white">Created Quizzes</Link>
                            <Link to="/quizzes/submitted" className="text-gray-300 hover:text-white">Submitted Quizzes</Link>
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12 text-center md:text-left">
                        {/* Badr Annabi's Social Media */}
                        <div>
                            <h3 className="text-white font-semibold mb-2">Badr Annabi</h3>
                            <div className="flex justify-center md:justify-start space-x-4">
                                <a href="https://github.com/Badr-Annabi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                    <FaGithub className="w-6 h-6"/>
                                </a>
                                <a href="https://www.linkedin.com/in/badr-annabi/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                    <FaLinkedin className="w-6 h-6"/>
                                </a>
                                <a href="https://x.com/annabi_badr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                    <FaTwitter className="w-6 h-6"/>
                                </a>
                            </div>
                        </div>

                        {/* Oumaima Naanaa's Social Media */}
                        <div>
                            <h3 className="text-white font-semibold mb-2">Oumaima Naanaa</h3>
                            <div className="flex justify-center md:justify-start space-x-4">
                                <a href="https://github.com/naanaa59" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                    <FaGithub className="w-6 h-6"/>
                                </a>
                                <a href="https://www.linkedin.com/in/oumaima-naanaa/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                    <FaLinkedin className="w-6 h-6"/>
                                </a>
                                <a href="https://x.com/naanaa_oumaima" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                    <FaTwitter className="w-6 h-6"/>
                                </a>
                            </div>
                        </div>
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
