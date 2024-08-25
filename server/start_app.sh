#!/bin/bash

REDIS_PORT=6378
FLASK_PORT=5000
CLIENT_DIR="./client"  # Update this path to the actual location of your client directory
VENV_DIR="/usr/bin/python3"  # Update this path to your virtual environment
FLASK_APP_PATH="./server/app.py"  # Update this path to your Flask app

# Function to check if Redis is running on the specified port
check_redis() {
    PID=$(sudo lsof -t -i :$REDIS_PORT)

    if [ -z "$PID" ]; then
        return 1
    else
        return 0
    fi
}

# Function to start Redis if it's not running
start_redis() {
    if check_redis; then
        echo "Redis is already running on port $REDIS_PORT."
        sudo kill $PID
        sleep 2
        redis-server --port $REDIS_PORT &
        sleep 2
    else
        echo "Port $REDIS_PORT is not in use. Starting Redis..."
        PID=$(sudo lsof -t -i :$REDIS_PORT)
        if [ ! -z "$PID" ]; then
            sudo kill -9 $PID
            sleep 2
            echo "Freed redis port $REDIS_PORT."
        fi
        redis-server --port $REDIS_PORT &
        sleep 2
        if check_redis; then
            echo "Redis started successfully on port $REDIS_PORT."
        else
            echo "Failed to start Redis on port $REDIS_PORT."
            exit 1
        fi
    fi
}

# Function to start the Flask application
start_flask() {
    echo "Starting Flask application..."

    gnome-terminal -- bash -c "
        $VENV_DIR $FLASK_APP_PATH
        FLASK_PID=\$!
        sleep 5
        if ps -p \$FLASK_PID > /dev/null; then
            echo 'Flask application started successfully.'
        else
            echo 'Failed to start Flask application.'
            exit 1
        fi
        exec bash
    "
}

# Function to start the client-side application
start_client() {
    echo "Starting client application..."

    gnome-terminal -- bash -c "
        cd $CLIENT_DIR || exit 1
        if [ ! -d 'node_modules' ]; then
            echo 'node_modules not found. Running npm install...'
            npm install
        fi
        echo 'Starting client with npm...'
        npm start
        CLIENT_PID=\$!
        sleep 2
        if ps -p \$CLIENT_PID > /dev/null; then
            echo 'Client application started successfully.'
        else
            echo 'Failed to start client application.'
            exit 1
        fi
        cd - || exit 1
        exec bash
    "
}

# Function to run tests
run_tests() {
    echo "Running tests..."
    python3 server/run_tests.py
}

# Check for command line argument
if [ "$1" == "test" ]; then
    export ENV=test
    start_redis
    start_flask
    sleep 5
    run_tests
    # Kill Flask and Redis
    kill $(ps -e | grep '[r]edis-server' | awk '{print $1}')
    kill $(ps -e | grep '[p]ython3 $FLASK_APP_PATH' | awk '{print $1}')
else
    export ENV=dev
    start_redis
    start_flask
    start_client
fi
