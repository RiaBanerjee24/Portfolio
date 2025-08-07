from flask import Blueprint,request,jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_limiter.errors import RateLimitExceeded
from app.services.chatbot_service import ChatbotService
from app.utils.logger import get_chat_logger
chat_logger = get_chat_logger()
chatbot_bp = Blueprint("chatbot",__name__)

chatbot_service = ChatbotService()
limiter = Limiter(key_func=get_remote_address)

@chatbot_bp.errorhandler(RateLimitExceeded)
def ratelimit_handler(e):
    chat_logger.info(f"Rate Limited: {e.description}")
    return jsonify({
        "error": "rate_limited",
        "message": str(e.description)
    }), 429

@chatbot_bp.route("/chatbot/ask", methods=["POST"])
@limiter.limit("5 per minute",error_message="Too many requests!")
@limiter.limit("20 per hour",error_message="You're asking too often. Try again in an hour")
@limiter.limit("30 per day",error_message="Daily limit reached. Try again tomorrow.")
def ask_chatbot():
    data = request.get_json()
    question = data.get("question")
    if not question:
        return jsonify({"error": "Missing 'question' field"}), 400

    try:
        answer = chatbot_service.get_answer(question)
        chat_logger.info(f"Question: {question} | Answer:{answer}")
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500