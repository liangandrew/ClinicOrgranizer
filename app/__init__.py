from flask import Flask
from peewee import *
from flask_cors import CORS

def create_app(__name__):
    app = Flask(__name__)
    app.config.from_pyfile('config.py')
    
    from app.routes import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    CORS(app)
    
    # temporary route
    @app.route('/')
    def hello_world():
        return 'Hello, World!'

    return app

