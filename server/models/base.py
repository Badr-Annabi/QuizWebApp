from redis_cashing import db
import uuid
from datetime import datetime

time = '%Y-%m-%d %H:%M:%S'
class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.String(60), primary_key=True, default=lambda:
                str(uuid.uuid4()), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """Initialization for the base object."""
        super().__init__(*args, **kwargs)


    @classmethod
    def get(cls, id):
        
        instance = cls.query.get(id)
        if instance:
            return instance
        return None

    @classmethod
    def update(cls, id, **kwargs):
        instance = cls.query.get(id)
        if instance:
            for key, value in kwargs.items():
                setattr(instance, key, value)
            try:
                db.session.commit()
            except Exception as e:
                print(e)
        instance = cls.query.get(id) # get the updated instance from database
        return instance

    @classmethod
    def delete(cls, id):
        try:
            instance = cls.query.get(id)
            if instance:
                db.session.delete(instance)
                db.session.commit()
        except Exception as e:
            print(e)
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
        # print("BaseModel to_dict:", new_dict) 
        return new_dict

