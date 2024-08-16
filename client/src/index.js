import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import HomePage from "./scenes/HomePage";
import About from "./scenes/About";
import QuizPage from "./scenes/QuizPage";
import NewQuizz from "./scenes/NewQuizz";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/Quizz" element={<QuizPage/>}/>
            <Route path="/createquizz" element={<NewQuizz/>}/>
        </Routes>
    </Router>
  </React.StrictMode>
);
