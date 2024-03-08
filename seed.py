from app import db
from models import User, Characters

db.drop_all()
db.create_all()

User.query.delete()
Characters.query.delete()

# Add a user
user = User.signup(username="example_user", password="example_password")
db.session.add(user)
db.session.commit()

# Add a character
character = Characters(
    user_id=user.id,
    charactername="example_name",
    race="example_race",
    charclass="example_class",
)
db.session.add(character)
db.session.commit()
