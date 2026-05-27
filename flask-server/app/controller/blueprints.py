from app.routes.email_route import email_bp
from app.routes.information_route import info_bp
from app.routes.health_route import health_bp
from app.routes.chatbot_route import chatbot_bp

#Registering blueprints
def register_blueprints(app):
    app.register_blueprint(email_bp, url_prefix='/api')    
    app.register_blueprint(info_bp, url_prefix='/api')
    app.register_blueprint(chatbot_bp, url_prefix='/api')
    app.register_blueprint(health_bp)
