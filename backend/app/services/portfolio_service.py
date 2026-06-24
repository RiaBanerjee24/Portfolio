import json
import os

from flask import current_app


class PortfolioService:
    def _load(self, filename):
        path = os.path.join(current_app.root_path, "data", filename)
        with open(path, "r") as f:
            return json.load(f)

    def get_home(self):
        return self._load("home.json")

    def get_work_and_education(self):
        work = self._load("work.json")
        education = self._load("education.json")
        return [
            work.get("eagl"),
            education.get("uncc"),
            work.get("babelcast"),
            education.get("ra"),
            education.get("uncc"),
            work.get("tcs"),
            education.get("nirma"),
            education.get("au"),
        ]

    def get_accolades(self):
        accolades = self._load("accolades.json")
        return [
            accolades.get("tooldex")
            accolades.get("portfolio"),
            accolades.get("smallstream"),
            accolades.get("loggingai"),
            accolades.get("leetcoding"),
            accolades.get("coldemailrobo"),
            accolades.get("video_rendering"),
            accolades.get("paper"),
            accolades.get("medium"),
            
        ]
