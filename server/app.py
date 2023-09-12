#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource
import bcrypt

# Local imports
from config import app, db, api
# Add your model imports
from models import db, User


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
            return f'Welcome {email}'
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
        return make_response('', 204)


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
            return make_response(jsonify(success=True, message=f'Welcome back {email}'), 200)
        else:
            return make_response(jsonify(success=False, message='Wrong Password!'), 200)


api.add_resource(Login, '/login')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
