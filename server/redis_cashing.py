from datetime import time
import subprocess
from flask_sqlalchemy import SQLAlchemy
import redis

class RedisDB:
    __engine = None
    def __init__(self):
        self.__engine = redis.Redis(
            host='localhost',  # Redis server hostname or IP address
            port=6379,         # Default Redis port
            db=0               # Redis database index (default is 0)
        )
        # self.__engine.flushdb()

    def get(self, key: str):
        return self.__engine.get(key).decode('utf-8')

    def set(self, key, value):
        self.__engine.set(key, value)

    def delete_session(self, key):
        self.__engine.delete(key)

    def get_all(self):
        return [key.decode('utf-8') for key in self.__engine.keys()]
    
    def start_redis_server():
        try:
            # Check if Redis server is running by pinging it
            client = redis.Redis(host='localhost', port=6380, db=0)
            client.ping()
            print("Redis server is already running.")
        except redis.ConnectionError:
            # If Redis server is not running, start it
            print("Starting Redis server...")
            subprocess.Popen(['redis-server', '--port', '6380'])
            time.sleep(2)
            print("Redis server started on port 6380.")

db = SQLAlchemy()
sessions = RedisDB()