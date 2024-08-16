import React from "react";

const Navbar = () => {
    return (
        <nav className="flex flex-row justify-center items-center space-x-14 text-lg">
            <a href="/">Home</a>
            <a href="/Quizz">Start Now</a>
            <a href="/createQuizz">Build Quiz</a>
            <a href="/about">About</a>
            <a>Contact</a>
        </nav>
    )
}

export default Navbar;