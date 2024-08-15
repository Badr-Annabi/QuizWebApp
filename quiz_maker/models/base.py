from db import db

class BaseModel(db.Model):
    __abstract__ = True

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
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
