#!/bin/bash

REDIS_PORT=6378

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
        # echo "Redis is already running on port $REDIS_PORT."
        sudo kill $PID

    else
        echo "Port $REDIS_PORT is not in use. Starting Redis..."

        # Attempt to kill any process using the port
        PID=$(sudo lsof -t -i :$REDIS_PORT)
        if [ ! -z "$PID" ]; then
            sudo kill -9 $PID
            echo "Freed port $REDIS_PORT."
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
    
    # Activate virtual environment if necessary
    # source /path/to/your/venv/bin/activate
    
    # Run Flask app (adjust the command as needed)
    python3 app.py
}

# Execute the functions
start_redis
start_flask
