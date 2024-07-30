# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api


# # Define metadata and instantiate db



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config["SECRET_KEY"] = "mysecret"
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_pre_ping": True}



api = Api(app)

    # Instantiate CORS
CORS(app)

