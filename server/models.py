from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData

from config import db


class Sound(db.Model, SerializerMixin):
    __tablename__ = 'sounds'

    id = db.Column(db.Integer, primary_key=True)
    sound = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    sound_scores = db.relationship(
        'Score', cascade='all, delete', backref='Sound')

    # serialize rules
    # serialize_rules = ('-sound_scores.user_scores',
    #                    '-sound_scores.sound.sound_scores',)
    # serialize_rules = ('-',)
    # validations

    @validates('sound')
    def validate_sound(self, key, sound):
        if not sound or len(sound) <= 0:
            raise ValueError('Invalid sound provided')
        return sound

    def __repr__(self):
        return f'<Sound {self.id}>'


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
    user_scores = db.relationship(
        'Score', cascade='all, delete', backref='user')

    # serialize rules
    # serialize_rules = ('-user_scores.sound_scores.user_scores',
    #                    '-user_scores.sound.sound_scores',)
    serialize_rules = ('-user_scores.sound', '-user_scores.sound.sound_scores',)
    # validations

    @validates('email')
    def validate_email(self, key, email):
        if not email or len(email) <= 0 or not str(email):
            raise ValueError('Invalid email address provided')
        return email

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
    sound_id = db.Column(db.Integer, db.ForeignKey("sounds.id"))

    # serialize rules
    # serialize_rules = ('-drink.drink_ingredient_associations', '-ingredient.drink_ingredient_associations',)
    # serialize_rules = ('-user.user_scores', '-sound.sound_scores',)
    serialize_rules = ('-user.user_scores', '-sound.sound_scores',)
    # validations

    def __repr__(self):
        return f'<Score {self.id}>'


class SaveSound(db.Model, SerializerMixin):
    __tablename__ = 'saved_sounds'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # relationships
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    sound_id = db.Column(db.Integer, db.ForeignKey("sounds.id"))

    # serialize rules
    # serialize_rules = ('-drink.drink_ingredient_associations', '-ingredient.drink_ingredient_associations',)

    # validations

    def __repr__(self):
        return f'<SavedSound {self.id}>'
