#!/usr/bin/python3
""" This is dbstorage class that define all methods to handle database """

import models
import sqlalchemy
from models.user import User
from models.answers import Answer
from models.questions import Question
from models.teacher import Teacher
from models.student import Student
from models.quiz import Quiz
from sqlalchemy import create_engine
from models.basemodel import Base, BaseModel
from os import getenv
from sqlalchemy.orm import scoped_session, sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

classes = {"Answer": Answer, "Question": Question,  "Teacher": Teacher , "Student": Student, "Quiz": Quiz}


class DBStorage:
    """ DBStorage class with database """
    __engine = None
    __session = None

    def __init__(self):
        """ Instantiate a DBStorage object """
        env = os.getenv('ENV', 'prod')
        
        # Dynamically select database connection parameters
        db_user = os.getenv(f"{env.upper()}_MYSQL_USER")
        db_pwd = os.getenv(f"{env.upper()}_MYSQL_PWD")
        db_host = os.getenv(f"{env.upper()}_MYSQL_HOST")
        db_name = os.getenv(f"{env.upper()}_MYSQL_DB")

        self.__engine = create_engine(f'mysql://{db_user}:{db_pwd}@{db_host}/{db_name}')
        
        Base.metadata.create_all(self.__engine)
        
        session_factory = sessionmaker(bind=self.__engine)
        Session = scoped_session(session_factory)
        self.__session = Session()

    def all(self, cls=None):
        """ query the database session """
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return new_dict

    def new(self, obj):
        """ add an object to the database session """
        self.__session.add(obj)

    def save(self):
        """ commit all changes to database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """ delete from database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def close(self):
        """Close the session."""
        if self.__session:
            self.__session.close()

    def get(self, cls, id):
        """ returns an object basen on cls and its id """
        if cls not in classes.values():
            return None
        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (value.id == id):
                return value
        return None

    def clear_data(self):
        """Clear all data from the database tables."""
        for cls in classes.values():
            print(f"Clearing data from {cls.__tablename__}...")
            self.__session.query(cls).delete()
        self.__session.commit()
        print("Data cleared successfully.")
        

    def drop_tables(self):
        """Drop all tables from the database."""
        if self.env == "test":
            Base.metadata.drop_all(self.__engine)

    def get_database_name(self):
        """Return the database name."""
        if self.__engine:
            return self.__engine.url.database
        return None