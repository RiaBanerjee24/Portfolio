import os

from flask import Flask,jsonify,request
from flask_cors import CORS
from flask_mail import Mail, Message
import logging
from dotenv import load_dotenv
import requests
import json

# Load environment variables from .env file
load_dotenv()
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
app = Flask(__name__)
CORS(app)

from flask import make_response

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.getenv('EMAILTO')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAILFROM')

mail = Mail(app)
RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY')
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
@app.route("/work",methods=['GET'])
def work():
    with open(os.path.join(BASE_DIR, 'jsonfiles', 'work.json'), 'r') as file:
        work_data = json.load(file)
    tcs = work_data["tcs"]    
    babelcast = work_data["babelcast"]    
    eagl = work_data["eagl"]

    with open(os.path.join(BASE_DIR, 'jsonfiles', 'education.json'), 'r') as education_file:
        edu_data = json.load(education_file)

    #education
    au = edu_data["au"]
    uncc = edu_data["uncc"]
    nirma = edu_data["nirma"]    
    ra = edu_data["ra"]
    data = [eagl,uncc,babelcast,ra,uncc,tcs,nirma,au]
    return jsonify(data)
@app.route('/accolades',methods=['GET'])
def accolades():
    #Paper
    #Medium
    #Projects
    with open(os.path.join(BASE_DIR,'jsonfiles','accolades.json'),'r') as accolades_file:
        accolades_data = json.load(accolades_file)
    paper = accolades_data["paper"]
    medium = accolades_data["medium"]
    sentigraph = accolades_data["sentigraph"]
    facer = accolades_data["facer"]
    video_rendering = accolades_data["video_rendering"]
    langchain_chatbot = accolades_data["langchain_chatbot"]
    portfolio = accolades_data["portfolio"]
    return [portfolio,langchain_chatbot,paper,video_rendering,medium,facer]


@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        # logger.info(f"Trying to POST with creds: {app.config['MAIL_USERNAME']} and {app.config['MAIL_PASSWORD']}")

        data = request.json
        captcha_token = data.get("captchaToken")
        if not captcha_token:
            return jsonify({"status":"error","message": "CAPTCHA token is missing"}), 400

        recaptcha_response = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={
                "secret": RECAPTCHA_SECRET_KEY,
                "response": captcha_token
            }
        )
        recaptcha_result = recaptcha_response.json()

        if not recaptcha_result.get("success"):
            return jsonify({
                "status": "error",
                "message": recaptcha_result.get("error-codes", [])
            }), 400

        message = data.get('message')
        contact = data.get('contact')

        msg = Message("New Message from Contact Form", recipients=["banerjee.ria24@gmail.com"])
        msg.body = f"Message: {message}\nContact: {contact}"

        try:
            mail.send(msg)
            return jsonify({'status': 'success', 'message': 'Email sent successfully'}), 200
        except Exception as e:
            logger.info(f"Error {e}")
            return jsonify({'status': 'error', 'message': str(e)}), 500
    except Exception as e:
        logger.info(f"Error {e}")
# @app.before_request
def restrict_ip():
    client_ip = request.remote_addr
    if client_ip != os.getenv('ALLOWED_IP'):
        return jsonify({"error": "Forbidden: Access is restricted"}), 403
if __name__ == '__main__':    
    app.run(debug=False, host="0.0.0.0",port=5000)