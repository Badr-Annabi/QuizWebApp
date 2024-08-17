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

    def get(self, key: str):
        return self.__engine.get(key).decode('utf-8')

    def set(self, key, value):
        self.__engine.set(key, value)

    def delete_session(self, key):
        self.__engine.delete([key])

    def get_all(self):
        return [key.decode('utf-8') for key in self.__engine.keys()]

db = SQLAlchemy()
sessions = RedisDB()