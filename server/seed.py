

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
from models import db, User, Lesson, SavedLesson, Score

with app.app_context():
    if __name__ == '__main__':
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()
        Lesson.query.delete()
        SavedLesson.query.delete()
        Score.query.delete()

        
        users = [
    User(email="Johnny", password="1234", hash=bcrypt.hashpw("1234".encode('utf-8'), bcrypt.gensalt())),
    User(email="Alice", password="1234", hash=bcrypt.hashpw("1234".encode('utf-8'), bcrypt.gensalt())),
    User(email="Bob", password="1234", hash=bcrypt.hashpw("1234".encode('utf-8'), bcrypt.gensalt())),
    User(email="Tina", password="1234", hash=bcrypt.hashpw("1234".encode('utf-8'), bcrypt.gensalt()))
]
        

        # Add users to the session one by one
        for user in users:
            db.session.add(user)

        lessons = [
            Lesson(name="a", sound="a"),
            Lesson(name="e", sound="e"),
            Lesson(name="i", sound="i"),
            Lesson(name="o", sound="o"),
            Lesson(name="u", sound="u")
        ]

        # Add lessons to the session one by one
        for lesson in lessons:
            db.session.add(lesson)

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
