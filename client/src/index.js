import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import HomePage from "./scenes/HomePage";
import About from "./scenes/About";
import QuizPage from "./scenes/QuizPage";
import NewQuizz from "./scenes/NewQuizz";
import RegisterPage from "./scenes/RegisterPage";
import LoginPage from "./scenes/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={
                <PrivateRoute>
                    <HomePage/>
                </PrivateRoute>
            }/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/Quizz" element={
                <PrivateRoute accessible={false}>
                    <QuizPage/>
                </PrivateRoute>
            }/>
            <Route path="/createquiz" element={
                <PrivateRoute accessible={false}>
                    <NewQuizz/>
                </PrivateRoute>
                }/>
        </Routes>
    </Router>
  </React.StrictMode>
);
