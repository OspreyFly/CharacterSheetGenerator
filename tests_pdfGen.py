import unittest
from pdfGen import fill_fields


class TestFillFields(unittest.TestCase):

    def setUp(self):
        # This method will be called before each test, you can put setup code here
        pass

    def tearDown(self):
        # This method will be called after each test, you can put cleanup code here
        pass

    def test_fillFields(self):
        # Test the fillFields function with valid inputs
        name = "TestCharacter"
        charclass = "Wizard"
        race = "Human"
        path = fill_fields(name, charclass, race)
        self.assertTrue(path.startswith("CharacterSheet_"))
        self.assertTrue(path.endswith(".pdf"))
        self.assertIn(name, path)

    def test_fillFields_invalid_input(self):
        # Test the fillFields function with invalid inputs
        with self.assertRaises(TypeError):
            fill_fields(123, "Wizard", "Human")  # Name should be a string
        with self.assertRaises(TypeError):
            fill_fields("TestCharacter", 123, "Human")  # Charclass should be a string
        with self.assertRaises(TypeError):
            fill_fields("TestCharacter", "Wizard", 123)  # Race should be a string


if __name__ == "__main__":
    unittest.main()
