from flask import Blueprint,jsonify,current_app
import os
from app.services.portfolio_services import PortfolioServices
info_bp = Blueprint("info",__name__)

service = PortfolioServices()

@info_bp.route("/work",methods=['GET'])
def work():
    data = service.get_work_and_education()
    return jsonify(data)

@info_bp.route('/accolades',methods=['GET'])
def accolades():
    data = service.get_accolades()
    return jsonify(data)