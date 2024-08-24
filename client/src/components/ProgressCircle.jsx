import React from 'react';

const ProgressCircle = ({ percentage, size = 100, strokeWidth = 10 }) => {
    const validPercentage = isNaN(percentage) || percentage < 0 ? 0 : percentage;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center rounded-b-2xl rounded-tl-2xl  font-bold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#4f46e5"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    fill="none"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    className="transition-transform duration-500"
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                >
                    {validPercentage}%
                </text>
            </svg>
        </div>
    );
};

export default ProgressCircle;
