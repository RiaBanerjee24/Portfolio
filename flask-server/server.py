import os

from flask import Flask,jsonify,request
from flask_cors import CORS
from flask_mail import Mail, Message
import logging
from dotenv import load_dotenv
import requests

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
# RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY')
RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY')
@app.route("/work",methods=['GET'])
def work():
    tsc_desc = "Worked in Equifax-UK project to design scalable APIs to manage data transactions. Contributed to cloud migration, legacy system decommission and traffic redirection."
    tcs = {"Company":"Tata Consultancy Services",
           "Title":"Systems Engineer",
           "Duration":"May 2021 to August 2022",
           "Location":"Ahmedabad, India",
           "Desc":tsc_desc}
    babelcast_desc = "Worked as a founding engineer for the development of a webapp for a entertainment-gaming startup, enabling users to collaboratively transpose their voice into thousands of voice models, including celebrities and custom models"
    babelcast = {"Company":"BabelCast Inc.",
                 "Title":"Full Stack Software Engineer",
                 "Duration":"Oct 2023 to Jan 2024",
                 "Location":"Chicago (Remote)",
                 "Desc":babelcast_desc}
    eagl_desc = "Contributing to the development of next-gen IoT gunshot detection system, by building scalable backend on cloud."
    eagl = {"Company":"EAGL Technology Inc.",
                 "Title":"Full Stack Software Engineer",
                 "Duration":"May 2024",
                 "Location":"Albuquerque, New Mexico",
                 "Desc":eagl_desc
    }


    #education
    au = {"Company":"Ahmedabad University",
          "Title":"Bachelors of Computer Applications",
          "Duration":"Aug 2016-May 2019",
          "Location":"Ahmedabad, India",
          "Desc":""}
    uncc = {
        "Company":"University Of North Carolina, Charlotte",
        "Title":"Masters Of Computer Science",
        "Duration":"Aug 2022-May 2024",
        "Location":"Charlotte, North Carolina",
        "Desc":""
    }
    nirma = {
        "Company":"Nirma University",
        "Title":"Masters Of Computer Applications",
        "Duration":"Aug 2019-May 2021",
        "Location":"Ahmedabad, India",
        "Desc":""
    }
    ra_desc = "Researched Cutting-Edge technologies to lessen anxiety by creating analysis algorithms using LSTM, to run on Virtual Reality platforms like MetaQuest"
    ra = {
        "Company":"University of North Carolina, Charlotte",
        "Title":"Graduate Research Assistant",
        "Duration":"Mar 2023-Oct 2023",
        "Location":"Charlotte, North Carolina",
        "Desc": ra_desc
    }
    data = [eagl,uncc,babelcast,ra,uncc,tcs,nirma,au]
    return jsonify(data)
@app.route('/accolades',methods=['GET'])
def accolades():
    #Paper
    #Medium
    #Projects
    paper = {
        "Type":"Publication",
        "Title":"Recommendation Systems Based on Collaborative Filtering Using Autoencoders: Issues and Opportunities",
        "Link":"https://doi.org/10.1007/978-981-15-8297-4_32",
        "Desc":"Python, Machine Learning (AutoEncoders)"
    }
    medium = {
        "Type":"Writing",
        "Title": "A beginner’s guide to Problem Solving Algorithms",
        "Link":"https://ria-banerjee.medium.com/a-beginners-guide-to-problem-solving-algorithms-711468ca6891",
        "Desc":"Competitive Programming"
    }
    sentigraph = {
        "Type":"Project",
        "Title":"SentiGraph:A twitter sentiment analysis project",
        "Link":"https://github.com/RiaBanerjee24/SentiGraph-Live_Twitter_Sentiment_Analysis",
        "Desc":"Python,Machine Learning"
    }
    facer = {
        "Type":"Project",
        "Title":"Face Recognition Based Attendance System",
        "Link":"https://github.com/RiaBanerjee24/FaceR",
        "Desc":"Python,OpenCV,TensorFlow, Machine Learning"
    }
    video_rendering = {
        "Type":"Project",
        "Title":"Real-time Video Reconstruction From Images",
        "Link":"https://github.com/RiaBanerjee24/VideoRendering",
        "Desc":"Python,PyTorch, Machine Learning(NERF model)"
    }
    langchain_chatbot = {
        "Type":"Project (currently working on)",
        "Title":"Personal ChatBot Trained on Resume",
        "Link":"https://github.com/RiaBanerjee24/Langchain-HuggingFace-ResumeParser",
        "Desc":"Python, LLM, HuggingFace, OpenAI API"
    }
    portfolio = {
        "Type":"Project",
        "Title":"Personal Portfolio-You're Already Here!",
        "Link":"https://github.com/RiaBanerjee24/PortfolioProject",
        "Desc":"Python, React, Flask, TailWind"
    }
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
@app.before_request
def restrict_ip():
    client_ip = request.remote_addr
    if client_ip != os.getenv('ALLOWED_IP'):
        return jsonify({"error": "Forbidden: Access is restricted"}), 403
if __name__ == '__main__':    
    app.run(debug=False, host="0.0.0.0",port=5000)