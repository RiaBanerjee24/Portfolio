import os

from dotenv import load_dotenv
from flask import Flask,request,jsonify
from flask_cors import CORS

from app.controller.blueprints import register_blueprints
from app.extensions import mail
from app.routes.chatbot_route import limiter


def create_app():
    load_dotenv()
    app = Flask(__name__)
    limiter.init_app(app)
    # Load config
    from app.config import Config
    app.config.from_object(Config)

    CORS(app)
    mail.init_app(app)

    register_blueprints(app)

    # Restrict IP
    @app.before_request
    def restrict_ip():
        if request.remote_addr != os.getenv('ALLOWED_IP'):
            return jsonify({"error": "Forbidden: Access is restricted"}), 403

    return app
