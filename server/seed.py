from faker import Faker
from datetime import datetime, timedelta
from FinTrack.server.app import app
 # Ensure you import create_app if you have an application factory
from models import db, User, Expense, Budget, Goal  # Ensure you import your models
import bcrypt



fake = Faker()

# Use the application context to run the seeding script
with app.app_context():
    # Create fake users
    users = []
    for _ in range(5):
        user = User(
            username=fake.user_name(),
            email=fake.email()
        )
        user.set_password('password')  # Set a default password
        users.append(user)
        db.session.add(user)

    db.session.commit()

    # Create fake expenses, budgets, and goals for each user
    for user in users:
        # Create fake expenses
        for _ in range(5):
            expense = Expense(
                user_id=user.id,
                amount=round(fake.random_number(digits=5), 2),
                category=fake.word(),
                description=fake.sentence(),
                date=fake.date_time_this_year()
            )
            db.session.add(expense)

        # Create fake budgets
        for _ in range(5):
            start_date = fake.date_time_this_year()
            end_date = start_date + timedelta(days=30)
            budget = Budget(
                user_id=user.id,
                amount=round(fake.random_number(digits=5), 2),
                category=fake.word(),
                start_date=start_date,
                end_date=end_date
            )
            db.session.add(budget)

        # Create fake goals
        for _ in range(5):
            target_date = fake.date_time_this_year()
            goal = Goal(
                user_id=user.id,
                name=fake.word(),
                target_amount=round(fake.random_number(digits=5), 2),
                current_amount=round(fake.random_number(digits=4), 2),
                target_date=target_date
            )
            db.session.add(goal)

    db.session.commit()

    print("Seeding complete!")
