from PyPDF2 import PdfReader, PdfWriter
from pdfKeys import pdfKeys

reader = PdfReader("DnD_5E_CharacterSheet_FormFillable.pdf")
writer = PdfWriter()

page = reader.pages[0]
fields = reader.get_fields()

writer.append(reader)


# update fields here
def updateField(page, field, value):
    writer.update_page_form_field_values(page, {f"${field}": f"${value}"})


first_page = writer.page[0]

updateField(first_page, pdfKeys.STRENGTH, "1")

# write "output" to pypdf-output.pdf
with open("filled-out.pdf", "wb") as output_stream:
    writer.write(output_stream)
