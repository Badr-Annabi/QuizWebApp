import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
// import { jwtDecode } from 'jwt-decode'


const InstructorRegisterPage = () => {
    const responseMessage = (credentialResponse) => {
        // const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
        // console.log(credentialResponseDecoded);
    };

    const errorMessage = (error) => {
        console.log(error);
    };
    const [name, setName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasworError] = useState('');
    const navigate = useNavigate();


//   function validatPassword(pwd) {
//     const lowerCase = /[a-z]/;
//     const upperCase = /[A-Z]/;
//     const number = /[0-9]/;
//     const symbol = /[!@#$%^&*]/;
//     const valid = 0;

//     if (pwd.length < 8) {
//         $('.err-pwd').text('Use 8 characters or more for your password');
//     } else if (!lowerCase.test(pwd)) {
//         $('.err-pwd').text('Password should at least have one lowercase letter');
//     } else if (!upperCase.test(pwd)) {
//         $('.err-pwd').text('Password should at least have one uppercase letter');
//     } else if (!number.test(pwd)) {
//         $('.err-pwd').text('Password should at least have one number');
//     } else if (!symbol.test(pwd)) {
//         $('.err-pwd').text('Password should at least have one symbol');
//     } else {
//         valid = 1;
//     }
// }

    const RegisterUser = async (name, familyName, email, password) => {
        try {
            const response = await fetch('http://0.0.0.0:5003/instructor/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"first_name": name,
                    "last_name": familyName,
                    "email": email,
                    "password": password
                }),
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result)
            } else {
                // Handle network error
                console.error('Network error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onButtonClick = (e) => {
        e.preventDefault();
        if (email && password) {
            RegisterUser(name, familyName, email, password);
            //   setRedirect(true);
            navigate("/login")
        } else {
            setNameError('Full Name is required')
            setEmailError('Email is required')
            setPasworError('Password is required')
        }

    }
    return (
        <div className='flex'>
            <div className='bg-indigo-600 w-1/2 flex justify-center items-center'>
                <p className='gothic text-4xl text-center text-white'>You're one step close to be part of our instructors community</p>
            </div>
            <div className='w-1/2 flex flex-col items-center justify-center h-screen'>
                <div className='bg-red-300 '>
                    <div className='gothic text-2xl'>Register Here</div>
                </div>
                <br />
                <div className='my-4'>
                    <GoogleLogin onSuccess={responseMessage}  onError={errorMessage} />
                </div>
                <br/>
                <div className='flex gap-4 mb-8'>
                    <div className='flex flex-col'>
                        <input
                            value={name}
                            placeholder='Name'
                            onChange={(e) => setName(e.target.value)}
                            className='inputBox'
                        />
                        <label className='errorLabel'>{nameError}</label>
                    </div>
                    <br />
                    <div className='flex flex-col'>
                        <input
                            value={familyName}
                            placeholder='Family Name'
                            onChange={(e) => setFamilyName(e.target.value)}
                            className='inputBox'
                        />
                        <label className='errorLabel'>{nameError}</label>
                    </div>
                </div>
                <div className='flex flex-col mb-8'>
                    <input
                        value={email}
                        placeholder='Enter your email'
                        onChange={(e) => setEmail(e.target.value)}
                        className='inputBox'
                    />
                    <label className='errorLabel'>{emailError}</label>
                </div>
                <br />
                <div className='flex flex-col '>
                    <input
                        type='password'
                        value={password}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='inputBox'
                    />
                    <label className='errorLabel'>{passwordError}</label>
                    <input
                        type='password'
                        value={confirmPassword}
                        placeholder='Confirm your password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='inputBox mt-4'
                    />
                    <label className='errorLabel'>{passwordError}</label>
                </div>
                <br />
                <div>
                    <input className="bg-indigo-600" type="button" onClick={onButtonClick} value={'Register'} />
                </div>
                <div className='flex gap-2 text-sm'>
                    <p className='text-gray-400'>already had an account?</p>
                    <Link to="/login">
            <span className='text-indigo-600 hover:underline cursor-pointer'>
              Login
            </span>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default InstructorRegisterPage;