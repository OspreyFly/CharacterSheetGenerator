from models import db, User, Characters, connect_db
from app import app

# Connect to the database

# Create all tables
with app.app_context():
    db.create_all()
    db.session.commit()
