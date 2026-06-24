import logging

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from app.extensions import limiter
from app.routes import register_blueprints


def create_app():
    load_dotenv()
    logging.basicConfig(level=logging.INFO)

    app = Flask(__name__)
    from app.config import Config

    app.config.from_object(Config)

    CORS(app)
    limiter.init_app(app)
    register_blueprints(app)

    return app
