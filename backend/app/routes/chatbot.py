import logging

from flask import Blueprint, jsonify, request
from flask_limiter.errors import RateLimitExceeded

from app.extensions import limiter
from app.services.chatbot_service import ChatbotService

logger = logging.getLogger("chatbot")
chatbot_bp = Blueprint("chatbot", __name__)
chatbot_service = ChatbotService()


@chatbot_bp.errorhandler(RateLimitExceeded)
def ratelimit_handler(e):
    logger.info("Rate limited: %s", e.description)
    return jsonify({"error": "rate_limited", "message": str(e.description)}), 429


@chatbot_bp.route("/chatbot/ask", methods=["POST"])
@limiter.limit("5 per minute", error_message="Too many requests!")
@limiter.limit("20 per hour", error_message="You're asking too often. Try again in an hour")
@limiter.limit("30 per day", error_message="Daily limit reached. Try again tomorrow.")
def ask_chatbot():
    data = request.get_json(silent=True) or {}
    question = data.get("question")
    if not question:
        return jsonify({"error": "Missing 'question' field"}), 400

    try:
        answer = chatbot_service.get_answer(question)
        logger.info("Question: %s | Answer: %s", question, answer)
        return jsonify({"answer": answer})
    except Exception as e:
        logger.exception("Chatbot error")
        return jsonify({"error": str(e)}), 500
