import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AllQuizes from "../components/AllQuizes";
import Footer from "../components/Footer";
import CallToAction from "../components/CTA";


const HomePage = () => {
    return (
        <div>
            <Header />
            <HeroSection/>
            <AllQuizes/>
            <CallToAction/>
            <Footer/>
        </div>
    )
}

export default HomePage;