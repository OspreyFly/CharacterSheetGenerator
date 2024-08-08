from PyPDF2 import PdfReader, PdfWriter
from pdfKeys import General, Stats, Spells
import io

reader = PdfReader("DnD_5E_CharacterSheet_FormFillable.pdf")
writer = PdfWriter("DnD_5E_CharacterSheet_FormFillable.pdf")
writer.append_pages_from_reader(reader)


def fillAllFields():
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


""" def fillFields(name, charclass, race):
    # Check if the parameters are strings
    if not all(isinstance(param, str) for param in (name, charclass, race)):
        raise TypeError("All parameters must be strings.")
    # fill pdf
    writer.update_page_form_field_values(
        writer.pages[0], {General.CHARACTERNAME.value: name}
    )
    writer.update_page_form_field_values(
        writer.pages[0], {General.CLASSLEVEL.value: charclass}
    )
    writer.update_page_form_field_values(writer.pages[0], {General.RACE.value: race})

    path = f"CharacterSheet_{name}.pdf"
    writer.write(path)

    return path """


def fillFields(name, charclass, race):
    # Check if the parameters are strings
    if not all(isinstance(param, str) for param in (name, charclass, race)):
        raise TypeError("All parameters must be strings.")

    # Update PDF form fields with provided values
    writer.update_page_form_field_values(
        writer.pages[0], {General.CHARACTERNAME.value: name}
    )
    writer.update_page_form_field_values(
        writer.pages[0], {General.CLASSLEVEL.value: charclass}
    )
    writer.update_page_form_field_values(writer.pages[0], {General.RACE.value: race})

    # Use BytesIO instead of StringIO
    output = io.BytesIO()

    # Write the PDF to the BytesIO object
    writer.write(output)

    # Ensure the BytesIO pointer is at the start
    output.seek(0)

    return output
