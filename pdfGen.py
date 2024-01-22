from PyPDF2 import PdfReader, PdfWriter
from pdfKeys import General, Stats, Spells

reader = PdfReader("DnD_5E_CharacterSheet_FormFillable.pdf")
writer = PdfWriter("DnD_5E_CharacterSheet_FormFillable.pdf")
writer.append_pages_from_reader(reader)


# formfield needs to be a dict [str: ANY type]
# must use .value of the pdfKeys property to get its actual value

for x in General:
    writer.update_page_form_field_values(writer.pages[0], {x.value: x.name})

for x in Stats:
    writer.update_page_form_field_values(writer.pages[0], {x.value: x.name})

for x in Spells:
    writer.update_page_form_field_values(writer.pages[2], {x.value: x.name})

# The output command
writer.write("newpdf.pdf")
