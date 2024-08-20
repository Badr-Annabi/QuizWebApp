#!/bin/bash

REDIS_PORT=6380

# Function to check if Redis is running
check_redis() {
    redis-cli -p $REDIS_PORT ping > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        return 1
    else
        return 0
    fi
}

# Start Redis if it's not running
start_redis() {
    if check_redis; then
        echo "Redis is already running on port $REDIS_PORT."
    else
        echo "Starting Redis on port $REDIS_PORT..."
        redis-server --port $REDIS_PORT &
        sleep 2  # Give Redis some time to start
        if check_redis; then
            echo "Redis started successfully."
        else
            echo "Failed to start Redis."
            exit 1
        fi
    fi
}

# Start Flask app
start_flask() {
    echo "Starting Flask application..."
    # Activate virtual environment if necessary
    # source /path/to/your/venv/bin/activate
    
    # Run  Flask app (you might need to adjust this command)
    python3 app.py
}

# Run the functions
start_redis
start_flask
