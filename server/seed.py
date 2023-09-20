

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
from models import db, User, Sound, SaveSound, Score

with app.app_context():
    if __name__ == '__main__':
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()
        Sound.query.delete()
        SaveSound.query.delete()
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
            # Sound(sound="mom"),
            # Sound(sound="dad"),
            # Sound(sound="eat"),
            # Sound(sound="drink"),
            # Sound(sound="more"),
            # Sound(sound="done"),
            # Sound(sound="stop"),
            # Sound(sound="go"),
            # Sound(sound="help"),
            # Sound(sound="open"),
            # Sound(sound="walk"),
            # Sound(sound="run"),
            # Sound(sound="play"),
            # Sound(sound="jump"),
            # Sound(sound="baby"),
            # Sound(sound="cow"),
            # Sound(sound="fish"),
            # Sound(sound="duck"),
            # Sound(sound="cat"),
            # Sound(sound="dog"),
            # Sound(sound="milk"),
            # Sound(sound="cookie"),
            # Sound(sound="water"),
            # Sound(sound="juice"),
            # Sound(sound="apple"),
            # Sound(sound="banana"),
            # Sound(sound="cereal"),
            # Sound(sound="book"),
            # Sound(sound="ball"),
            # Sound(sound="bubbles"),
            # Sound(sound="tree"),
            # Sound(sound="sun"),
            # Sound(sound="shoes"),
            # Sound(sound="hot"),
            # Sound(sound="in"),
            # Sound(sound="on"),
            # Sound(sound="up"),
            # Sound(sound="down"),
            # Sound(sound="please"),
            # Sound(sound="thank"),
            # Sound(sound="you"),
            # Sound(sound="me"),
            # Sound(sound="hi"),
            # Sound(sound="bye"),
            # Sound(sound="yes"),
            # Sound(sound="no"),
            # Sound(sound="big"),
            # Sound(sound="little"),
            Sound(sound="apple", image="images/1.png"),
            Sound(sound="ball", image="images/2.png"),
            Sound(sound="cake", image="images/3.png"),
            Sound(sound="duck", image="images/4.png"),
            Sound(sound="egg", image="images/5.png"),
            Sound(sound="fire", image="images/6.png"),
            Sound(sound="guitar", image="images/7.png"),
            Sound(sound="hat", image="images/8.png"),
            Sound(sound="igloo", image="images/9.png"),
            Sound(sound="jacket", image="images/10.png"),
            Sound(sound="kite", image="images/11.png"),
            Sound(sound="lettuce", image="images/12.png"),
            Sound(sound="mango", image="images/13.png"),
            Sound(sound="nurse", image="images/14.png"),
            Sound(sound="octopus", image="images/15.png"),
            Sound(sound="pizza", image="images/16.png"),
            Sound(sound="queen", image="images/17.png"),
            Sound(sound="rat", image="images/18.png"),
            Sound(sound="spoon", image="images/19.png"),
            Sound(sound="tree", image="images/20.png"),
            Sound(sound="umbrella", image="images/21.png"),
            Sound(sound="vest", image="images/22.png"),
            Sound(sound="watch", image="images/23.png"),
            Sound(sound="xylophone", image="images/24.png"),
            Sound(sound="yo-yo", image="images/25.png"),
            Sound(sound="zipper", image="images/26.png"),
            
        ]

        # Add soundss to the session one by one
        for sound in sounds:
            db.session.add(sound)

        user_scores = [
            Score(user_id=1, sound_id=1, score=0),
            Score(user_id=2, sound_id=2, score=0),
            Score(user_id=3, sound_id=3, score=0),
            Score(user_id=4, sound_id=4, score=0),
            Score(user_id=5, sound_id=5, score=0)
        ]

        # Add user_scores to the session one by one
        for score in user_scores:
            db.session.add(score)

        db.session.commit()
