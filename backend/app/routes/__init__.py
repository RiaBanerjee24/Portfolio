from app.routes.chatbot import chatbot_bp
from app.routes.health import health_bp
from app.routes.info import info_bp


def register_blueprints(app):
    app.register_blueprint(health_bp)
    app.register_blueprint(info_bp)
    app.register_blueprint(chatbot_bp)
