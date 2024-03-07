from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from models import User, Characters, Base  # Ensure Base is imported

# Connect to the database
engine = create_engine("postgresql:///dndchar")

# Reflect the current database schema
metadata = MetaData(bind=engine, reflect=True)

# Drop all tables
metadata.drop_all(engine)

# Create new tables
Base.metadata.create_all(engine)

# Create a session
Session = sessionmaker(bind=engine)
session = Session()

# Add a user
user = User.signup(username="example_user", password="example_password")
session.add(user)
session.commit()

# Add a character
character = Characters(
    user_id=user.id,
    charactername="example_name",
    race="example_race",
    charclass="example_class",
)
session.add(character)
session.commit()
