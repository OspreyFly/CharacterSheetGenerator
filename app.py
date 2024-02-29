from sqlite3 import IntegrityError

from flask import (
    Flask,
    render_template,
    redirect,
    flash,
    send_file,
    session,
    request,
    g,
)

from forms import UserAddForm, LoginForm
from models import db, connect_db, User, Characters
from pdfGen import fill_fields

CURR_USER_KEY = "curr_user"
app = Flask(__name__)
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
def show_characters():
    if g.user:
        characters = Characters.query.filter_by(user_id=g.user.id).all()
        return render_template("characters.html", user=g.user, characters=characters)
    else:
        return redirect("/signup")


@app.route("/new-character")
def new_character():
    if g.user:
        return render_template("new_character.html", user=g.user)
    else:
        return redirect("/signup")


@app.route("/makepdf", methods=["POST"])
def make_pdf():
    if g.user:
        data = request.json["data"]
        character = Characters.query.filter_by(charactername=data).first()
        pdf_path = fill_fields(
            character.charactername, character.charclass, character.race
        )
        return send_file(pdf_path, as_attachment=True)
    else:
        return redirect("/signup")


@app.route("/save-character", methods=["POST"])
def save_character():
    if g.user:
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
    else:
        return redirect("/signup")
