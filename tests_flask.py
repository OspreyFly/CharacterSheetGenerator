from unittest import TestCase
from app import app
from models import db, User, Characters

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///test"
app.config["SQLALCHEMY_ECHO"] = False
app.config["TESTING"] = True

with app.app_context():
    db.drop_all()
    db.create_all()


class CharactersTestCase(TestCase):
    def setUp(self):

        user = User(username="testname", password="testpassword")
        character = Characters(
            user_id=1, charactername="John Smith", race="Human", charclass="Fighter"
        )
        with app.app_context():
            User.query.delete()
            db.session.add(user)
            db.session.commit()
            db.session.add(character)
            db.session.commit()
            self.user_id = user.id
            self.character_id = character.id



    def tearDown(self):
        db.session.rollback()

    def test_show_characters(self):
        with app.test_client() as client:
            res = client.get("/characters")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("John Smith", html)

    def test_save_characters(self):
        with app.test_client() as client:
            data = {
                "charactername": "Jack Black",
                "race": "Human",
                "charclass": "Warlock",
            }
            res = client.post("/savecharacter", data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("Jack Black", html)
