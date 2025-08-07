from app.config import Config
import requests
from flask_mail import Mail, Message
from app.extensions import mail
from app.utils.logger import get_logger
logger = get_logger()
class Email:
    def google_recaptcha_auth(self,data):
        try:
            # logger.info(f"Trying to POST with creds: {app.config['MAIL_USERNAME']} and {app.config['MAIL_PASSWORD']}")

            captcha_token = data.get("captchaToken")
            if not captcha_token:
                logger.info(f"CAPTCHA missing")
                return {"status": "error", "message": "CAPTCHA token is missing"}, 400

            recaptcha_response = requests.post(
                Config.GOOGLE_RECAPTCHA_URL,
                data={
                    "secret": Config.RECAPTCHA_SECRET_KEY,
                    "response": captcha_token
                }
            )
            recaptcha_result = recaptcha_response.json()

            if not recaptcha_result.get("success"):
                logger.info(f"Error in Google Recaptcha")
                return {
                    "status": "error",
                    "message": recaptcha_result.get("error-codes", [])
                }, 400
            return {"message":"Verified"},200
        except Exception as e:
            logger.info(f"Exception in Google Recaptcha:{str(e)}"),400

    def send_email(self,data):
        message = data.get('message')
        contact = data.get('contact')
        if not message or not contact:
            return {"message":"Missing required fields Message/Contact"},404

        msg = Message("New Message from Contact Form", recipients=["banerjee.ria24@gmail.com"])
        msg.body = f"Message: {message}\nContact: {contact}"

        try:
            mail.send(msg)
            return {'status': 'success', 'message': 'Email sent successfully'}, 200
        except Exception as e:
            logger.info(f"Error {e}")
            return {'status': 'error', 'message': str(e)}, 500
