#!/usr/bin/python3
""" This is base parent class for user , questions and answers classes """
from datetime import datetime
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
import uuid
import models

time = "%Y-%m-%dT%H:%M:%S.%f"


Base = declarative_base()


class BaseModel:
    """ The Base class from which other classes will be derived """

    id = Column(String(60), primary_key=True, default=lambda:
                str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """ Initialisation for the base object """
        if not self.id:
            self.id = str(uuid.uuid4())
        self.created_at = datetime.utcnow()
        self.updated_at = self.created_at

    def __str__(self):
        """ String representation of Base class """
        return "[{:s}] ({:s}) {}".format(self.__class__.__name__, self.id,
                                         self.__dict__)

    def save(self, storage_test):
        """ update the attribute 'updated_at' with the current datetime"""
        self.updated_at = datetime.utcnow()
        if storage_test is None:
            models.storage.new()
            models.storage.save()
        else:
            storage_test.new(self)
            storage_test.save()

    def to_dict(self):
        """returns a dictionary containing all keys/values of the instance"""
        new_dict = self.__dict__.copy()
        if "created_at" in new_dict:
            new_dict["created_at"] = new_dict["created_at"].strftime(time)
        if "updated_at" in new_dict:
            new_dict["updated_at"] = new_dict["updated_at"].strftime(time)
        new_dict["__class__"] = self.__class__.__name__
        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]
        return new_dict

    def delete(self, storage_test):
        """ delete the current instance from the storage"""
        if storage_test is None:
            models.storage.delete(self)
        else:
            storage_test.delete(self)
