from flask import Blueprint, jsonify

from app.services.portfolio_service import PortfolioService

info_bp = Blueprint("info", __name__)
service = PortfolioService()


@info_bp.route("/home", methods=["GET"])
def home():
    return jsonify(service.get_home())


@info_bp.route("/work", methods=["GET"])
def work():
    return jsonify(service.get_work_and_education())


@info_bp.route("/accolades", methods=["GET"])
def accolades():
    return jsonify(service.get_accolades())
