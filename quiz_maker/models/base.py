from datetime import time
from db import db
import uuid
from datetime import datetime


class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.String(60), primary_key=True, default=lambda:
                str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """ Initialisation for the base object """
        if not self.id:
           self.id = str(uuid.uuid4())
           self.created_at = datetime.utcnow()
           self.updated_at = self.created_at

    @classmethod
    def create(cls, **kwargs):
        instance = cls(**kwargs)
        db.session.add(instance)
        db.session.commit()
        return instance

    @classmethod
    def get(cls, id):
        return cls.query.get(id)

    @classmethod
    def update(cls, id, **kwargs):
        instance = cls.query.get(id)
        if instance:
            for key, value in kwargs.items():
                setattr(instance, key, value)
            db.session.commit()
        return instance

    @classmethod
    def delete(cls, id):
        instance = cls.query.get(id)
        if instance:
            db.session.delete(instance)
            db.session.commit()
        return instance

    def to_dict(self):
        new_dict = self.__dict__.copy()
        if "created_at" in new_dict:
            new_dict["created_at"] = new_dict["created_at"].strftime(time)
        if "updated_at" in new_dict:
            new_dict["updated_at"] = new_dict["updated_at"].strftime(time)
            new_dict["__class__"] = self.__class__.__name__
        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]
        return new_dict
#         return {c.name: getattr(self, c.name) for c in self.__table__.columns}
