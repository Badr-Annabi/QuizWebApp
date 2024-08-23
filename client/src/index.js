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
import ResultPage from "./scenes/ResultsPage";
import ProfilePage from "./scenes/ProfilePage";
import CreatedQuizzesPage from "./scenes/CreatedQuizzesPage";
import SubmittedQuizzes from "./scenes/SubmittedQuizzes";
import EditQuiz from "./scenes/EditQuizPage";

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
            <Route path="/users/profile" element={
                <PrivateRoute accessible={false}>
                    <ProfilePage/>
                </PrivateRoute>
            }/>
            <Route path="/createdquizzes" element={
                <PrivateRoute accessible={false}>
                    <CreatedQuizzesPage/>
                </PrivateRoute>
            }/>
            <Route path="/submittedQuizzes" element={
                <PrivateRoute accessible={false}>
                    <SubmittedQuizzes/>
                </PrivateRoute>
            }/>
            <Route path="/about" element={<About/>} />
            <Route path="/quizzes/:quizId/submit" element={
                <PrivateRoute accessible={false}>
                    <QuizPage/>
                </PrivateRoute>
            }/>
            <Route path="/quizzes/:quizId/result" element={<ResultPage />} />
            <Route path="/createquiz" element={
                <PrivateRoute accessible={false}>
                    <NewQuizz/>
                </PrivateRoute>
                }/>
            <Route path="/edit-quiz/:quizId" element={
                <PrivateRoute accessible={false}>
                    <EditQuiz/>
                </PrivateRoute>
            }/>
        </Routes>
    </Router>
  </React.StrictMode>
);
