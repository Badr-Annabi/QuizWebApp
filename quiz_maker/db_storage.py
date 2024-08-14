from app import db

class DBStorage:
    """ DBStorage class with database """
    def all(self, cls=None):
        """ Query all objects """
        new_dict = {}
        for clss in cls.__subclasses__():
            if cls is None or cls is clss:
                objs = db.session.query(clss).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return new_dict

    def get(self, cls, id):
        """ Retrieve an object """
        return db.session.query(cls).get(id)

    def new(self, obj):
        """ Add a new object """
        db.session.add(obj)

    def save(self):
        """ Commit changes to the database """
        db.session.commit()

    def delete(self, obj=None):
        """ Delete an object """
        if obj:
            db.session.delete(obj)

    def reload(self):
        """ Reload the database """
        db.session.remove()
        db.create_all()
