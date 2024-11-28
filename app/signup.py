from app import app, mongo
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import os
from .utils import verify_jwt_token, allowed_file
from app.config import Config



@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name', '')
    mobile = data.get('mobile', '')
    email = data.get('email', '')
    password = data.get('password', '')
    confirmpassword = data.get('confirmpassword', '')

    # Check if passwords match
    if password != confirmpassword:
        return jsonify({'message': "Passwords do not match"}), 400

    # Check if email or mobile already exists
    if mongo.db.users.find_one({'email': email}):
        return jsonify({'message': "Email already exists"}), 400

    if mongo.db.users.find_one({'mobile': mobile}):
        return jsonify({'message': "Number already exists"}), 400

    # Check if an admin already exists in the database
    is_admin = False
    if not mongo.db.users.find_one({'is_admin': True}):  # No admin user exists
        is_admin = True  # The first user can be marked as admin

    # Hash the password
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    # Insert the new user into the database
    mongo.db.users.insert_one({
        'name': name,
        'mobile': mobile,
        'email': email,
        'password': hashed_password,
        'is_admin': is_admin  # Store admin status
    })

    return jsonify({"message": "User registered successfully"}), 201
