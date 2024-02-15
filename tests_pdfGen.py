import unittest
from unittest.mock import MagicMock, patch
from pdfGen import fillFields


class TestFillFields(unittest.TestCase):

    @patch("pdfGen.PdfReader")
    @patch("pdfGen.PdfWriter")
    @patch("pdfGen.pdfKeys.General")
    def test_fillFields_updates_correctly(self, mock_general, mock_writer, mock_reader):
        mock_reader.return_value.pages = [MagicMock()]
        mock_general.CHARACTERNAME.value = "CharacterNameField"
        mock_general.CLASSLEVEL.value = "ClassLevelField"
        mock_general.RACE.value = "RaceField"

        # Call the function with test values
        result_path = fillFields("TestName", "TestClass", "TestRace")

        # Assert that the correct fields were updated
        mock_writer.return_value.update_page_form_field_values.assert_called_with(
            mock_reader.return_value.pages[0],
            {
                "CharacterNameField": "TestName",
                "ClassLevelField": "TestClass",
                "RaceField": "TestRace",
            },
        )

        # Assert that the output PDF was written
        mock_writer.return_value.write.assert_called_once()

        # Assert that the correct path is returned
        self.assertEqual(result_path, "CharacterSheet_TestName.pdf")


if __name__ == "__main__":
    unittest.main()
