from app import app
from models import db

# Connect to the database

# Create all tables
with app.app_context():
    db.create_all()
    db.session.commit()
