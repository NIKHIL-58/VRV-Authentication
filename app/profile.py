from app import app, mongo
from flask import request, jsonify, session
from werkzeug.utils import secure_filename 
import os
from bson import ObjectId
from .utils import verify_jwt_token
from app.config import Config



@app.route('/api/user-profile', methods=['GET'])
def user_profile():
    token = session.get('token')
    secret_key = app.config['SECRET_KEY']
    algorithm = app.config['JWT_ALGORITHM']
    
    try:
        is_verified = verify_jwt_token(token, secret_key, algorithm)
    except ValueError as e:
        return jsonify({'message': str(e)}), 401
    
    user_id = is_verified.get('userId')
    is_admin = is_verified.get('isAdmin', False)  # Check if the user is an admin
    
    if not user_id:
        return jsonify({'message': 'User not logged in'}), 401

    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    if user:
        user_data = {
            'name': user.get('name'),
            'email': user.get('email'),
            'mobile': user.get('mobile'),
            'profile_picture': user.get('profile_picture') or 'default-profile-image.png',
            'is_admin': is_admin  # Return the admin status in the profile data
        }
        return jsonify(user_data), 200
    else:
        return jsonify({'message': 'User not found'}), 404



@app.route('/update_profile', methods=['POST'])
def update_profile():
    token = session.get('token')
    secret_key = app.config['SECRET_KEY']
    algorithm = app.config['JWT_ALGORITHM']

    try:
        is_verified = verify_jwt_token(token, secret_key, algorithm)
    except ValueError as e:
        return jsonify({"error": str(e)}), 401
    
    user_id = is_verified.get('userId')
    is_admin = is_verified.get('isAdmin', False)  # Get admin status from token
    
    if not user_id:
        return jsonify({"error": "User not logged in"}), 401

    # Check if the user is trying to update their own profile or an admin trying to update another user's profile
    data = request.json
    updates = {}

    if 'userName' in data:
        updates['name'] = data['userName']
    if 'userEmail' in data:
        updates['email'] = data['userEmail']
    if 'userMobile' in data:
        updates['mobile'] = data['userMobile']

    if not updates:
        return jsonify({'status': 'failed', 'message': 'Invalid input'}), 400

    if not is_admin and str(user_id) != data.get('userId'):  # Regular users can't edit other profiles
        return jsonify({'status': 'failed', 'message': 'You cannot edit other profiles'}), 403

    # Admins can update any user, others can only update their own profile
    result = mongo.db.users.update_one(
        {'_id': ObjectId(user_id)},
        {'$set': updates}
    )

    if result.modified_count > 0:
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'failed', 'message': 'No changes made'}), 400


@app.route('/upload_profile_picture', methods=['POST'])
def upload_profile_picture():
    token = session.get('token')
    secret_key = app.config['SECRET_KEY']
    algorithm = app.config['JWT_ALGORITHM']

    try:
        # Verify the JWT token
        is_verified = verify_jwt_token(token, secret_key, algorithm)
    except ValueError as e:
        return jsonify({"error": str(e)}), 401

    # Extract user ID and admin status from the verified token
    user_id = is_verified.get('userId')
    if not user_id:
        return jsonify({"error": "User not logged in"}), 401

    # Check if the file is present in the request
    if 'profile_picture' not in request.files:
        return jsonify({'status': 'failed', 'message': 'No file part'}), 400

    file = request.files['profile_picture']

    # Ensure the file has a valid filename
    if file.filename.strip() == '':
        return jsonify({'status': 'failed', 'message': 'No file selected'}), 400

    # Secure the filename to prevent directory traversal attacks
    filename = secure_filename(file.filename)

    # Define the upload folder path
    upload_folder = app.config['UPLOAD_FOLDER']
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)  # Create the folder if it doesn't exist

    filepath = os.path.join(upload_folder, filename)

    try:
        # Save the uploaded file to the server
        file.save(filepath)

        # Update the user's profile picture in the MongoDB database
        result = mongo.db.users.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': {'profile_picture': filename}}
        )

        if result.modified_count > 0:
            return jsonify({'status': 'success', 'profile_picture': filename}), 200
        else:
            return jsonify({'status': 'failed', 'message': 'Failed to update profile picture in the database'}), 500
    except Exception as e:
        # Handle any unexpected errors
        return jsonify({'status': 'failed', 'message': str(e)}), 500

    return jsonify({'status': 'failed', 'message': 'File upload failed'}), 400
