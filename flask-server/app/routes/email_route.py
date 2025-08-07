from flask import Blueprint,request,jsonify
from app.services.email_service import Email
from app.utils.logger import get_logger
logger = get_logger()
email_bp = Blueprint("email",__name__)

email_service = Email()
@email_bp.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.json
        is_captcha_verified,status = email_service.google_recaptcha_auth(data)
        if status!=200:
            return
        mail_sent,mail_status = email_service.send_email(data)
        return jsonify(mail_sent),mail_status
    except Exception as e:
        logger.info(f"Exception in sending mail: {str(e)}")
        return jsonify({'error':'Unexpected error in sending email'}),400