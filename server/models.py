from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from urllib.parse import urlparse
from email_validator import validate_email, EmailNotValidError

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

    # validations
    @validates('sound')
    def validate_sound(self, key, sound):
        if not sound or len(sound) <= 0:
            raise ValueError('Invalid sound provided')
        return sound

    @staticmethod
    def url_validator(url):
        try:
            result = urlparse(url)
            return all([result.scheme, result.netloc, result.path])
        except:
            return False

    @validates('image')
    def validate_image(self, key, image):
        if not image or len(image) <= 0 or not self.url_validator(image):
            raise ValueError('Invalid image URL provided')
        return image

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

    # serialization rules
    serialize_rules = ('-user_scores.sound',
                       '-user_scores.sound.sound_scores',)

    # validations
    @validates('email')
    def validate_email(self, key, email):
        if not email or len(email) <= 0:
            raise ValueError('Invalid email address provided')

        # Use email_validator to validate the email
        try:
            validate_email(email)
        except EmailNotValidError:
            raise ValueError('Invalid email address provided')

        return email

    @validates('password')
    def validate_password(self, key, password):
        if not password or len(password) <= 3:
            raise ValueError('Invalid password provided')

        return password

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

    # serialization rules
    serialize_rules = ('-user.user_scores', '-sound.sound_scores',)

    # validations
    @validates('score')
    def validate_score(self, key, score):
        if not score or not str(score):
            raise ValueError('Score must be an integer')

        return score

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
