import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AllQuizes from "../components/AllQuizes";


const HomePage = () => {
    return (
        <div>
            <Header />
            <HeroSection/>
            <AllQuizes/>
        </div>
    )
}

export default HomePage;