#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session, redirect, url_for
from flask_restful import Resource
import bcrypt

# Local imports
from config import app, db, api
# Add your model imports
from models import db, User, Sound, SaveSound, Score

app.secret_key = 'your_secret_key_here'
# Views go here!


@app.route('/')
def index():
    return '<h1>Speech Trainer Server</h1>'


# class HomePage(Resource):
#     def get(self):
#         return '<h1>Speech Trainer Server</h1>'
# api.add_resource(HomePage, '/')


class Register(Resource):
    def post(self):
        try:
            email = request.json.get('email', None)
            password = request.json.get('password', None)

            if not email:
                return 'Missing email', 400

            if not password:
                return 'Missing password', 400

            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            user = User(email=email, hash=hashed, password=password)

            db.session.add(user)
            db.session.commit()
            return f'Welcome {email}', 201
        except Exception as e:
            # Log the error for debugging
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
            logged_in_user_id = User.query.get(logged_in_user_id)
            print(logged_in_user_id)
            # Remove user_id from the session
            session.pop('logged_in_user_id', None)
        # Redirect to the login page or another page after logout
        return redirect(url_for('login'))

api.add_resource(Logout, '/logout')



class Sounds(Resource):
    def get(self):
        sounds = [sound.to_dict() for sound in Sound.query.all()]
        return make_response(sounds, 200)


api.add_resource(Sounds, '/sounds')


class CreatedSounds(Resource):
    def get(self):
        min_id = request.args.get('id_gte', type=int, default=27)
        filtered_sounds = [sound.to_dict()
                           for sound in Sound.query.filter(Sound.id >= min_id).all()]
        return make_response(filtered_sounds, 200)


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

        email = data.get('email')
        print(email)
        sound_id = data.get('soundId')

        if 'logged_in_user_id' in session:
            logged_in_user_id = session['logged_in_user_id']
            # Use user_id to query the user's data from the database
            logged_in_user_id = User.query.get(logged_in_user_id)
            print(logged_in_user_id.id)

        # user = User.query.filter(User.email == email).first()
        # # print(user.id)
        # if not user:
        #     return make_response({"errors": ["User not found"]}, 404)

        user_sound = SaveSound(user_id=logged_in_user_id.id, sound_id=sound_id)

        try:
            db.session.add(user_sound)
            db.session.flush()
            db.session.commit()

            return make_response(user_sound.to_dict(), 201)
        except ValueError:
            db.session.rollback()
            return make_response({"errors": ["validation errors"]}, 400)


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


class SaveSoundsById(Resource):
    def delete(self, id):
        saved_sound = SaveSound.query.filter(SaveSound.id == id).one_or_none()
        if saved_sound is None:
            return make_response({'error': 'Sound is not found'}, 404)
        db.session.delete(saved_sound)
        db.session.commit()
        return make_response('', 204)


api.add_resource(SaveSoundsById, '/save_sounds/<int:id>')

class UserSavedSounds(Resource):
    def get(self):
        if 'logged_in_user_id' not in session:
            return make_response({'error': 'User not logged in'}, 401)

        logged_in_user_id = session['logged_in_user_id']
        user_sounds = [sound.to_dict() for sound in SaveSound.query.filter_by(user_id=logged_in_user_id).all()]
        return make_response(user_sounds, 200)



api.add_resource(UserSavedSounds, '/user_saved_sounds')


class Scores(Resource):
    def patch(self):
        if 'logged_in_user_id' not in session:
            return make_response({'error': 'User not logged in'}, 401)

        logged_in_user_id = session['logged_in_user_id']
        print(logged_in_user_id)
        data = request.json  # Assuming you send JSON data in the request
        new_score = data.get('score_value')
        print(new_score)
        if new_score is None:
            return {'message': 'score_value is required in the request data'}, 400

        try:
            userId = Score.query.filter_by(user_id=logged_in_user_id).first()
            print(userId.score)
            if userId is None:
                return {'message': 'User not found'}, 404

            userId.score = new_score
            db.session.commit()

            return {'message': 'Score updated successfully'}, 200

        except Exception as e:
            db.session.rollback()  # Roll back the transaction on error
            print("Error:", e)
            return {'message': 'Failed to update score on the server'}, 500


api.add_resource(Scores, '/scores')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
