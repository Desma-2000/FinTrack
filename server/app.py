from flask_migrate import Migrate
from flask import Flask, json, request, make_response
from flask_restful import Api, Resource, abort
import os
from flask_cors import CORS
from models import db, User
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

CORS(app)


# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
from routes import auth_bp, expense_bp, budget_bp, goal_bp

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(expense_bp, url_prefix='/expenses')
app.register_blueprint(budget_bp, url_prefix='/budgets')
app.register_blueprint(goal_bp, url_prefix='/goals')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)

