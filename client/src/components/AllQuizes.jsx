import React from "react";
import { Link } from 'react-router-dom';
import test_img from "../images/test_img.png";

const AllQuizes = () => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <p className='gothic flex flex-col lg:flex-row justify-center text-3xl py-6 dark:text-gray-200'>
                Available Quizzes
            </p>
            <div className='flex flex-col lg:flex-row justify-center'>
                <div className='grid grid-cols-4 gap-4 p-6'>
                    <div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105'>
                        {/* Image Cover */}
                        <img src={test_img} alt="Quiz Cover" className="w-full h-48 object-cover" />

                        <div className='p-4'>
                            <Link to="#" className='text-xl font-semibold mb-2'>Title:</Link>
                            <p className='text-gray-700'>Description:</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllQuizes;
