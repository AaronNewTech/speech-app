

# export FLASK_APP=server/app.py
# flask db init
# flask db upgrade head
# flask db revision --autogenerate -m 'message'
# flask db upgrade head
# python server/seed.py

#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import bcrypt

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Sound, SavedSound, Score

with app.app_context():
    if __name__ == '__main__':
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()
        Sound.query.delete()
        SavedSound.query.delete()
        Score.query.delete()

        users = [
            User(email="johnsmith@gmail.com", password="1234", hash=bcrypt.hashpw(
                "1234".encode('utf-8'), bcrypt.gensalt())),
            User(email="alicejohnson@gmail.com", password="1234", hash=bcrypt.hashpw(
                "1234".encode('utf-8'), bcrypt.gensalt())),
            User(email="bobhenry@gmail.com", password="1234", hash=bcrypt.hashpw(
                "1234".encode('utf-8'), bcrypt.gensalt())),
            User(email="tinapaul@gmail.com", password="1234", hash=bcrypt.hashpw(
                "1234".encode('utf-8'), bcrypt.gensalt()))
        ]

        # Add users to the session one by one
        for user in users:
            db.session.add(user)

        # mom dad eat drink more done stop go help open walk run play jump baby cow fish duck cat dog milk cookie water juice apple banana cereal book ball bubbles tree sun shoes hot in, on up down please thank you me you hi bye yes no big little car bed

        sounds = [
            Sound(sound="mom"),
            Sound(sound="dad"),
            Sound(sound="eat"),
            Sound(sound="drink"),
            Sound(sound="more"),
            Sound(sound="done"),
            Sound(sound="stop"),
            Sound(sound="go"),
            Sound(sound="help"),
            Sound(sound="open"),
            Sound(sound="walk"),
            Sound(sound="run"),
            Sound(sound="play"),
            Sound(sound="jump"),
            Sound(sound="baby"),
            Sound(sound="cow"),
            Sound(sound="fish"),
            Sound(sound="duck"),
            Sound(sound="cat"),
            Sound(sound="dog"),
            Sound(sound="milk"),
            Sound(sound="cookie"),
            Sound(sound="water"),
            Sound(sound="juice"),
            Sound(sound="apple"),
            Sound(sound="banana"),
            Sound(sound="cereal"),
            Sound(sound="book"),
            Sound(sound="ball"),
            Sound(sound="bubbles"),
            Sound(sound="tree"),
            Sound(sound="sun"),
            Sound(sound="shoes"),
            Sound(sound="hot"),
            Sound(sound="in"),
            Sound(sound="on"),
            Sound(sound="up"),
            Sound(sound="down"),
            Sound(sound="please"),
            Sound(sound="thank"),
            Sound(sound="you"),
            Sound(sound="me"),
            Sound(sound="hi"),
            Sound(sound="bye"),
            Sound(sound="yes"),
            Sound(sound="no"),
            Sound(sound="big"),
            Sound(sound="little"),
            Sound(sound="car"),
            Sound(sound="bed"),

        ]

        # Add soundss to the session one by one
        for sound in sounds:
            db.session.add(sound)

        user_scores = [
            Score(score=None),
            Score(score=None),
            Score(score=None),
            Score(score=None),
            Score(score=None)
        ]

        # Add user_scores to the session one by one
        for score in user_scores:
            db.session.add(score)

        db.session.commit()
