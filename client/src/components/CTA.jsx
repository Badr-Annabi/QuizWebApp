import React from 'react';
import '../styles/index.css'; // Ensure this CSS file is created

const CallToAction = () => {
    return (
        <section className="relative py-12 bg-blue-500 text-white overflow-hidden">
            {/* Floating Cubes */}
            <div className="floating-cubes">
                {[...Array(30)].map((_, index) => (
                    <div
                        key={index}
                        className="cube"
                        style={{
                            width: `${Math.random() * 40 + 20}px`,
                            height: `${Math.random() * 40 + 20}px`,
                            backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`,
                            animationDuration: `${Math.random() * 10 + 5}s`,
                            animationDelay: `${Math.random() * 10}s`,
                            left: `${Math.random() * 100}vw`,
                            top: `${Math.random() * 100}vh`,
                        }}
                    ></div>
                ))}
            </div>
            <div className="container mx-auto p-8 text-center relative z-10">
                <h2 className="text-4xl font-extrabold mb-4 text-shadow-lg">Ready to Get Started?</h2>
                <p className="text-lg mb-6">Join us today and start exploring a world of quizzes and challenges!</p>
                <button className="bg-green-500 py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-300">
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default CallToAction;
