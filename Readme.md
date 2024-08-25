# Quiz Master Web App

## Table of Contents

- [Authors](#authors)
- [Description](#description)
- [Demo](#demo)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)

## Authors
<a href="https://github.com/Badr-Annabi"> Badr Annabi</a><br>
<a href="https://github.com/naanaa59"> Oumaima Naanaa</a><br>

## Description
The Quiz Maker Application is a web-based platform that allows users to create, manage, and take quizzes. The application is designed with user authentication and supports various user roles.
Users can create quizzes, submit answers, view results, and manage their profiles.

## Demo
<a href="https://www.youtube.com/watch?v=e1YPczDhqs4" target="_blank">
 <img src="https://img.youtube.com/vi/e1YPczDhqs4/0.jpg" alt="Video Title" width="auto" height="auto" border="10" />
</a>

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Badr-Annabi/QuizWebApp.git
   cd QuizWebApp
2. Install dependencies:
    ```bash
    cd client
    npm install

## Configuration:
   #### Setting up the .env file

- Navigate to the server folder:
    ```bash
    cd server

- Create a new file named .env:
    ```bash
    vim .env

- Open the .env file in your preferred text editor and add the following configurations:
    ```bash
    SECRET_KEY= your_secret_key

- Creating a Secret Key:
 To generate a secure secret key, you can use the following command in your terminal:
    ```bash
    openssl rand -hex 32
- Copy the output and paste it as the value for SECRET_KEY in your .env file.

## Usage

- Make sure the "start_app.sh" script is in your server folder:

1.  Start the Redis server
2. Start the backend server
3. Start the frontend development server

- Make sure the script has execute permissions:
    ```bash
    chmod +x start_app.sh
 - To start both the frontend and backend servers, including Redis, use the provided start script:
    ```bash
    ./start_app.sh
    #for unittest run this:
    ./start_app.sh test

## Contributing:

1. Fork the repository 
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
