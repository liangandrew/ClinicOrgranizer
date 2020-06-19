from flask import Flask
from peewee import *


def create_app(__name__):
    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    # temporary route
    @app.route('/')
    def hello_world():
        return 'Hello, World!'

    return app

