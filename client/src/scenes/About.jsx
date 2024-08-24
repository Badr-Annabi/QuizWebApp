import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Oumaima from "../images/oumaima.png";
import Badr from "../images/Badr.png"

const About = () => {
    React.useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div>
            <Header/>
        <section className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-cover bg-center h-80" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                        <h1 className="text-5xl font-extrabold mb-4" data-aos="fade-up">About QuizMaster</h1>
                        <p className="text-lg mb-8" data-aos="fade-up" data-aos-delay="200">
                            Welcome to QuizMaster, a platform where you can challenge yourself with a diverse range of quizzes. Our mission is to make learning fun and engaging while allowing you to track your progress and compete with others.
                        </p>
                    </div>
                </div>
            </div>

            {/* Project Details */}
            <div className="container mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" data-aos="fade-right">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Mission</h2>
                        <p className="text-gray-700 dark:text-gray-400">
                            At QuizMaster, our goal is to provide an intuitive and engaging platform for quizzes. Whether you're here to test your knowledge or create new quizzes, we aim to make your experience enjoyable and enriching.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" data-aos="fade-left">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Features</h2>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
                            <li>Wide variety of quizzes across different categories</li>
                            <li>Create and manage your own quizzes</li>
                            <li>Track your progress and compete with others</li>
                            <li>Engaging and interactive user experience</li>
                        </ul>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mt-12">
                    <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 dark:text-gray-200" data-aos="fade-up">
                        Meet The Team
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {/* Team Member 1 */}
                        <div className="bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-xs text-center relative overflow-hidden group" data-aos="flip-left">
                            <div className="absolute inset-0 bg-gray-900 opacity-75 group-hover:opacity-0 transition-opacity duration-300"></div>
                            <img src={Badr} alt="Team Member 1" className="w-24 h-24 rounded-full mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-200">Badr Annabi</h3>
                            <p className="text-gray-300">Backend Software Engineer</p>
                            <div className="mt-4 flex justify-center space-x-4">
                                <a href="https://github.com/Badr-Annabi" target="_blank" rel="noopener noreferrer"
                                   className="text-gray-400 hover:text-gray-100">
                                    <FaGithub className="w-6 h-6"/>
                                </a>
                                <a href="https://www.linkedin.com/in/badr-annabi/" target="_blank"
                                   rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100">
                                    <FaLinkedin className="w-6 h-6"/>
                                </a>
                                <a href="https://x.com/annabi_badr" target="_blank" rel="noopener noreferrer"
                                   className="text-gray-400 hover:text-gray-100">
                                    <FaTwitter className="w-6 h-6"/>
                                </a>
                            </div>
                        </div>

                        {/* Team Member 2 */}
                        <div
                            className="bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-xs text-center relative overflow-hidden group"
                            data-aos="flip-right">
                        <div className="absolute inset-0 bg-gray-900 opacity-75 group-hover:opacity-0 transition-opacity duration-300"></div>
                            <img src={Oumaima} alt="Team Member 2" className="w-24 h-24 rounded-full mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
                            <h3 className="text-xl font-semibold mb-2 text-gray-200">Oumaima Naanaa</h3>
                            <p className="text-gray-300">Backend Software Engineer</p>
                            <div className="mt-4 flex justify-center space-x-4">
                                <a href="https://github.com/naanaa59" target="_blank" rel="noopener noreferrer"
                                   className="text-gray-400 hover:text-gray-100">
                                    <FaGithub className="w-6 h-6"/>
                                </a>
                                <a href="https://www.linkedin.com/in/oumaima-naanaa/" target="_blank"
                                   rel="noopener noreferrer" className="text-gray-400 hover:text-gray-100">
                                    <FaLinkedin className="w-6 h-6"/>
                                </a>
                                <a href="https://x.com/naanaa_oumaima" target="_blank" rel="noopener noreferrer"
                                   className="text-gray-400 hover:text-gray-100">
                                    <FaTwitter className="w-6 h-6"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            <Footer/>
        </div>
    );
};

export default About;
