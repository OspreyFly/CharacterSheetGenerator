# tests/test_app.py

import unittest
from unittest.mock import patch, MagicMock
from app import app, db, User
from flask import session
from forms import UserAddForm


class SignupTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()

        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_signup(self):
        # Check that the signup route exists and returns a  200 OK status
        response = self.client.get("/signup")
        self.assertEqual(response.status_code, 200)

        # Try to sign up with valid data
        form_data = {"username": "testuser", "password": "testpass"}
        response = self.client.post("/signup", data=form_data)
        self.assertEqual(
            response.status_code, 302
        )  # Expect a redirect after successful signup

        # Verify that the user was added to the database
        user = User.query.filter_by(username="testuser").first()
        self.assertIsNotNone(user)


class TestViews(unittest.TestCase):

    def setUp(self):
        self.app = app
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    @patch("app.User.get")
    @patch("app.Characters.query.filter_by")
    def test_showCharacters_view(self, mock_filter, mock_get):
        # Test GET request to characters route
        response = self.client.get("/characters")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"characters.html", response.data)

        # Assert that the query was made with the correct parameters
        mock_get.assert_called_once_with(session["curr_user"])
        mock_filter.assert_called_once_with(user_id=mock_get.return_value.id)

    @patch("app.render_template")
    def test_home_view(self, mock_render_template):
        # Test GET request to home route
        response = self.client.get("/home")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"home.html", response.data)

        # Assert that the template was rendered with the correct parameters
        mock_render_template.assert_called_once_with("home-anon.html")

    @patch("app.render_template")
    def test_newCharacter_view(self, mock_render_template):
        # Test GET request to new-character route
        response = self.client.get("/new-character")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"new_character.html", response.data)

        # Assert that the template was rendered with the correct parameters
        mock_render_template.assert_called_once_with(
            "new_character.html", user=mock_get.return_value
        )

    @patch("app.request")
    @patch("app.send_file")
    @patch("app.Characters.query.filter_by")
    @patch("app.fillFields")
    def test_makePdf_view(
        self, mock_fillFields, mock_filter, mock_send_file, mock_request
    ):
        # Test POST request to makepdf route
        mock_request.json.return_value = {"data": "TestCharacter"}
        mock_filter.return_value.first.return_value = MagicMock(
            charactername="TestCharacter", charclass="TestClass", race="TestRace"
        )
        mock_fillFields.return_value = "/path/to/pdf"

        response = self.client.post("/makepdf", json={"data": "TestCharacter"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers["Content-Type"], "application/octet-stream")

        # Assert that the PDF generation function was called with the correct parameters
        mock_fillFields.assert_called_once_with(
            "TestCharacter", "TestClass", "TestRace"
        )

    @patch("app.request")
    @patch("app.db.session.add")
    @patch("app.db.session.commit")
    @patch("app.Characters")
    def test_saveCharacter_view(
        self, mock_character, mock_commit, mock_add, mock_request
    ):
        # Test POST request to save-character route
        mock_request.get_json.return_value = {"key": "value"}

        response = self.client.post("/save-character", json={"key": "value"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.get_json(), {"message": "Character saved successfully"}
        )

        # Assert that the character was added to the session and committed to the database
        mock_add.assert_called_once()
        mock_commit.assert_called_once()


if __name__ == "__main__":
    unittest.main()
