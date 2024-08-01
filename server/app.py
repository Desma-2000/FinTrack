
#!/usr/bin/env python3

# Standard library imports
from flask import Flask,jsonify, request, make_response
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, get_jwt
from datetime import timedelta
import random, os

# Add your model imports
from models import db, User, Expense, Budget, Goal

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fintrack.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config["SECRET_KEY"] = "4395bcc6b24a958549abe241e893a575d705c739ad4c6146ae8d1f16c4d4555f"
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_pre_ping": True}


migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Authentication Routes
@app.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 409

    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

# Expense Routes
@app.route('/expenses', methods=['POST'])
@jwt_required()
def create_expense():
    user_id = get_jwt_identity()
    data = request.get_json()
    expense = Expense(user_id=user_id, **data)
    db.session.add(expense)
    db.session.commit()
    return jsonify(expense.to_dict()), 201

@app.route('/expenses', methods=['GET'])
@jwt_required()
def get_expenses():
    user_id = get_jwt_identity()
    expenses = Expense.query.filter_by(user_id=user_id).all()
    return jsonify([expense.to_dict() for expense in expenses]), 200

@app.route('/expenses/<int:expense_id>', methods=['PUT'])
@jwt_required()
def update_expense(expense_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    expense = Expense.query.filter_by(id=expense_id, user_id=user_id).first()
    if not expense:
        return jsonify({"msg": "Expense not found"}), 404

    for key, value in data.items():
        setattr(expense, key, value)

    db.session.commit()
    return jsonify(expense.to_dict()), 200

@app.route('/expenses/<int:expense_id>', methods=['DELETE'])
@jwt_required()
def delete_expense(expense_id):
    user_id = get_jwt_identity()
    expense = Expense.query.filter_by(id=expense_id, user_id=user_id).first()
    if not expense:
        return jsonify({"msg": "Expense not found"}), 404

    db.session.delete(expense)
    db.session.commit()
    return jsonify({"msg": "Expense deleted"}), 200

# Budget Routes
@app.route('/budgets', methods=['POST'])
@jwt_required()
def create_budget():
    user_id = get_jwt_identity()
    data = request.get_json()
    budget = Budget(user_id=user_id, **data)
    db.session.add(budget)
    db.session.commit()
    return jsonify(budget.to_dict()), 201

@app.route('/budgets', methods=['GET'])
@jwt_required()
def get_budgets():
    user_id = get_jwt_identity()
    budgets = Budget.query.filter_by(user_id=user_id).all()
    return jsonify([budget.to_dict() for budget in budgets]), 200

@app.route('/budgets/<int:budget_id>', methods=['PUT'])
@jwt_required()
def update_budget(budget_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    budget = Budget.query.filter_by(id=budget_id, user_id=user_id).first()
    if not budget:
        return jsonify({"msg": "Budget not found"}), 404

    for key, value in data.items():
        setattr(budget, key, value)

    db.session.commit()
    return jsonify(budget.to_dict()), 200

@app.route('/budgets/<int:budget_id>', methods=['DELETE'])
@jwt_required()
def delete_budget(budget_id):
    user_id = get_jwt_identity()
    budget = Budget.query.filter_by(id=budget_id, user_id=user_id).first()
    if not budget:
        return jsonify({"msg": "Budget not found"}), 404

    db.session.delete(budget)
    db.session.commit()
    return jsonify({"msg": "Budget deleted"}), 200

# Goal Routes
@app.route('/goals', methods=['POST'])
@jwt_required()
def create_goal():
    user_id = get_jwt_identity()
    data = request.get_json()
    goal = Goal(user_id=user_id, **data)
    db.session.add(goal)
    db.session.commit()
    return jsonify(goal.to_dict()), 201

@app.route('/goals', methods=['GET'])
@jwt_required()
def get_goals():
    user_id = get_jwt_identity()
    goals = Goal.query.filter_by(user_id=user_id).all()
    return jsonify([goal.to_dict() for goal in goals]), 200

@app.route('/goals/<int:goal_id>', methods=['PUT'])
@jwt_required()
def update_goal(goal_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    goal = Goal.query.filter_by(id=goal_id, user_id=user_id).first()
    if not goal:
        return jsonify({"msg": "Goal not found"}), 404

    for key, value in data.items():
        setattr(goal, key, value)

    db.session.commit()
    return jsonify(goal.to_dict()), 200

@app.route('/goals/<int:goal_id>', methods=['DELETE'])
@jwt_required()
def delete_goal(goal_id):
    user_id = get_jwt_identity()
    goal = Goal.query.filter_by(id=goal_id, user_id=user_id).first()
    if not goal:
        return jsonify({"msg": "Goal not found"}), 404

    db.session.delete(goal)
    db.session.commit()
    return jsonify({"msg": "Goal deleted"}), 200


# Register blueprints
# app.register_blueprint(auth_bp, url_prefix='/auth')
# app.register_blueprint(expense_bp, url_prefix='/expenses')
# app.register_blueprint(budget_bp, url_prefix='/budgets')
# app.register_blueprint(goal_bp, url_prefix='/goals')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)