import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///db.db"


class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///test_db.db"
# class DevelopmentConfig(Config):
#     SQLALCHEMY_DATABASE_URI = (
#         f"mysql://{os.getenv('PROD_MYSQL_USER')}:{os.getenv('PROD_MYSQL_PWD')}@"
#         f"{os.getenv('PROD_MYSQL_HOST')}/{os.getenv('PROD_MYSQL_DB')}"
#     )
#
# class TestingConfig(Config):
#     SQLALCHEMY_DATABASE_URI = (
#         f"mysql://{os.getenv('TEST_MYSQL_USER')}:{os.getenv('TEST_MYSQL_PWD')}@"
#         f"{os.getenv('TEST_MYSQL_HOST')}/{os.getenv('TEST_MYSQL_DB')}"
#     )
