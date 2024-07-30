#!/usr/bin/env python3

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

