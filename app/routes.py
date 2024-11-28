from app import app, mongo
from flask import  request, jsonify, session, redirect, url_for, render_template, send_from_directory
import requests
import os
from werkzeug.utils import secure_filename
from .login import login
from .signup import signup
from .reset_password import forgot_password, reset_password, verify_otp
from .logout import logout
from .utils import verify_jwt_token, convert_objectid,  allowed_file
from app.config import Config
from .profile import user_profile, update_profile, upload_profile_picture

@app.route('/')
def indexs():
    return redirect(url_for('index'))

@app.route('/index', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/styles.css', methods=['GET'])
def styles():
    return render_template('styles.css')

@app.route('/scripts.js', methods=['GET'])
def scripts():
    return render_template('scripts.js')

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/forgot-password', methods=['GET'])
def reset():
    return render_template('forgot-password.html')


@app.route('/verify-otp', methods=['GET'])
def verify_otps():
    return render_template('verify-otp.html')


@app.route('/reset-password', methods=['GET'])
def reset_form():
    return render_template('reset-password.html')


@app.route('/home', methods=['GET'])
def home():
    return render_template('home.html')


@app.route('/profile', methods=['GET'])
def profile():
    return render_template('profile.html')




