#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource
import bcrypt

# Local imports
from config import app, db, api
# Add your model imports
from models import db, User, Sound


# Views go here!


@app.route('/')
def index():
    return '<h1>Phase 5 Project Server</h1>'


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
            return make_response(jsonify(success=True, message=f'Welcome back {email}'), 201)
        else:
            return make_response(jsonify(success=False, message='Wrong Password!'), 200)


api.add_resource(Login, '/login')


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
        sound_data = {
            "sound": data["sound"],
            "image": data.get("image", ""),
        }

        try:
            for attr, value in sound_data.items():
                setattr(sound, attr, value)
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
        return make_response(sound.to_dict(), 200)

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
            # Update the attributes of the Sound based on incoming data
            for attr, value in data.items():
                setattr(sound, attr, value)

            # Update the associations between the Sound and ingredients

            db.session.commit()

            return make_response(sound.to_dict(), 202)

        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)


api.add_resource(SoundsById, '/sounds/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
