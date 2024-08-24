import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from "../components/Header";
import Footer from "../components/Footer"

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
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact Information</h2>
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
                        <div className="flex justify-center space-x-6 mt-6">
                            <a href="" className="text-blue-600 dark:text-blue-400 text-2xl hover:text-blue-800 dark:hover:text-blue-600">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" className="text-blue-500 dark:text-blue-300 text-2xl hover:text-blue-700 dark:hover:text-blue-500">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-pink-600 dark:text-pink-400 text-2xl hover:text-pink-800 dark:hover:text-pink-600">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="text-blue-700 dark:text-blue-500 text-2xl hover:text-blue-900 dark:hover:text-blue-700">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ContactPage;
