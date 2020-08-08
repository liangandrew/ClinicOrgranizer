from flask import Flask
from peewee import *
from flask_cors import CORS

def create_app(__name__):
    app = Flask(__name__,instance_relative_config=True)
    app.config.from_pyfile('config.py',silent=True)
    app.config.update(
        # SESSION_COOKIE_SECURE=True,
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE='Lax',
    )
    
    from app.routes import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    CORS(app)
    #CORS(app,supports_credentials=True)    #need csrf protection for this option?

    return app

