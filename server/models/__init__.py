from dotenv import load_dotenv
from os import getenv, path
from models.engine.db_storage import DBStorage


# Load environment variables for production


storage = DBStorage()
print("Production Storage Database:", storage.get_database_name())
