from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from app.models import User, Expense, Budget, Goal

# Blueprints
auth_bp = Blueprint('auth', __name__)
expense_bp = Blueprint('expenses', __name__)
budget_bp = Blueprint('budgets', __name__)
goal_bp = Blueprint('goals', __name__)

# Authentication Routes
@auth_bp.route('/register', methods=['POST'])
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

@auth_bp.route('/login', methods=['POST'])
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
@expense_bp.route('/', methods=['POST'])
@jwt_required()
def create_expense():
    user_id = get_jwt_identity()
    data = request.get_json()
    expense = Expense(user_id=user_id, **data)
    db.session.add(expense)
    db.session.commit()
    return jsonify(expense.to_dict()), 201

@expense_bp.route('/', methods=['GET'])
@jwt_required()
def get_expenses():
    user_id = get_jwt_identity()
    expenses = Expense.query.filter_by(user_id=user_id).all()
    return jsonify([expense.to_dict() for expense in expenses]), 200

@expense_bp.route('/<int:expense_id>', methods=['PUT'])
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

@expense_bp.route('/<int:expense_id>', methods=['DELETE'])
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
@budget_bp.route('/', methods=['POST'])
@jwt_required()
def create_budget():
    user_id = get_jwt_identity()
    data = request.get_json()
    budget = Budget(user_id=user_id, **data)
    db.session.add(budget)
    db.session.commit()
    return jsonify(budget.to_dict()), 201

@budget_bp.route('/', methods=['GET'])
@jwt_required()
def get_budgets():
    user_id = get_jwt_identity()
    budgets = Budget.query.filter_by(user_id=user_id).all()
    return jsonify([budget.to_dict() for budget in budgets]), 200

@budget_bp.route('/<int:budget_id>', methods=['PUT'])
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

@budget_bp.route('/<int:budget_id>', methods=['DELETE'])
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
@goal_bp.route('/', methods=['POST'])
@jwt_required()
def create_goal():
    user_id = get_jwt_identity()
    data = request.get_json()
    goal = Goal(user_id=user_id, **data)
    db.session.add(goal)
    db.session.commit()
    return jsonify(goal.to_dict()), 201

@goal_bp.route('/', methods=['GET'])
@jwt_required()
def get_goals():
    user_id = get_jwt_identity()
    goals = Goal.query.filter_by(user_id=user_id).all()
    return jsonify([goal.to_dict() for goal in goals]), 200

@goal_bp.route('/<int:goal_id>', methods=['PUT'])
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

@goal_bp.route('/<int:goal_id>', methods=['DELETE'])
@jwt_required()
def delete_goal(goal_id):
    user_id = get_jwt_identity()
    goal = Goal.query.filter_by(id=goal_id, user_id=user_id).first()
    if not goal:
        return jsonify({"msg": "Goal not found"}), 404

    db.session.delete(goal)
    db.session.commit()
    return jsonify({"msg": "Goal deleted"}), 200
