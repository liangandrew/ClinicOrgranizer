from flask import Flask
from peewee import *
from flask_cors import CORS

def create_app(__name__):
    app = Flask(__name__,instance_relative_config=True)
    app.config.from_pyfile('config.py',silent=True)
    
    from app.routes import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    CORS(app)

    return app

