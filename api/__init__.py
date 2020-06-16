from flask import Flask
from peewee import *
from flask_login import LoginManager

#local import
from config import app_config

db=SqliteDatabase('clinics.db')
login_manager = LoginManager()

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])

    login_manager.init_app(app)

    @app.route('/')
    def hello_world():
        return 'Hello, World!'

    return app
