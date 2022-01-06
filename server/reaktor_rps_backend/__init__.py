from flask import Flask
from flask_mongoengine import MongoEngine
import config

db = MongoEngine()

def create_app():
    app = Flask(__name__, static_folder="build/static", template_folder="build")
    app.config["MONGODB_HOST"] = config.DB_URI
    db.init_app(app)

    from .views import api_bp
    app.register_blueprint(api_bp)

    return app