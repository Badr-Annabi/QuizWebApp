import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ResultPage = () => {
    const { quizId } = useParams();
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/users/${quizId}/result`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setResult(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || 'Failed to fetch result');
                }
            } catch (error) {
                setError('An error occurred while fetching results');
            }
        };

        fetchResult();
    }, [quizId]);

    if (error) return <div>Error: {error}</div>;

    if (!result) return <div>Loading...</div>;

    return (
        <div>
            <h1>Quiz Results</h1>
            <p><strong>Quiz Title:</strong> {result.quiz_title}</p>
            <p><strong>Raw Score:</strong> {result.raw_score}</p>
            <p><strong>Total Questions:</strong> {result.total_questions}</p>
            <p><strong>Date Taken:</strong> {new Date(result.date_taken).toLocaleDateString()}</p>
        </div>
    );
};

export default ResultPage;
