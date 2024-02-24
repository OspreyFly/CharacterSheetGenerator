from app import app, g
from unittest import TestCase


class TestViews(TestCase):
    # home
    def test_home(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session["CURR_USER_KEY"] = 1
                res = client.get("/home")
                html = res.get_data(as_text=True)

                self.assertEqual(res.status_code, 200)
                self.assertIn("Log-Out", html)

    def test_home_anon(self):
        with app.test_client() as client:

            res = client.get("/home")
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn("Log-In", html)


# makepdf


# newcharacter

# characters


# savecharacter
