#!/bin/bash

REDIS_PORT=6378
FLASK_PORT=5000
CLIENT_DIR="./client"  # Update this path to the actual location of your client directory

# Function to check if Redis is running on the specified port
check_redis() {
    PID=$(sudo lsof -t -i :$REDIS_PORT)

    # Return 0 if Redis is running, otherwise return 1
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
        sleep 2  # Give Redis some time to start
    else
        echo "Port $REDIS_PORT is not in use. Starting Redis..."

        # Attempt to kill any process using the port
        PID=$(sudo lsof -t -i :$REDIS_PORT)
        if [ ! -z "$PID" ]; then
            sudo kill -9 $PID
            sleep 2
            echo "Freed redis port $REDIS_PORT."
        fi

        # Start Redis
        redis-server --port $REDIS_PORT &
        sleep 2  # Give Redis some time to start

        # Check if Redis started successfully
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
        # Run Flask app in the background
        # Attempt to kill any process using the port
        PID=\$(sudo lsof -t -i :$FLASK_PORT)
        if [ ! -z \"\$PID\" ]; then
            sudo kill -9 \$PID
            sleep 2
            echo 'Freed flask port $FLASK_PORT.'
        fi
        python3 server/app.py
        FLASK_PID=\$!
        sleep 2  # Give Flask some time to start

        # Ensure Flask is running
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
        # Change directory to client and check for node_modules
        cd $CLIENT_DIR || exit 1

        if [ ! -d 'node_modules' ]; then
            echo 'node_modules not found. Running npm install...'
            npm install
        fi

        echo 'Starting client with npm...'
        npm start
        CLIENT_PID=\$!
        sleep 2  # Give client some time to start

        # Ensure client is running
        if ps -p \$CLIENT_PID > /dev/null; then
            echo 'Client application started successfully.'
        else
            echo 'Failed to start client application.'
            exit 1
        fi

        # Return to the original directory
        cd - || exit 1
        exec bash
    "
}

# Function to run tests
run_tests() {
    echo "Running tests..."
  
    python3 test_app.py
}

# Check for command line argument
if [ "$1" == "test" ]; then
    export ENV=test
    start_redis
    start_flask
    run_tests
    # Note: Flask and client applications will not be closed after tests
else
    start_redis
    start_flask
    start_client
fi
