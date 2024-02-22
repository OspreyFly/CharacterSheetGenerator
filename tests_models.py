from unittest import TestCase
from app import app
from models import db, User, Characters

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///test"
app.config["SQLALCHEMY_ECHO"] = False

db.drop_all()
db.create_all()


class UserModelTestCase(TestCase):

    def setUp(self):
        User.query.delete()

    def tearDown(self):
        db.session.rollback()


class CharactersModelTestCase(TestCase):

    def setUp(self):
        Characters.query.delete()

    def tearDown(self):
        db.session.rollback()
