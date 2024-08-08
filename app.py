from flask import (
    Flask,
    render_template,
    redirect,
    flash,
    send_file,
    url_for,
    abort,
    session,
    request,
    g,
)
from io import BytesIO
from forms import UserAddForm, LoginForm
from models import db, connect_db, User, Characters
from pdfGen import fillFields

CURR_USER_KEY = "curr_user"
app = Flask(__name__)
app.app_context().push()
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///dndchar"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "secretKEY"

connect_db(app)


@app.before_request
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])

    else:
        g.user = None


def do_login(user):
    """Log in user."""

    session[CURR_USER_KEY] = user.id


def do_logout():
    """Logout user."""

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]


@app.route("/signup", methods=["GET", "POST"])
def signup():
    """Handle user signup.

    Create new user and add to DB. Redirect to home page.

    If form not valid, present form.

    If the there already is a user with that username: flash message
    and re-present form.
    """

    form = UserAddForm()

    if form.validate_on_submit():
        try:
            user = User.signup(
                username=form.username.data,
                password=form.password.data,
            )
            db.session.commit()

        except IntegrityError:
            flash("Username already taken", "danger")
            return render_template("signup.html", form=form)

        do_login(user)

        return redirect("/")

    else:
        return render_template("signup.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Handle user login."""

    form = LoginForm()

    if form.validate_on_submit():
        user = User.authenticate(form.username.data, form.password.data)

        if user:
            do_login(user)
            flash(f"Hello, {user.username}!", "success")
            return redirect("/")

        flash("Invalid credentials.", "danger")

    return render_template("login.html", form=form)


@app.route("/logout")
def logout():
    """Handle logout of user."""
    do_logout()
    flash("Logout Successful", "success")
    return redirect("/login")


@app.route("/")
def empty():
    return redirect("/home")


@app.route("/home")
def home():
    if g.user:
        return render_template("home.html", user=g.user)
    else:
        return render_template("home-anon.html")


@app.route("/characters")
def showCharacters():
    if g.user:
        characters = Characters.query.filter_by(user_id=g.user.id).all()
        return render_template("characters.html", user=g.user, characters=characters)
    else:
        redirect("/signup")


@app.route("/new-character")
def newCharacter():
    if g.user:
        return render_template("new_character.html", user=g.user)
    else:
        redirect("/signup")


@app.route("/makepdf", methods=["POST"])
def makePdf():
    if g.user:
        # Extract and validate the JSON data
        data = request.json.get("data")
        if not data:
            abort(400, description="No data provided")

        # Query the database for the character
        character = Characters.query.filter_by(charactername=data).first()
        if character is None:
            abort(404, description="Character not found")

        # Generate the PDF
        try:
            pdfOutput = fillFields(
                character.charactername, character.charclass, character.race
            )
        except Exception as e:
            abort(500, description=f"Error generating PDF: {str(e)}")

        # Ensure the PDF output is a BytesIO object
        if not isinstance(pdfOutput, BytesIO):
            abort(500, description="PDF generation failed")

        pdfOutput.seek(0)  # Ensure the pointer is at the start of the BytesIO object

        # Serve the PDF file
        return send_file(
            pdfOutput,
            as_attachment=True,
            download_name=f"{character.charactername}.pdf",
            mimetype="application/pdf",  # Specify the MIME type for PDFs
        )
    else:
        return redirect(
            url_for("signup")  # Adjust 'signup' to your actual signup route
        )


@app.route("/save-character", methods=["POST"])
def saveCharacter():
    data = request.get_json()
    print(data)
    character_data = {key: data[key] for key in data}

    character = Characters(
        user_id=session[CURR_USER_KEY],
        **character_data,  # Unpack the dictionary to pass the arguments to the constructor
    )
    # Create a new Character instance with the received data
    db.session.add(character)  # Add the new character to the session
    try:
        db.session.commit()  # Attempt to commit the changes to the database
    except Exception as e:
        db.session.rollback()  # Rollback the session if an error occurred
        print(f"An error occurred: {e}")
    return {"message": "Character saved successfully"}, 200
