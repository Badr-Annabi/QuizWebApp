import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from "../components/Header";
import Footer from "../components/Footer"
import {FaGithub, FaLinkedin, FaTwitter} from "react-icons/fa";

const ContactPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div>
            <Header/>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-12">
                <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100" data-aos="fade-down">
                    Get in Touch
                </h1>

                <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center justify-around px-6">
                    {/* Contact Form */}
                    <form
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full lg:w-1/2 mb-8 lg:mb-0"
                        data-aos="fade-right"
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                                type="text"
                                id="name"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                                type="email"
                                id="email"
                                placeholder="Your Email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                                id="message"
                                rows="4"
                                placeholder="Your Message"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="w-full lg:w-1/3 text-center" data-aos="fade-left">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact
                            Information</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Feel free to reach out to us through any of the following channels.
                        </p>
                        <ul className="space-y-4">
                            <li className="text-gray-800 dark:text-gray-200">
                                <i className="fas fa-phone-alt"></i> +123 456 7890
                            </li>
                            <li className="text-gray-800 dark:text-gray-200">
                                <i className="fas fa-envelope"></i> contact@company.com
                            </li>
                            <li className="text-gray-800 dark:text-gray-200">
                                <i className="fas fa-map-marker-alt"></i> 123 Street, City, Country
                            </li>
                        </ul>

                        {/* Social Media Icons */}
                        <div
                            className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12 text-center md:text-left">
                            {/* Badr Annabi's Social Media */}
                            <div>
                                <h3 className="text-black dark:text-white font-semibold mb-2">Badr Annabi</h3>
                                <div className="flex justify-center md:justify-start space-x-4">
                                    <a href="https://github.com/Badr-Annabi" target="_blank" rel="noopener noreferrer"
                                       className="text-gray-400 hover:text-white">
                                        <FaGithub className="w-6 h-6"/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/badr-annabi/" target="_blank"
                                       rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                        <FaLinkedin className="w-6 h-6"/>
                                    </a>
                                    <a href="https://x.com/annabi_badr" target="_blank" rel="noopener noreferrer"
                                       className="text-gray-400 hover:text-white">
                                        <FaTwitter className="w-6 h-6"/>
                                    </a>
                                </div>
                            </div>

                            {/* Oumaima Naanaa's Social Media */}
                            <div>
                                <h3 className="text-black dark:text-white mx-auto font-semibold mb-2">Oumaima Naanaa</h3>
                                <div className="flex justify-center md:justify-start space-x-4">
                                    <a href="https://github.com/naanaa59" target="_blank" rel="noopener noreferrer"
                                       className="text-gray-400 hover:text-white">
                                        <FaGithub className="w-6 h-6"/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/oumaima-naanaa/" target="_blank"
                                       rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                        <FaLinkedin className="w-6 h-6"/>
                                    </a>
                                    <a href="https://x.com/naanaa_oumaima" target="_blank" rel="noopener noreferrer"
                                       className="text-gray-400 hover:text-white">
                                        <FaTwitter className="w-6 h-6"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ContactPage;
