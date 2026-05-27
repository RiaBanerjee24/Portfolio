import os
from flask import current_app,jsonify
import json

class PortfolioServices:
    def __init__(self):
        pass
    def get_work_file_path(self):
        work_file_path = os.path.join(current_app.root_path, 'jsonfiles', 'work.json')
        return work_file_path
    def get_education_file_path(self):
        edu_file_path = os.path.join(current_app.root_path, 'jsonfiles', 'education.json')
        return edu_file_path
    def get_accolades_file_path(self):
        accolades_file_path = os.path.join(current_app.root_path, 'jsonfiles', 'accolades.json')
        return accolades_file_path
    def get_work_and_education(self):
        with open(self.get_work_file_path(), 'r') as file:
            work_data = json.load(file)
        tcs = work_data.get("tcs",None)
        babelcast = work_data.get("babelcast",None)
        eagl = work_data.get("eagl",None)

        with open(self.get_education_file_path(), 'r') as education_file:
            edu_data = json.load(education_file)

        # education
        au = edu_data.get("au", None)
        uncc = edu_data.get("uncc", None)
        nirma = edu_data.get("nirma", None)
        ra = edu_data.get("ra", None)
        data = [eagl, uncc, babelcast, ra, uncc, tcs, nirma, au]
        return data

    def get_accolades(self):
        accolades_file_path = self.get_accolades_file_path()
        with open(accolades_file_path, 'r') as accolades_file:
            accolades_data = json.load(accolades_file)
        paper = accolades_data.get("paper",None)
        medium = accolades_data.get("medium",None)
        # sentigraph = accolades_data["sentigraph"]
        facer = accolades_data.get("facer",None)
        video_rendering = accolades_data.get("video_rendering",None)
        smallstream = accolades_data.get("smallstream",None)
        portfolio = accolades_data.get("portfolio",None)
        leetcoding = accolades_data.get("leetcoding",None)
        coldemailrobo = accolades_data.get("coldemailrobo",None)
        loggingai = accolades_data.get("loggingai",None)
        return [portfolio, smallstream, loggingai, leetcoding, coldemailrobo, video_rendering, paper, medium, facer]
