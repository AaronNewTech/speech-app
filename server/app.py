#!/usr/bin/env python3


# Remote library imports
from flask import Flask, request, make_response, jsonify, session, redirect, url_for, send_from_directory
from flask_restful import Resource, Api
import bcrypt
import os


# Local imports
from config import app, db, api
# Add your model imports
from models import db, User, Sound, SaveSound, Score

app.secret_key = 'your_secret_key_here'


@app.route('/')
def index():
    return '<h1>Speech Trainer Server</h1>'

class Register(Resource):
    def post(self):
        try:
            email = request.json.get('email', None)
            password = request.json.get('password', None)

            if not email:
                return 'Missing email', 400

            if not password:
                return 'Missing password', 400

            hashed = bcrypt.hashpw(password.encode(
                'utf-8'), bcrypt.gensalt(rounds=12))
            user = User(email=email, hash=hashed, password=password)

            db.session.add(user)
            db.session.commit()
            return f'Welcome {email}', 201
        except Exception as e:
            
            print(f"Error: {str(e)}")
            return 'Internal Server Error', 500


api.add_resource(Register, '/create_account')


class UserById(Resource):
    def delete(self, id):
        user = User.query.filter(User.id == id).one_or_none()
        if user is None:
            return make_response({'error': 'User is not found'}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response('', 201)


api.add_resource(UserById, '/user/<int:id>')


class Login(Resource):
    def post(self):
        email = request.json.get('email', None)
        password = request.json.get('password', None)
        if not email:
            return make_response(jsonify(success=False, message='Missing Email!'), 400)
        if not password:
            return make_response(jsonify(success=False, message='Missing Password!'), 400)
        user = User.query.filter_by(email=email).first()
        if not user:
            return make_response(jsonify(success=False, message='User Not Found!'), 404)
        if bcrypt.checkpw(password.encode('utf-8'), user.hash):
            # Store user.id in the session
            session['logged_in_user_id'] = user.id

            return make_response(jsonify(success=True, message=f'Welcome back {email}'), 201)
        else:
            return make_response(jsonify(success=False, message='Wrong Password!'), 200)


api.add_resource(Login, '/login')


class Logout(Resource):
    def post(self):
        if 'logged_in_user_id' in session:
            logged_in_user_id = session['logged_in_user_id']
            # Use user_id to query the user's data from the database
            logged_in_user_id = session.get(User, logged_in_user_id)
            # print(logged_in_user_id)
            # Remove user_id from the session
            session.pop('logged_in_user_id', None)
        # Redirect to the login page or another page after logout
        return redirect(url_for('login'))


api.add_resource(Logout, '/logout')


class Sounds(Resource):
    def get(self):
        sounds = [sound.to_dict(only=('sound', 'image', 'id',)) for sound in Sound.query.all()]
        return make_response(sounds, 200)


api.add_resource(Sounds, '/sounds')


class GetLastSoundId(Resource):
    def get(self):
        last_sound = Sound.query.order_by(Sound.id.desc()).first()
        if last_sound:
            last_id = last_sound.id
            # print("Last id", last_id)
            return make_response(jsonify(last_id), 200)
        # response_data = {
        #     'user_id': user_score.user_id,  # Include any other relevant data
        #     'score': user_score.score
        # }

        # return make_response(jsonify(response_data), 202)
        else:
            # Handle the case where there are no entries in the database
            return make_response({'message': 'No entries found'}, 404)


api.add_resource(GetLastSoundId, '/get_last_sound_id')


class CreatedSounds(Resource):
    def get(self):
        min_id = request.args.get('id_gte', type=int, default=49)
        filtered_sounds = [sound.to_dict()
                           for sound in Sound.query.filter(Sound.id >= min_id).all()]
        return make_response(filtered_sounds, 202)


api.add_resource(CreatedSounds, '/created_sounds')


class CreateSound(Resource):
    def post(self):
        data = request.get_json()

        sound = Sound()

        try:
            for attr in data:
                setattr(sound, attr, data[attr])
            db.session.add(sound)
            db.session.flush()

            db.session.commit()

            return make_response(sound.to_dict(), 201)
        except ValueError:
            db.session.rollback()
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(CreateSound, '/create_card')


class SoundsById(Resource):
    def get(self, id):
        sound = Sound.query.filter(Sound.id == id).first()
        if not sound:
            return make_response({
                "error": "Sound not found"
            }, 404)
        return make_response(sound.to_dict(only=('sound', 'image', 'id',)), 200)

    def delete(self, id):
        sound = Sound.query.filter(Sound.id == id).one_or_none()
        if sound is None:
            return make_response({'error': 'Sound is not found'}, 404)
        db.session.delete(sound)
        db.session.commit()
        return make_response('', 204)

    def patch(self, id):
        sound = Sound.query.filter(Sound.id == id).first()
        if not sound:
            return make_response({"error": "Sound not found"}, 404)

        data = request.get_json()

        try:

            for attr in data:
                setattr(sound, attr, data[attr])

            db.session.commit()

            return make_response(sound.to_dict(), 202)

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(SoundsById, '/sounds/<int:id>')


class SaveSounds(Resource):
    def post(self):
        data = request.get_json()

        sound_id = data.get('soundId')

        if 'logged_in_user_id' in session:
            logged_in_user_id = session['logged_in_user_id']

            user_sound = SaveSound(
                user_id=logged_in_user_id, sound_id=sound_id)

            try:
                db.session.add(user_sound)
                db.session.flush()
                db.session.commit()

                return make_response(user_sound.to_dict(), 201)
            except ValueError:
                db.session.rollback()
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            # Handle the case where the user is not logged in
            return make_response({"error": "User not logged in"}, 401)


api.add_resource(SaveSounds, '/saved_sounds')


class GetUserId(Resource):
    def get(self):
        # Retrieve email from query parameters
        email = request.args.get('email')
        user = User.query.filter_by(email=email).first()

        if user:
            user_id = user.id
            return make_response({'id': user_id}, 200)
        else:
            return make_response({'error': 'User not found'}, 404)


api.add_resource(GetUserId, '/getUserId')


# class DeleteSaveSoundsById(Resource):
#     def delete(self, id):

#         saved_sound = SaveSound.query.filter(SaveSound.sound_id == id).one_or_none()
#         if saved_sound is None:
#             return make_response({'error': 'Sound is not found'}, 404)
#         db.session.delete(saved_sound)
#         db.session.commit()
#         return make_response('', 204)


# api.add_resource(DeleteSaveSoundsById, '/user_saved_sounds_button/<int:id>')


class UserSavedSoundsButton(Resource):
    def get(self):
        if 'logged_in_user_id' not in session:
            return make_response({'error': 'User not logged in'}, 401)

        logged_in_user_id = session['logged_in_user_id']
        user_sounds = [sound.to_dict() for sound in SaveSound.query.filter_by(
            user_id=logged_in_user_id).all()]
        # print(user_sounds)
        return make_response(user_sounds, 202)


api.add_resource(UserSavedSoundsButton, '/user_saved_sounds_button')


class UserSavedSounds(Resource):
    def get(self):
        if 'logged_in_user_id' not in session:
            return make_response({'error': 'User not logged in'}, 401)

        logged_in_user_id = session['logged_in_user_id']

        # Query the saved sounds with their associated sound details using a join
        saved_sounds_query = db.session.query(SaveSound, Sound).\
            join(Sound, SaveSound.sound_id == Sound.id).\
            filter(SaveSound.user_id == logged_in_user_id).all()

        # Create a list of dictionaries containing sound details for the saved sounds
        user_saved_sounds = [
            {
                'id': sound.Sound.id,
                'sound': sound.Sound.sound,
                'image': sound.Sound.image,
                # Add other sound details you want to include
            }
            for sound in saved_sounds_query
        ]
        # print(user_saved_sounds)
        return make_response(user_saved_sounds, 202)


api.add_resource(UserSavedSounds, '/user_saved_sounds')


class UnSaveSoundsById(Resource):
    def delete(self, id):
        if 'logged_in_user_id' not in session:
            return make_response({'error': 'User not logged in'}, 401)

        logged_in_user_id = session['logged_in_user_id']

        saved_sound = SaveSound.query.filter_by(
            user_id=logged_in_user_id, sound_id=id).one_or_none()
        if saved_sound is None:
            return make_response({'error': 'Sound is not found'}, 404)
        db.session.delete(saved_sound)
        db.session.commit()
        return make_response('', 204)


api.add_resource(UnSaveSoundsById, '/user_saved_sounds/<int:id>')


class Scores(Resource):
    def patch(self):
        if 'logged_in_user_id' not in session:
            return make_response({'error': 'User not logged in'}, 401)

        logged_in_user_id = session['logged_in_user_id']
        data = request.json
        new_score = data.get('score_value')

        if new_score is None:
            return {'message': 'score_value is required in the request data'}, 400

        try:
            user_score = Score.query.filter_by(
                user_id=logged_in_user_id).first()

            if user_score is None:
                return {'message': 'User not found'}, 404

            user_score.score = new_score
            db.session.commit()

            # Build a dictionary with the user's score data
            response_data = {
                'user_id': user_score.user_id,  # Include any other relevant data
                'score': user_score.score
            }

            # Return the response as JSON with a 202 status code
            return make_response(jsonify(response_data), 202)

        except Exception as e:
            db.session.rollback()  # Roll back the transaction on error
            print("Error:", e)
            return {'message': 'Failed to update score on the server'}, 500


api.add_resource(Scores, '/scores')


class UserScore(Resource):
    def get(self):
        if 'logged_in_user_id' not in session:
            return make_response({'error': 'User not logged in'}, 401)

        logged_in_user_id = session['logged_in_user_id']
        user_score = Score.query.filter_by(user_id=logged_in_user_id).first()

        response_data = {
            'user_id': user_score.user_id,  # Include any other relevant data
            'score': user_score.score
        }

        return make_response(jsonify(response_data), 202)
        # return make_response(user_score.score, 200)


api.add_resource(UserScore, '/user_score')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
