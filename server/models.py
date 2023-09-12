from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData

from config import db


class Lesson(db.Model, SerializerMixin):
    __tablename__ = 'lessons'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    sound = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    lesson_scores = db.relationship('Score', cascade='all, delete', backref='lesson')

    # validations
    @validates('name')
    def validate_name(self, key, name):
        if not name or len(name) <= 0:
            raise ValueError('Invalid name provided')
        return name

    @validates('sound')
    def validate_sound(self, key, sound):
        if not sound or len(sound) <= 0:
            raise ValueError('Invalid sound provided')
        return sound

    def __repr__(self):
        return f'<Lesson {self.id}>'


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text, unique=True, nullable=False)
    hash = db.Column(db.Text, nullable=False)
    password = db.Column(db.String)
    # age = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    # vendor_sweets = db.relationship('VendorSweet', cascade='all, delete', backref='sweet')
    user_scores = db.relationship('Score', cascade='all, delete', backref='user')

    # serialize rules


    def __repr__(self):
        return f'<User {self.id}>'


class Score(db.Model, SerializerMixin):
    __tablename__ = 'scores'

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    lesson_id = db.Column(db.Integer, db.ForeignKey("lessons.id"))

    # serialize rules
    # serialize_rules = ('-drink.drink_ingredient_associations', '-ingredient.drink_ingredient_associations',)

    # validations


    def __repr__(self):
        return f'<Score {self.id}>'
    

class SavedLesson(db.Model, SerializerMixin):
    __tablename__ = 'saved_lessons'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    lesson_id = db.Column(db.Integer, db.ForeignKey("lessons.id"))

    # serialize rules
    # serialize_rules = ('-drink.drink_ingredient_associations', '-ingredient.drink_ingredient_associations',)


    # validations


    def __repr__(self):
        return f'<SavedLesson {self.id}>'